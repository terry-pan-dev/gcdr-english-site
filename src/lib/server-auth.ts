// Server-side authentication utilities for Astro middleware
// Uses AWS Cognito JWT verification for fast, local token validation

import { CognitoJwtVerifier } from "aws-jwt-verify";

// Get Cognito config from environment (works in both Node.js and Astro contexts)
const getCognitoConfig = () => {
  const userPoolId = 
    (typeof process !== "undefined" && process.env?.PUBLIC_COGNITO_USER_POOL_ID) ||
    (typeof import.meta !== "undefined" && import.meta.env?.PUBLIC_COGNITO_USER_POOL_ID) ||
    "";
  
  const clientId = 
    (typeof process !== "undefined" && process.env?.PUBLIC_COGNITO_USER_POOL_CLIENT_ID) ||
    (typeof import.meta !== "undefined" && import.meta.env?.PUBLIC_COGNITO_USER_POOL_CLIENT_ID) ||
    "";

  return { userPoolId, clientId };
};

// Create JWT verifier (cached per user pool)
let jwtVerifier: ReturnType<typeof CognitoJwtVerifier.create> | null = null;

const getJwtVerifier = () => {
  if (jwtVerifier) {
    return jwtVerifier;
  }

  const { userPoolId, clientId } = getCognitoConfig();
  
  if (!userPoolId) {
    console.error("JWT Verifier: PUBLIC_COGNITO_USER_POOL_ID environment variable is not set");
    throw new Error("PUBLIC_COGNITO_USER_POOL_ID environment variable is not set");
  }

  try {
    // Create verifier for access tokens
    // clientId is optional but recommended for additional security
    jwtVerifier = CognitoJwtVerifier.create({
      userPoolId,
      tokenUse: "access",
      ...(clientId && { clientId }),
    });

    return jwtVerifier;
  } catch (error: any) {
    console.error("Failed to create JWT verifier:", error.message || error);
    throw error;
  }
};

export interface VerifiedUser {
  email: string;
  sub: string;
}

/**
 * Verifies a Cognito access token using JWT verification (local, no API calls)
 * This is faster and more efficient than GetUserCommand
 * @param accessToken - The Cognito access token (JWT)
 * @returns User information if token is valid, null otherwise
 */
export async function verifyCognitoToken(
  accessToken: string
): Promise<VerifiedUser | null> {
  try {
    // Validate token format first (basic check)
    if (!accessToken || typeof accessToken !== "string" || accessToken.split(".").length !== 3) {
      console.error("Token verification error: Invalid token format");
      return null;
    }

    const verifier = getJwtVerifier();
    
    // Verify token locally (checks signature, expiration, issuer, audience)
    // This is much faster than making an API call to Cognito
    const payload = await verifier.verify(accessToken);

    // Extract user information from JWT payload
    // Access tokens contain: sub, username, email (if available), etc.
    const email = (payload.email as string) || (payload.username as string) || "";
    const sub = payload.sub as string;

    if (!sub) {
      console.error("Token verification error: No 'sub' claim in token");
      return null;
    }

    return { email, sub };
  } catch (error: any) {
    // Handle specific error types
    if (error.name === "TokenExpiredError" || error.message?.includes("expired")) {
      console.error("Token verification error: Token has expired");
    } else if (error.name === "TokenInvalidError" || error.message?.includes("invalid")) {
      console.error("Token verification error: Token is invalid", error.message);
    } else if (error.message?.includes("PUBLIC_COGNITO_USER_POOL_ID")) {
      console.error("Token verification error: Configuration missing -", error.message);
    } else {
      console.error("Token verification error:", error.name || error.message || error);
    }
    return null;
  }
}

/**
 * Extracts the access token from a request
 * Checks both Authorization header and cookies
 * @param request - The incoming request
 * @returns The access token if found, null otherwise
 */
export function extractTokenFromRequest(request: Request): string | null {
  // Check Authorization header first
  const authHeader = request.headers.get("authorization");
  if (authHeader) {
    // Support both "Bearer <token>" and just "<token>"
    const token = authHeader.startsWith("Bearer ")
      ? authHeader.substring(7)
      : authHeader;
    if (token) return token.trim();
  }

  // Check cookies (for browser-based requests)
  const cookieHeader = request.headers.get("cookie");
  if (cookieHeader) {
    const cookies = cookieHeader.split(";").map((c) => c.trim());
    const tokenCookie = cookies.find((c) =>
      c.startsWith("cognito_access_token=")
    );
    if (tokenCookie) {
      // Extract value after "=", handling URL encoding
      const value = tokenCookie.substring("cognito_access_token=".length);
      // Decode URL-encoded values (cookies may be URL-encoded)
      try {
        return decodeURIComponent(value);
      } catch {
        // If decoding fails, return as-is
        return value;
      }
    }
  }

  return null;
}

