<?php
session_start();

require_once __DIR__ . '/functions/password_reset_helpers.php';

$error = syncora_take_flash('error');
$success = syncora_take_flash('success');
?>

<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Sifremi Unuttum - Syncora</title>
</head>
<body>
    <h2>Sifremi Unuttum</h2>

    <?php if ($error !== ''): ?>
        <p style="color:red;"><?php echo syncora_escape($error); ?></p>
    <?php endif; ?>

    <?php if ($success !== ''): ?>
        <p style="color:green;"><?php echo syncora_escape($success); ?></p>
    <?php endif; ?>

    <form action="send_reset_code.php" method="POST">
        <input type="hidden" name="csrf_token" value="<?php echo syncora_escape(syncora_csrf_token()); ?>">
        <input type="email" name="email" placeholder="Gmail / E-posta adresiniz" required>
        <button type="submit">Kod Gonder</button>
    </form>
</body>
</html>
