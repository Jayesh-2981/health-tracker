<?php

declare(strict_types=1);

namespace HealthTracker\Backend\Http;

final class Router
{
    /**
     * @var array<int, array{method: string, path: string, handler: callable}>
     */
    private array $routes = [];

    public function get(string $path, callable $handler): void
    {
        $this->addRoute('GET', $path, $handler);
    }

    public function post(string $path, callable $handler): void
    {
        $this->addRoute('POST', $path, $handler);
    }

    public function put(string $path, callable $handler): void
    {
        $this->addRoute('PUT', $path, $handler);
    }

    public function delete(string $path, callable $handler): void
    {
        $this->addRoute('DELETE', $path, $handler);
    }

    public function dispatch(Request $request): never
    {
        foreach ($this->routes as $route) {
            if (
                $route['method'] === $request->getMethod()
                && $route['path'] === $request->getPath()
            ) {
                ($route['handler'])($request);

                exit;
            }
        }

        Response::json(
            [
                'success' => false,
                'error' => [
                    'code' => 'NOT_FOUND',
                    'message' => 'Route not found.',
                ],
            ],
            404,
        );
    }

    private function addRoute(
        string $method,
        string $path,
        callable $handler,
    ): void {
        $this->routes[] = [
            'method' => $method,
            'path' => $path,
            'handler' => $handler,
        ];
    }
}
