<?php

require_once __DIR__ . '/../config/password_reset.php';

function syncora_password_reset_config()
{
    static $config = null;

    if ($config === null) {
        $config = require __DIR__ . '/../config/password_reset.php';
    }

    return $config;
}

function syncora_auth_table()
{
    $config = syncora_password_reset_config();
    return syncora_quote_identifier($config['users_table']);
}

function syncora_auth_column($key)
{
    $config = syncora_password_reset_config();
    return syncora_quote_identifier($config[$key]);
}

function syncora_password_resets_table()
{
    $config = syncora_password_reset_config();
    return syncora_quote_identifier($config['password_resets_table']);
}

function syncora_reset_column($key)
{
    $config = syncora_password_reset_config();
    return syncora_quote_identifier($config[$key]);
}

function syncora_normalize_email($email)
{
    $email = trim((string) $email);
    return function_exists('mb_strtolower') ? mb_strtolower($email, 'UTF-8') : strtolower($email);
}

function syncora_canonical_email($email)
{
    $email = syncora_normalize_email($email);
    $atPosition = strrpos($email, '@');

    if ($atPosition === false || $atPosition <= 0) {
        return $email;
    }

    $local = substr($email, 0, $atPosition);
    $domain = substr($email, $atPosition + 1);

    if ($domain === 'googlemail.com') {
        $domain = 'gmail.com';
    }

    if ($domain === 'gmail.com') {
        $plusPosition = strpos($local, '+');

        if ($plusPosition !== false) {
            $local = substr($local, 0, $plusPosition);
        }

        $local = str_replace('.', '', $local);
    }

    return $local . '@' . $domain;
}

function syncora_is_gmail_address($email)
{
    $canonical = syncora_canonical_email($email);
    return substr($canonical, -10) === '@gmail.com';
}

function syncora_find_user_by_email(PDO $pdo, $email, array $selectMap)
{
    $email = syncora_normalize_email($email);
    $table = syncora_auth_table();
    $emailColumn = syncora_auth_column('email_column');
    $selectSql = syncora_build_select_sql($selectMap);

    $stmt = $pdo->prepare("SELECT {$selectSql} FROM {$table} WHERE {$emailColumn} = ? LIMIT 1");
    $stmt->execute([$email]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user) {
        return $user;
    }

    if (!syncora_is_gmail_address($email)) {
        return null;
    }

    $stmt = $pdo->prepare("SELECT {$selectSql} FROM {$table} WHERE LOWER({$emailColumn}) LIKE ? OR LOWER({$emailColumn}) LIKE ?");
    $stmt->execute(['%@gmail.com', '%@googlemail.com']);
    $wanted = syncora_canonical_email($email);

    while ($candidate = $stmt->fetch(PDO::FETCH_ASSOC)) {
        if (!empty($candidate['user_email']) && syncora_canonical_email($candidate['user_email']) === $wanted) {
            return $candidate;
        }
    }

    return null;
}

function syncora_build_select_sql(array $selectMap)
{
    $parts = [];

    foreach ($selectMap as $alias => $columnKey) {
        $parts[] = syncora_auth_column($columnKey) . ' AS ' . syncora_quote_identifier($alias);
    }

    return implode(', ', $parts);
}

function syncora_clear_reset_code(PDO $pdo, $userId)
{
    $table = syncora_password_resets_table();
    $userIdColumn = syncora_reset_column('reset_user_id_column');
    $usedAtColumn = syncora_reset_column('reset_used_at_column');

    $stmt = $pdo->prepare("UPDATE {$table} SET {$usedAtColumn} = ? WHERE {$userIdColumn} = ? AND {$usedAtColumn} IS NULL");
    $stmt->execute([gmdate('Y-m-d H:i:s'), $userId]);
}

function syncora_store_password_reset(PDO $pdo, array $user, $resetCode)
{
    $config = syncora_password_reset_config();
    $table = syncora_password_resets_table();
    $emailColumn = syncora_reset_column('reset_email_column');
    $userIdColumn = syncora_reset_column('reset_user_id_column');
    $hashColumn = syncora_reset_column('reset_code_hash_column');
    $expiresColumn = syncora_reset_column('reset_code_expires_column');
    $usedAtColumn = syncora_reset_column('reset_used_at_column');
    $createdAtColumn = syncora_reset_column('reset_created_at_column');
    $now = gmdate('Y-m-d H:i:s');
    $expires = gmdate('Y-m-d H:i:s', time() + (int) $config['code_ttl_seconds']);

    syncora_clear_reset_code($pdo, $user['user_id']);

    $stmt = $pdo->prepare("
        INSERT INTO {$table}
            ({$emailColumn}, {$userIdColumn}, {$hashColumn}, {$expiresColumn}, {$usedAtColumn}, {$createdAtColumn})
        VALUES
            (?, ?, ?, ?, NULL, ?)
    ");
    $stmt->execute([
        syncora_normalize_email($user['user_email']),
        $user['user_id'],
        password_hash((string) $resetCode, PASSWORD_DEFAULT),
        $expires,
        $now,
    ]);

    return [
        'expires_at' => $expires,
    ];
}

function syncora_find_active_password_resets(PDO $pdo, $email, $userId)
{
    $table = syncora_password_resets_table();
    $emailColumn = syncora_reset_column('reset_email_column');
    $userIdColumn = syncora_reset_column('reset_user_id_column');
    $hashColumn = syncora_reset_column('reset_code_hash_column');
    $expiresColumn = syncora_reset_column('reset_code_expires_column');
    $usedAtColumn = syncora_reset_column('reset_used_at_column');

    $stmt = $pdo->prepare("
        SELECT `id` AS reset_id,
               {$emailColumn} AS reset_email,
               {$userIdColumn} AS reset_user_id,
               {$hashColumn} AS reset_code_hash,
               {$expiresColumn} AS reset_expires_at
        FROM {$table}
        WHERE {$emailColumn} = ?
          AND {$userIdColumn} = ?
          AND {$usedAtColumn} IS NULL
          AND {$expiresColumn} > UTC_TIMESTAMP()
        ORDER BY {$expiresColumn} DESC, `id` DESC
    ");
    $stmt->execute([syncora_normalize_email($email), $userId]);

    return $stmt->fetchAll(PDO::FETCH_ASSOC) ?: [];
}

function syncora_mark_password_reset_used(PDO $pdo, $resetId)
{
    $table = syncora_password_resets_table();
    $usedAtColumn = syncora_reset_column('reset_used_at_column');

    $stmt = $pdo->prepare("UPDATE {$table} SET {$usedAtColumn} = ? WHERE `id` = ? AND {$usedAtColumn} IS NULL");
    $stmt->execute([gmdate('Y-m-d H:i:s'), $resetId]);
}


function syncora_clear_user_sessions(PDO $pdo, $userId)
{
    $stmt = $pdo->prepare("DELETE FROM `syncora_sessions` WHERE `user_id` = ?");
    $stmt->execute([$userId]);
}

function syncora_hash_panel_password($password)
{
    return password_hash((string) $password, PASSWORD_DEFAULT);
}

function syncora_verify_panel_password($password, $stored)
{
    $parts = explode('$', (string) $stored);

    if (count($parts) === 4 && $parts[0] === 'pbkdf2') {
        [$kind, $iterations, $salt, $expected] = $parts;
        if (!ctype_digit($iterations) || $salt === '' || !ctype_xdigit($expected)) {
            return false;
        }

        $actual = hash_pbkdf2('sha256', (string) $password, $salt, (int) $iterations, 32, true);
        return hash_equals(hex2bin($expected), $actual);
    }

    return password_verify((string) $password, (string) $stored);
}

function syncora_redirect($path)
{
    header('Location: ' . $path);
    exit;
}

function syncora_set_flash($key, $message)
{
    $_SESSION[$key] = $message;
}

function syncora_take_flash($key)
{
    if (empty($_SESSION[$key])) {
        return '';
    }

    $message = (string) $_SESSION[$key];
    unset($_SESSION[$key]);

    return $message;
}

function syncora_escape($value)
{
    return htmlspecialchars((string) $value, ENT_QUOTES, 'UTF-8');
}

function syncora_csrf_token()
{
    if (empty($_SESSION['csrf_token'])) {
        $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
    }

    return $_SESSION['csrf_token'];
}

function syncora_verify_csrf($token)
{
    return !empty($_SESSION['csrf_token']) && is_string($token) && hash_equals($_SESSION['csrf_token'], $token);
}
