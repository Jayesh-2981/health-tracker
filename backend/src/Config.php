<?php

declare(strict_types=1);

namespace HealthTracker\Backend;

use Exception;

final class Config
{
    public static function load(String $path): void
    {
        if (!is_file($path)) {
            throw new \RuntimeException("Environment file not found.");
        }

        $lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);

        if ($lines === false) {
            throw new \RuntimeException("Unable to read Enviornment files.");
        }

        foreach ($lines as $line) {
            $line = trim($line);

            if ($line === '' || str_starts_with($line, '#')) {
                continue;
            }

            [$name, $value] = array_pad(explode('=', $line, 2), 2, '');

            $name = trim($name);
            $value = trim($value);

            if ($name === '') {
                continue;
            }

            $_ENV[$name] = $value;
        }
    }

    public static function get(String $name, ?string $default = null): ?string
    {
        return $_ENV[$name] ?? $default;
    }
}
