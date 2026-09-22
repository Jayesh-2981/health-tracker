<?php

declare(strict_types=1);

use HealthTracker\Backend\Config;
use HealthTracker\Backend\Controllers\HealthController;
use HealthTracker\Backend\Http\Cors;
use HealthTracker\Backend\Http\ErrorHandler;
use HealthTracker\Backend\Http\Request;
use HealthTracker\Backend\Http\Router;

require dirname(__DIR__) . '/vendor/autoload.php';

Config::load(dirname(__DIR__) . '/.env');

ErrorHandler::register();

Cors::apply();

$request = new Request();
$router = new Router();
$healthController = new HealthController();

$router->get(
    '/api/v1/health',
    [$healthController, 'index'],
);

$router->dispatch($request);
