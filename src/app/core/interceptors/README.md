# Authentication Interceptors

This directory contains HTTP interceptors for authentication and authorization in the application.

## AuthInterceptor

`auth.interceptor.ts` is responsible for:

1. Adding authentication tokens to outgoing HTTP requests
2. Handling authentication errors (401, 403)
3. Special case handling for login/public endpoints

### Important Note

The interceptor specifically bypasses adding authentication headers to login requests (`auth/login`). This is critical because:

- Login endpoints should never receive authentication headers
- Adding expired tokens to login requests can cause 403 Forbidden errors

### Usage

This interceptor is registered in the `app.config.ts` file and automatically applies to all HTTP requests. 