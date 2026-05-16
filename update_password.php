<?php
session_start();

require_once __DIR__ . '/db.php';
require_once __DIR__ . '/functions/password_reset_helpers.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    syncora_redirect('forgot_password.php');
}

if (!syncora_verify_csrf($_POST['csrf_token'] ?? '')) {
    syncora_set_flash('error', 'Gecersiz istek. Lutfen tekrar deneyin.');
    syncora_redirect('reset_password.php');
}

$email = $_SESSION['reset_email'] ?? null;
$action = (string) ($_POST['action'] ?? '');
$resetCode = trim((string) ($_POST['reset_code'] ?? ''));
$newPassword = (string) ($_POST['new_password'] ?? '');
$newPasswordConfirm = (string) ($_POST['new_password_confirm'] ?? '');
$config = syncora_password_reset_config();

if (!$email) {
    syncora_set_flash('error', 'Sifre sifirlama oturumu bulunamadi.');
    syncora_redirect('forgot_password.php');
}

$user = syncora_find_user_by_email($pdo, $email, [
    'user_id' => 'id_column',
    'user_email' => 'email_column',
]);

if (!$user) {
    unset($_SESSION['reset_email']);
    syncora_set_flash('error', 'Gecersiz sifre sifirlama talebi.');
    syncora_redirect('forgot_password.php');
}

$activeResets = syncora_find_active_password_resets($pdo, $user['user_email'], $user['user_id']);

if (!$activeResets) {
    unset($_SESSION['reset_email'], $_SESSION['reset_code_verified'], $_SESSION['reset_user_id'], $_SESSION['reset_verified_at']);
    syncora_set_flash('error', 'Dogrulama kodu gecersiz veya suresi dolmus. Lutfen tekrar kod alin.');
    syncora_redirect('forgot_password.php');
}

if ($action === 'verify_code') {
    if (!preg_match('/^[0-9]{6}$/', $resetCode)) {
        syncora_set_flash('error', 'Dogrulama kodu 6 haneli olmalidir.');
        syncora_redirect('reset_password.php');
    }

    $matchedReset = null;
    foreach ($activeResets as $candidateReset) {
        if (password_verify($resetCode, $candidateReset['reset_code_hash'])) {
            $matchedReset = $candidateReset;
            break;
        }
    }

    if (!$matchedReset) {
        syncora_set_flash('error', 'Dogrulama kodu hatali.');
        syncora_redirect('reset_password.php');
    }

    $_SESSION['reset_code_verified'] = true;
    $_SESSION['reset_user_id'] = $user['user_id'];
    $_SESSION['reset_id'] = $matchedReset['reset_id'];
    $_SESSION['reset_verified_at'] = time();
    syncora_set_flash('success', 'Kod dogrulandi. Yeni sifrenizi iki kutuya da yazin.');
    syncora_redirect('reset_password.php');
}

$verifiedResetId = $_SESSION['reset_id'] ?? null;
$verifiedReset = null;
foreach ($activeResets as $candidateReset) {
    if ((string) $candidateReset['reset_id'] === (string) $verifiedResetId) {
        $verifiedReset = $candidateReset;
        break;
    }
}

if ($action !== 'update_password' || empty($_SESSION['reset_code_verified']) || ($_SESSION['reset_user_id'] ?? null) !== $user['user_id'] || !$verifiedReset) {
    syncora_set_flash('error', 'Once dogrulama kodunu girin.');
    unset($_SESSION['reset_code_verified'], $_SESSION['reset_user_id'], $_SESSION['reset_id'], $_SESSION['reset_verified_at']);
    syncora_redirect('reset_password.php');
}

if (strlen($newPassword) < (int) $config['password_min_length']) {
    syncora_set_flash('error', 'Yeni sifre en az 6 karakter olmalidir.');
    syncora_redirect('reset_password.php');
}

if ($newPassword !== $newPasswordConfirm) {
    syncora_set_flash('error', 'Yeni sifreler eslesmiyor.');
    syncora_redirect('reset_password.php');
}

$newPasswordHash = syncora_hash_panel_password($newPassword);
$table = syncora_auth_table();
$idColumn = syncora_auth_column('id_column');
$passwordColumn = syncora_auth_column('password_column');

$pdo->beginTransaction();
try {
    $update = $pdo->prepare("
        UPDATE {$table}
        SET {$passwordColumn} = ?, `updated_at` = ?
        WHERE {$idColumn} = ?
    ");
    $update->execute([$newPasswordHash, gmdate('Y-m-d H:i:s'), $user['user_id']]);
    syncora_mark_password_reset_used($pdo, $verifiedReset['reset_id']);
    syncora_clear_reset_code($pdo, $user['user_id']);
    syncora_clear_user_sessions($pdo, $user['user_id']);
    $pdo->commit();
} catch (Throwable $e) {
    if ($pdo->inTransaction()) {
        $pdo->rollBack();
    }

    error_log('Sifre guncelleme hatasi: ' . $e->getMessage());
    syncora_set_flash('error', 'Sifre guncellenemedi. Lutfen tekrar deneyin.');
    syncora_redirect('reset_password.php');
}

unset($_SESSION['reset_email'], $_SESSION['reset_code_verified'], $_SESSION['reset_user_id'], $_SESSION['reset_id'], $_SESSION['reset_verified_at']);
unset($_SESSION['csrf_token']);

syncora_set_flash('success', 'Sifreniz basariyla guncellendi. Yeni sifrenizle giris yapabilirsiniz.');
syncora_redirect($config['login_path']);
