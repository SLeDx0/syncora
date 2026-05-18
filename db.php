<?php

require_once __DIR__ . '/config/env.php';

syncora_load_env();

$dbHost = syncora_env(['MYSQL_HOST', 'DB_HOST'], '127.0.0.1');
$dbPort = (int) syncora_env(['MYSQL_PORT', 'DB_PORT'], '3306');
$dbName = syncora_env(['MYSQL_DATABASE', 'DB_DATABASE', 'DB_NAME'], 'syncora_panel');
$dbUser = syncora_env(['MYSQL_USER', 'DB_USER'], 'root');
$dbPassword = syncora_env(['MYSQL_PASSWORD', 'DB_PASSWORD', 'DB_PASS'], '');

$dsn = sprintf('mysql:host=%s;port=%d;dbname=%s;charset=utf8mb4', $dbHost, $dbPort, $dbName);

try {
    $pdo = new PDO($dsn, $dbUser, $dbPassword, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ]);
} catch (PDOException $e) {
    error_log('Veritabani baglanti hatasi: ' . $e->getMessage());
    http_response_code(500);
    exit('Veritabani baglantisi kurulamadi.');
}

function syncora_quote_identifier($identifier)
{
    $identifier = (string) $identifier;

    if (!preg_match('/^[A-Za-z0-9_]+$/', $identifier)) {
        throw new InvalidArgumentException('Gecersiz veritabani tanimlayicisi.');
    }

    return '`' . $identifier . '`';
}