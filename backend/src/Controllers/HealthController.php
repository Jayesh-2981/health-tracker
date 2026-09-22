<?php

declare(strict_types=1);

namespace HealthTracker\Backend\Controllers;

use HealthTracker\Backend\Http\Response;

final class HealthController
{
    public function index(): never
    {
        Response::json([
            'success' => true,
            'data' => [
                'status' => 'ok',
                'service' => 'health-tracker-api',
            ],
        ]);
    }
}
