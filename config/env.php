<?php

function syncora_load_env($path = null)
{
    static $loaded = [];

    $path = $path ?: __DIR__ . '/../.env';
    $realPath = realpath($path) ?: $path;

    if (isset($loaded[$realPath]) || !is_file($path) || !is_readable($path)) {
        return;
    }

    $loaded[$realPath] = true;
    $lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);

    foreach ($lines as $rawLine) {
        $line = trim($rawLine);

        if ($line === '' || strpos($line, '#') === 0 || strpos($line, '=') === false) {
            continue;
        }

        [$key, $value] = explode('=', $line, 2);
        $key = trim($key);
        $value = trim($value);

        if ($key === '') {
            continue;
        }

        $quote = substr($value, 0, 1);
        if (($quote === '"' || $quote === "'") && substr($value, -1) === $quote) {
            $value = substr($value, 1, -1);
        }

        if (getenv($key) === false) {
            putenv($key . '=' . $value);
        }

        if (!isset($_ENV[$key])) {
            $_ENV[$key] = $value;
        }

        if (!isset($_SERVER[$key])) {
            $_SERVER[$key] = $value;
        }
    }
}

function syncora_env($keys, $default = null)
{
    syncora_load_env();

    foreach ((array) $keys as $key) {
        $value = getenv($key);

        if ($value !== false && trim((string) $value) !== '') {
            return (string) $value;
        }
    }

    return $default;
}
