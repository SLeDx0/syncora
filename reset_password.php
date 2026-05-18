<?php
session_start();

require_once __DIR__ . '/functions/password_reset_helpers.php';

if (empty($_SESSION['reset_email'])) {
    syncora_redirect('forgot_password.php');
}

$error = syncora_take_flash('error');
$success = syncora_take_flash('success');
$isCodeVerified = !empty($_SESSION['reset_code_verified']);
?>

<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Sifre Sifirla - Syncora</title>
</head>
<body>
    <h2>Yeni Sifre Belirle</h2>

    <?php if ($error !== ''): ?>
        <p style="color:red;"><?php echo syncora_escape($error); ?></p>
    <?php endif; ?>

    <?php if ($success !== ''): ?>
        <p style="color:green;"><?php echo syncora_escape($success); ?></p>
    <?php endif; ?>

    <?php if (!$isCodeVerified): ?>
        <form action="update_password.php" method="POST">
            <input type="hidden" name="csrf_token" value="<?php echo syncora_escape(syncora_csrf_token()); ?>">
            <input type="hidden" name="action" value="verify_code">

            <input type="text" name="reset_code" placeholder="6 haneli dogrulama kodu" inputmode="numeric" pattern="[0-9]{6}" maxlength="6" required>
            <br><br>

            <button type="submit">Kodu Dogrula</button>
        </form>
    <?php else: ?>
        <form action="update_password.php" method="POST">
            <input type="hidden" name="csrf_token" value="<?php echo syncora_escape(syncora_csrf_token()); ?>">
            <input type="hidden" name="action" value="update_password">

            <input type="password" name="new_password" placeholder="Yeni sifre" minlength="6" required>
            <br><br>

            <input type="password" name="new_password_confirm" placeholder="Yeni sifre tekrar" minlength="6" required>
            <br><br>

            <button type="submit">Sifremi Guncelle</button>
        </form>
    <?php endif; ?>
</body>
</html>
