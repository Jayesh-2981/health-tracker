<?php

declare(strict_types=1);

namespace HealthTracker\Backend\Controllers;

use HealthTracker\Backend\Http\Response;
use HealthTracker\Backend\Services\GoogleOAuthService;

final class AuthController
{
    public function __construct(
        private GoogleOAuthService $googleOauthService,
    ) {}

    public function google(): never
    {
        $this->startSession();

        $state = bin2hex(random_bytes(32));

        $_SESSION['google_oauth_state'] = $state;

        $authorizationUrl = $this->googleOauthService->getAuthorizationUrl($state);

        header('Location: ' . $authorizationUrl, true, 302);

        exit;
    }

    public function googleCallback(): never
    {
        $this->startSession();

        $state = $_GET['state'] ?? '';
        $code = $_GET['code'] ?? '';

        if (!is_string($state) || !is_string($code)) {
            Response::json(
                [
                    'success' => false,
                    'error' => [
                        'code' => 'INVALID_OAUTH_CALLBACK',
                        'message' => 'Invalid OAuth callback parameters.',
                    ],
                ],
                400,
            );
        }

        $expectedState = $_SESSION['google_oauth_state'] ?? null;

        unset($_SESSION['google_oauth_state']);

        if (!is_string($expectedState) || !hash_equals($expectedState, $state)) {
            Response::json(
                [
                    'success' => false,
                    'error' => [
                        'code' => 'INVALID_OAUTH_STATE',
                        'message' => 'OAuth state validation failed.',
                    ],
                ],
                400,
            );
        }

        if ($code === '') {
            Response::json(
                [
                    'success' => false,
                    'error' => [
                        'code' => 'MISSING_OAUTH_CODE',
                        'message' => 'OAuth authorization code is missing.',
                    ],
                ],
                400,
            );
        }

        $token = $this->googleOauthService->exchangeCodeForToken($code);

        $accessToken = $token['access_token'] ?? null;

        if (!is_string($accessToken) || $accessToken === '') {
            throw new \RuntimeException(
                'Google access token was not returned.',
            );
        }

        $googleUser = $this->googleOauthService->getUserInfo($accessToken);

        $_SESSION['authenticated_user'] = [
            'google_id' => $googleUser['sub'],
            'email' => $googleUser['email'],
            'name' => $googleUser['name'] ?? null,
            'picture' => $googleUser['picture'] ?? null,
        ];

        Response::json([
            'success' => true,
            'data' => [
                'message' => 'Google authentication successful.',
                'user' => $_SESSION['authenticated_user'],
            ],
        ]);
    }

    private function startSession(): void
    {
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }
    }
}
