<?php
session_start();

require_once __DIR__ . '/db.php';
require_once __DIR__ . '/functions/password_reset_helpers.php';
require_once __DIR__ . '/functions/send_reset_email.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    syncora_redirect('forgot_password.php');
}

if (!syncora_verify_csrf($_POST['csrf_token'] ?? '')) {
    syncora_set_flash('error', 'Gecersiz istek. Lutfen tekrar deneyin.');
    syncora_redirect('forgot_password.php');
}

$email = syncora_normalize_email($_POST['email'] ?? '');

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    syncora_set_flash('error', 'Gecerli bir e-posta adresi girin.');
    syncora_redirect('forgot_password.php');
}

$user = syncora_find_user_by_email($pdo, $email, [
    'user_id' => 'id_column',
    'user_name' => 'name_column',
    'user_email' => 'email_column',
]);

if (!$user) {
    syncora_set_flash('error', 'Bu e-posta ile kayitli hesap bulunamadi.');
    syncora_redirect('forgot_password.php');
}

$resetCode = (string) random_int(100000, 999999);
try {
    $pdo->beginTransaction();
    syncora_store_password_reset($pdo, $user, $resetCode);
    $pdo->commit();
} catch (Throwable $e) {
    if ($pdo->inTransaction()) {
        $pdo->rollBack();
    }

    error_log('Sifre sifirlama kodu kaydedilemedi: ' . $e->getMessage());
    syncora_set_flash('error', 'Sifre sifirlama kodu hazirlanamadi. Lutfen daha sonra tekrar deneyin.');
    syncora_redirect('forgot_password.php');
}

$mailSent = sendPasswordResetEmail($user['user_email'], $user['user_name'] ?? '', $resetCode);

if (!$mailSent) {
    syncora_clear_reset_code($pdo, $user['user_id']);
    syncora_set_flash('error', 'E-posta gonderilemedi. Lutfen SMTP ayarlarini kontrol edin.');
    syncora_redirect('forgot_password.php');
}

$_SESSION['reset_email'] = $user['user_email'];
unset($_SESSION['reset_code_verified'], $_SESSION['reset_user_id'], $_SESSION['reset_id'], $_SESSION['reset_verified_at']);
syncora_set_flash('success', 'Sifre sifirlama kodu e-posta adresinize gonderildi.');
syncora_redirect('reset_password.php');
