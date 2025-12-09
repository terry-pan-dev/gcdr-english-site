// API client for admin dashboard
// Note: API URLs will be injected from SST config at runtime

import {
  signIn,
  signOut,
  getCurrentUser,
  fetchAuthSession,
  fetchUserAttributes,
} from "aws-amplify/auth";
import { ensureAmplifyConfigured } from "./amplify-config";

// Cache for API base URL
let apiBaseUrlCache: string | null = null;
let apiBaseUrlPromise: Promise<string> | null = null;

const loadApiBaseUrl = async (): Promise<string> => {
  if (apiBaseUrlCache) {
    return apiBaseUrlCache;
  }

  if (apiBaseUrlPromise) {
    return apiBaseUrlPromise;
  }

  apiBaseUrlPromise = (async () => {
    try {
      // Try to get from window first (injected by pages)
      if (typeof window !== "undefined" && (window as any).__API_BASE_URL__) {
        const url = (window as any).__API_BASE_URL__;
        if (url) {
          apiBaseUrlCache = url;
          return url;
        }
      }

      // Try environment variable
      const envUrl = import.meta.env.PUBLIC_API_BASE_URL || "";
      if (envUrl) {
        apiBaseUrlCache = envUrl;
        return envUrl;
      }

      // Fallback: fetch from config endpoint
      if (typeof window !== "undefined") {
        const response = await fetch("/api/config.json");
        if (response.ok) {
          const config = await response.json();
          if (config.baseUrl) {
            apiBaseUrlCache = config.baseUrl;
            return config.baseUrl;
          }
        }
      }

      return "";
    } catch (error) {
      console.error("Error loading API base URL:", error);
      return "";
    } finally {
      apiBaseUrlPromise = null;
    }
  })();

  return apiBaseUrlPromise;
};

const getApiUrl = async (endpoint: string): Promise<string> => {
  const baseUrl = await loadApiBaseUrl();

  if (!baseUrl) {
    return "";
  }

  // Normalize base URL (remove trailing slash) and endpoint (ensure leading slash)
  const normalizedBase = baseUrl.replace(/\/+$/, "");
  const normalizedEndpoint = endpoint.startsWith("/")
    ? endpoint
    : `/${endpoint}`;

  // Combine: baseUrl + endpoint
  // e.g., https://xxx.lambda-url...on.aws + /api/admin/auth/login
  return `${normalizedBase}${normalizedEndpoint}`;
};

/**
 * Gets the access token from Amplify session
 * Also sets a cookie for server-side middleware to read
 */
export const getAuthToken = async (): Promise<string | null> => {
  if (typeof window === "undefined") return null;

  try {
    ensureAmplifyConfigured();
    const session = await fetchAuthSession();

    if (session.tokens?.accessToken) {
      const token = session.tokens.accessToken.toString();

      // Also set cookie for server-side middleware to read
      // Set cookie with 7 days expiration (same as typical Cognito token lifetime)
      const expires = new Date();
      expires.setTime(expires.getTime() + 7 * 24 * 60 * 60 * 1000); // 7 days
      document.cookie = `cognito_access_token=${token}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;

      return token;
    }

    return null;
  } catch (error) {
    console.error("Error getting auth token:", error);
    return null;
  }
};

/**
 * Removes auth tokens (called on logout)
 */
const removeAuthToken = (): void => {
  if (typeof window === "undefined") return;
  // Remove cookie
  document.cookie =
    "cognito_access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
};

/**
 * Ensures the access token is valid
 * Amplify automatically handles token refresh, so we just need to get the current session
 * @returns Valid access token or null if not authenticated
 */
const ensureValidToken = async (): Promise<string | null> => {
  try {
    ensureAmplifyConfigured();
    // Amplify automatically refreshes tokens, so we just fetch the current session
    return await getAuthToken();
  } catch (error) {
    console.error("Error ensuring valid token:", error);
    return null;
  }
};

interface ApiResponse<T> {
  data?: T;
  error?: string;
}

const apiRequest = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> => {
  try {
    const url = await getApiUrl(endpoint);

    // Check if URL is empty
    if (!url) {
      console.error(`API URL not configured for endpoint: ${endpoint}`);
      console.error("Tried to load from:", {
        window: typeof window !== "undefined" && (window as any).__API_URLS__,
        env: import.meta.env.PUBLIC_API_AUTH_LOGIN,
      });
      return {
        error: `API URL not configured for ${endpoint}. Please check your deployment and ensure Lambda function URLs are available.`,
      };
    }

    console.log(`Making API request to: ${url}`);

    // Ensure we have a valid token before making the request
    // Amplify automatically handles token refresh
    const token = await ensureValidToken();

    if (!token) {
      return {
        error: "Authentication required. Please log in again.",
      };
    }

    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        ...options.headers,
      },
    });

    // Check if response is JSON
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      const text = await response.text();
      console.error("Non-JSON response received. URL:", url);
      console.error("Response preview:", text.substring(0, 200));
      console.error(
        "This usually means the API URL is pointing to the wrong endpoint (e.g., Astro page instead of Lambda function)"
      );
      return {
        error: `Server returned HTML instead of JSON (${response.status}). The API URL may be incorrect. Check browser console for details.`,
      };
    }

    // Handle 401 Unauthorized - token might be expired
    // Amplify should handle refresh automatically, but if we get 401, try once more
    if (response.status === 401) {
      // Try getting a fresh token (Amplify may have refreshed it)
      const refreshedToken = await ensureValidToken();
      if (refreshedToken) {
        // Retry the request with the refreshed token
        const retryResponse = await fetch(url, {
          ...options,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${refreshedToken}`,
            ...options.headers,
          },
        });

        if (!retryResponse.ok) {
          const errorData = await retryResponse
            .json()
            .catch(() => ({ error: "Unknown error" }));
          // If still 401 after refresh, authentication failed
          if (retryResponse.status === 401) {
            removeAuthToken();
            return { error: "Authentication failed. Please log in again." };
          }
          return { error: errorData.error || `HTTP ${retryResponse.status}` };
        }

        // Success after refresh - return the successful response
        const data = await retryResponse.json();
        return { data };
      } else {
        // No token available - clear and return error
        removeAuthToken();
        return { error: "Session expired. Please log in again." };
      }
    }

    if (!response.ok) {
      const errorData = await response
        .json()
        .catch(() => ({ error: "Unknown error" }));
      return { error: errorData.error || `HTTP ${response.status}` };
    }

    const data = await response.json();
    return { data };
  } catch (error: any) {
    console.error("API request error:", error);
    return { error: error.message || "Network error" };
  }
};

// Auth API
export const authApi = {
  login: async (email: string, password: string) => {
    try {
      ensureAmplifyConfigured();

      // Use Amplify signIn - email is used as username
      const result = await signIn({
        username: email,
        password: password,
      });

      // Check if sign-in requires additional steps (MFA, etc.)
      if (result.isSignedIn) {
        // Successfully signed in
        return {
          data: {
            user: { email },
          },
        };
      } else {
        // Sign-in requires additional steps (not expected for basic email/password)
        return {
          error:
            "Sign-in requires additional steps. Please contact administrator.",
        };
      }
    } catch (error: any) {
      console.error("Amplify authentication error:", error);

      // Handle specific Amplify error types
      let errorMessage = "Authentication failed";
      if (error.name === "NotAuthorizedException") {
        errorMessage = "Incorrect email or password";
      } else if (error.name === "UserNotFoundException") {
        errorMessage = "User not found";
      } else if (error.name === "UserNotConfirmedException") {
        errorMessage = "User account is not confirmed";
      } else if (error.message) {
        errorMessage = error.message;
      }

      return {
        error: errorMessage,
      };
    }
  },

  logout: async () => {
    try {
      ensureAmplifyConfigured();

      // Sign out from Amplify (clears session and tokens)
      await signOut();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      // Always clear local tokens/cookies
      removeAuthToken();
    }
  },

  isAuthenticated: async (): Promise<boolean> => {
    try {
      ensureAmplifyConfigured();
      await getCurrentUser();
      return true;
    } catch (error) {
      return false;
    }
  },

  getCurrentUser: async (): Promise<{ email: string } | null> => {
    try {
      console.log("getCurrentUser: Starting...");
      ensureAmplifyConfigured();

      // Get current user from Amplify
      const user = await getCurrentUser();

      if (!user) {
        console.log("getCurrentUser: No user found");
        return null;
      }

      // Fetch user attributes to get email
      const attributes = await fetchUserAttributes();
      const email = attributes.email || user.username || "";

      console.log("getCurrentUser: Success, email:", email || "not found");

      if (!email) {
        console.error("getCurrentUser: No email found in user");
        return null;
      }

      return { email };
    } catch (error: any) {
      console.error("getCurrentUser: Exception:", error?.message || error);
      return null;
    }
  },
};

// Blog API
export interface BlogPost {
  id: string;
  title: string;
  subtitle?: string;
  author: string;
  date: string;
  category: string;
  excerpt: string;
  image?: string;
  featured: boolean;
  pinned: boolean;
  tags: string[];
  publish: boolean;
  seo?: {
    title?: string;
    description?: string;
    keywords?: string[];
  };
  s3Key?: string;
  content?: string;
  createdAt: string;
  updatedAt: string;
}

export const blogApi = {
  list: async (): Promise<ApiResponse<{ blogs: BlogPost[] }>> => {
    return apiRequest<{ blogs: BlogPost[] }>("/api/admin/blogs", {
      method: "GET",
    });
  },

  get: async (id: string): Promise<ApiResponse<BlogPost>> => {
    return apiRequest<BlogPost>(`/api/admin/blogs/${id}`, {
      method: "GET",
    });
  },

  create: async (
    blog: Partial<BlogPost> & { content: string }
  ): Promise<ApiResponse<BlogPost>> => {
    return apiRequest<BlogPost>("/api/admin/blogs", {
      method: "POST",
      body: JSON.stringify(blog),
    });
  },

  update: async (
    id: string,
    blog: Partial<BlogPost> & { content?: string }
  ): Promise<ApiResponse<BlogPost>> => {
    return apiRequest<BlogPost>(`/api/admin/blogs/${id}`, {
      method: "PUT",
      body: JSON.stringify(blog),
    });
  },

  delete: async (id: string): Promise<ApiResponse<{ message: string }>> => {
    return apiRequest<{ message: string }>(`/api/admin/blogs/${id}`, {
      method: "DELETE",
    });
  },
};

// Media API
export interface MediaAsset {
  id: string;
  filename: string;
  s3Key: string;
  url: string;
  type: "image" | "video";
  size: number;
  uploadedAt: string;
}

export const mediaApi = {
  list: async (): Promise<ApiResponse<{ media: MediaAsset[] }>> => {
    return apiRequest<{ media: MediaAsset[] }>("/api/admin/media", {
      method: "GET",
    });
  },

  upload: async (
    filename: string,
    type: "image" | "video",
    size?: number
  ): Promise<ApiResponse<{ uploadUrl: string; media: MediaAsset }>> => {
    return apiRequest<{ uploadUrl: string; media: MediaAsset }>(
      "/api/admin/media",
      {
        method: "POST",
        body: JSON.stringify({ filename, type, size }),
      }
    );
  },

  delete: async (id: string): Promise<ApiResponse<{ message: string }>> => {
    return apiRequest<{ message: string }>(`/api/admin/media/${id}`, {
      method: "DELETE",
    });
  },
};

// Explicit type exports for Vite compatibility
export type { BlogPost, MediaAsset };
