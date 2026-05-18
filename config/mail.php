<?php

require_once __DIR__ . '/env.php';

return [
    'host' => syncora_env(['MAIL_HOST', 'SMTP_HOST'], 'smtp.gmail.com'),
    'username' => syncora_env(['MAIL_USERNAME', 'GMAIL_USER', 'SMTP_USER', 'MAIL_USER'], ''),
    'password' => syncora_env(['MAIL_PASSWORD', 'GMAIL_APP_PASSWORD', 'SMTP_PASS', 'MAIL_PASS'], ''),
    'port' => (int) syncora_env(['MAIL_PORT', 'SMTP_PORT'], '587'),
    'encryption' => syncora_env(['MAIL_ENCRYPTION', 'SMTP_ENCRYPTION'], 'tls'),
    'from_email' => syncora_env(['MAIL_FROM', 'GMAIL_FROM', 'MAIL_USERNAME', 'GMAIL_USER'], ''),
    'from_name' => syncora_env(['MAIL_FROM_NAME'], 'Syncora'),
];
