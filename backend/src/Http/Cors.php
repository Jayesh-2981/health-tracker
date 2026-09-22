<?php

declare(strict_types=1);

namespace HealthTracker\Backend\Http;

use HealthTracker\Backend\Config;

final class Cors
{
    public static function apply(): void
    {
        $frontendUrl = Config::get('FRONTEND_URL');

        if ($frontendUrl === null || $frontendUrl === '') {
            throw new \RuntimeException('FRONTEND_URL is not configured.');
        }

        $origin = $_SERVER['HTTP_ORIGIN'] ?? '';

        if ($origin !== '' && $origin === $frontendUrl) {
            header('Access-Control-Allow-Origin: ' . $frontendUrl);
            header('Access-Control-Allow-Credentials: true');
            header('Vary: Origin');
        }

        header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type, Accept');

        if (($_SERVER['REQUEST_METHOD'] ?? 'GET') === 'OPTIONS') {
            http_response_code(204);
            exit;
        }
    }
}
