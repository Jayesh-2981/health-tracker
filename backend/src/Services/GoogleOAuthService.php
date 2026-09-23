<?php

declare(strict_types=1);

namespace HealthTracker\Backend\Services;

use HealthTracker\Backend\Config;

final class GoogleOAuthService
{
    private const AUTORIZATION_ENDPOINT = 'https://accounts.google.com/o/oauth2/v2/auth';

    private const TOKEN_ENDPOINT = 'https://oauth2.googleapis.com/token';

    private const USERINFO_ENDPOINT = 'https://openidconnect.googleapis.com/v1/userinfo';

    private const SCOPES = [
        'openid',
        'email',
        'profile',
    ];

    public function getAuthorizationUrl(string $state): string
    {
        $clientId = $this->getRequiredConfig('GOOGLE_CLIENT_ID');
        $redirectUri = $this->getRequiredConfig('GOOGLE_REDIRECT_URI');

        $parameters = [
            'client_id' => $clientId,
            'redirect_uri' => $redirectUri,
            'response_type' => 'code',
            'scope' => implode(' ', self::SCOPES),
            'state' => $state,
            'access_type' => 'offline',
            'include_granted_scopes' => 'true',
        ];

        return self::AUTORIZATION_ENDPOINT . '?' . http_build_query($parameters);
    }

    /**
     * @return array<string, mixed>
     */
    public function exchangeCodeForToken(string $code): array
    {
        $clientId = $this->getRequiredConfig('GOOGLE_CLIENT_ID');
        $clientSecret = $this->getRequiredConfig('GOOGLE_CLIENT_SECRET');
        $redirectUri = $this->getRequiredConfig('GOOGLE_REDIRECT_URI');

        $response = $this->postForm(
            self::TOKEN_ENDPOINT,
            [
                'client_id' => $clientId,
                'client_secret' => $clientSecret,
                'code' => $code,
                'grant_type' => 'authorization_code',
                'redirect_uri' => $redirectUri,
            ],
        );

        if ($response['status_code'] < 200 || $response['status_code'] >= 300) {
            throw new \RuntimeException(
                'Google token exchange failed.',
            );
        }

        $data = json_decode($response['body'], true);

        if (!is_array($data) || !isset($data['access_token'])) {
            throw new \RuntimeException(
                'Google token response was invalid.',
            );
        }

        return $data;
    }

    /**
     * @return array<string, mixed>
     */
    public function getUserInfo(string $accessToken): array
    {
        $response = $this->get(
            self::USERINFO_ENDPOINT,
            $accessToken,
        );

        if ($response['status_code'] < 200 || $response['status_code'] >= 300) {
            throw new \RuntimeException(
                'Google user information request faild.',
            );
        }

        $data = json_decode($response['body'], true);

        if (!is_array($data) || !isset($data['sub']) || !isset($data['email'])) {
            throw new \RuntimeException(
                'Goolge user information response was invalid.',
            );
        }

        return $data;
    }

    /**
     * @param array<string, string> $fields
     * 
     * @return array{status_code: int, body: string}
     */
    private function postForm(string $url, array $fields): array
    {
        $curl = curl_init($url);

        if ($curl === false) {
            throw new \RuntimeException(
                'Unable to initialize HTTP client.'
            );
        }

        curl_setopt_array(
            $curl,
            [
                CURLOPT_POST => true,
                CURLOPT_POSTFIELDS => http_build_query($fields),
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_TIMEOUT => 15,
                CURLOPT_HTTPHEADER => [
                    'Accept: application/json',
                    'Content-Type: application/x-www-form-urlencoded',
                ],
            ],
        );

        $body = curl_exec($curl);

        if ($body === false) {
            $error = curl_error($curl);

            curl_close($curl);

            throw new \RuntimeException(
                'Google HTTP request failed:' . $error,
            );
        }

        $statusCode = curl_getinfo($curl, CURLINFO_HTTP_CODE);

        curl_close($curl);

        return [
            'status_code' => $statusCode,
            'body' => $body,
        ];
    }

    /**
     * @return array{status_code: int, body: string}
     */
    private function get(string $url, string $accessToken): array
    {
        $curl = curl_init($url);

        if ($curl === false) {
            throw new \RuntimeException(
                'Unable to initialize HTTP client.'
            );
        }

        curl_setopt_array(
            $curl,
            [
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_TIMEOUT => 15,
                CURLOPT_HTTPHEADER => [
                    'Accept: application/json',
                    'Authorization: Bearer ' . $accessToken,
                ],
            ],
        );

        $body = curl_exec($curl);

        if ($body === false) {
            $error = curl_error($curl);

            curl_close($curl);

            throw new \RuntimeException(
                'Google HTTP request failed: ' . $error,
            );
        }

        $statusCode = curl_getinfo($curl, CURLINFO_HTTP_CODE);

        curl_close($curl);

        return [
            'status_code' => $statusCode,
            'body' => $body,
        ];
    }

    private function getRequiredConfig(string $name): string
    {
        $value = Config::get($name);

        if ($value === null || $value === '') {
            throw new \RuntimeException(
                $name . ' is not configured.',
            );
        }

        return $value;
    }
}
