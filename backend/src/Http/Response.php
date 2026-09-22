<?php

declare(strict_types=1);

namespace HealthTracker\Backend\Http;

final class Response
{
    public static function json(
        array $data,
        int $statusCode = 200,
    ): never {
        http_response_code($statusCode);

        header('Content-Type: application/json; charset=utf-8');

        echo json_encode(
            $data,
            JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE,
        );

        exit;
    }
}
