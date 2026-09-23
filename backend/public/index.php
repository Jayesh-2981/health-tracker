<?php

declare(strict_types=1);

use HealthTracker\Backend\Config;
use HealthTracker\Backend\Controllers\AuthController;
use HealthTracker\Backend\Controllers\HealthController;
use HealthTracker\Backend\Http\Cors;
use HealthTracker\Backend\Http\ErrorHandler;
use HealthTracker\Backend\Http\Request;
use HealthTracker\Backend\Http\Router;
use HealthTracker\Backend\Services\GoogleOAuthService;

require dirname(__DIR__) . '/vendor/autoload.php';

Config::load(dirname(__DIR__) . '/.env');

ErrorHandler::register();

Cors::apply();

$request = new Request();
$router = new Router();

$healthController = new HealthController();
$googleOAuthService = new GoogleOAuthService();
$authController = new AuthController($googleOAuthService);

$router->get(
    '/api/v1/health',
    [$healthController, 'index'],
);

$router->get(
    '/api/v1/auth/google',
    [$authController, 'google'],
);

$router->get(
    '/api/v1/auth/google/callback',
    [$authController, 'googleCallback'],
);

$router->dispatch($request);
