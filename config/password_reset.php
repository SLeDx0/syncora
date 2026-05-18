<?php

require_once __DIR__ . '/env.php';

return [
    'users_table' => syncora_env(['SYNCORA_AUTH_TABLE'], 'member'),
    'password_resets_table' => syncora_env(['SYNCORA_PASSWORD_RESETS_TABLE'], 'password_resets'),
    'id_column' => syncora_env(['SYNCORA_AUTH_ID_COLUMN'], 'id'),
    'name_column' => syncora_env(['SYNCORA_AUTH_NAME_COLUMN'], 'name'),
    'email_column' => syncora_env(['SYNCORA_AUTH_EMAIL_COLUMN'], 'email'),
    'password_column' => syncora_env(['SYNCORA_AUTH_PASSWORD_COLUMN'], 'password_hash'),
    'reset_email_column' => syncora_env(['SYNCORA_RESET_EMAIL_COLUMN'], 'email'),
    'reset_user_id_column' => syncora_env(['SYNCORA_RESET_USER_ID_COLUMN'], 'user_id'),
    'reset_code_hash_column' => syncora_env(['SYNCORA_RESET_CODE_HASH_COLUMN'], 'code_hash'),
    'reset_code_expires_column' => syncora_env(['SYNCORA_RESET_CODE_EXPIRES_COLUMN'], 'expires_at'),
    'reset_used_at_column' => syncora_env(['SYNCORA_RESET_USED_AT_COLUMN'], 'used_at'),
    'reset_created_at_column' => syncora_env(['SYNCORA_RESET_CREATED_AT_COLUMN'], 'created_at'),
    'code_ttl_seconds' => 15 * 60,
    'password_min_length' => 6,
    'login_path' => syncora_env(['SYNCORA_LOGIN_PATH'], 'index.html'),
];
