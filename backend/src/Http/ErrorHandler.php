<?php

declare(strict_types=1);

namespace HealthTracker\Backend\Http;

use HealthTracker\Backend\Config;
use Throwable;

final class ErrorHandler
{
    public static function register(): void
    {
        set_exception_handler(
            static function (Throwable $exception): never {
                error_log(
                    sprintf(
                        '[%s] %s in %s:%d',
                        get_class($exception),
                        $exception->getMessage(),
                        $exception->getFile(),
                        $exception->getLine(),
                    ),
                );

                $debug = Config::get('APP_DEBUG', 'false') === 'true';

                $message = $debug
                    ? $exception->getMessage()
                    : 'An unexpected server error occurred.';

                Response::json(
                    [
                        'success' => false,
                        'error' => [
                            'code' => 'INTERNAL_SERVER_ERROR',
                            'message' => $message,
                        ],
                    ],
                    500,
                );
            },
        );
    }
}
