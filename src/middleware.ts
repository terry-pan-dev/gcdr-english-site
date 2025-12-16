// Astro middleware for server-side authentication
// Protects admin routes by verifying Cognito tokens before rendering

import { defineMiddleware } from "astro:middleware";
import { verifyCognitoToken, extractTokenFromRequest } from "./lib/server-auth";

export const onRequest = defineMiddleware(async (context, next) => {
  const { url, request } = context;
  const pathname = url.pathname;

  // Only protect admin routes (except login page)
  const isAdminRoute = pathname.startsWith("/admin");
  const isLoginPage = pathname === "/admin/login" || pathname === "/admin";

  if (isAdminRoute && !isLoginPage) {
    // Extract token from request
    const token = extractTokenFromRequest(request);

    if (!token) {
      // No token found - redirect to login
      // Store the original URL for redirect after login
      const redirectUrl = new URL("/admin/login", url.origin);
      redirectUrl.searchParams.set("redirect", pathname);
      return context.redirect(redirectUrl.toString(), 302);
    }

    // Verify token with Cognito
    const user = await verifyCognitoToken(token);

    if (!user) {
      // Invalid token - redirect to login
      const redirectUrl = new URL("/admin/login", url.origin);
      redirectUrl.searchParams.set("redirect", pathname);
      return context.redirect(redirectUrl.toString(), 302);
    }

    // Token is valid - store user info in context.locals for use in pages
    context.locals.user = user;
    context.locals.authenticated = true;
  }
  // Note: For login page, we let the client-side handle authentication checks
  // to avoid redirect loops and allow proper form interaction

  // Continue with the request
  return next();
});
