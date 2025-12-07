// API client for admin dashboard
// Note: API URLs will be injected from SST config at runtime

import { CognitoUserPool, CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";

// Cache for API base URL
let apiBaseUrlCache: string | null = null;
let apiBaseUrlPromise: Promise<string> | null = null;

// Cache for Cognito config
let cognitoConfig: {
  userPoolId: string;
  clientId: string;
  region: string;
} | null = null;

const loadCognitoConfig = (): {
  userPoolId: string;
  clientId: string;
  region: string;
} => {
  if (cognitoConfig) {
    return cognitoConfig;
  }

  // Try to get from window first (injected by pages)
  if (typeof window !== "undefined") {
    const win = window as any;
    if (win.__COGNITO_USER_POOL_ID__ && win.__COGNITO_USER_POOL_CLIENT_ID__ && win.__AWS_REGION__) {
      cognitoConfig = {
        userPoolId: win.__COGNITO_USER_POOL_ID__,
        clientId: win.__COGNITO_USER_POOL_CLIENT_ID__,
        region: win.__AWS_REGION__,
      };
      return cognitoConfig;
    }
  }

  // Try environment variables
  const userPoolId = import.meta.env.PUBLIC_COGNITO_USER_POOL_ID || "";
  const clientId = import.meta.env.PUBLIC_COGNITO_USER_POOL_CLIENT_ID || "";
  const region = import.meta.env.PUBLIC_AWS_REGION || "ap-southeast-2";

  if (userPoolId && clientId) {
    cognitoConfig = { userPoolId, clientId, region };
    return cognitoConfig;
  }

  throw new Error("Cognito configuration not found. Please ensure environment variables are set.");
};

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
  const normalizedEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  
  // Combine: baseUrl + endpoint
  // e.g., https://xxx.lambda-url...on.aws + /api/admin/auth/login
  return `${normalizedBase}${normalizedEndpoint}`;
};

const getAuthToken = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("cognito_access_token");
};

const setAuthToken = (token: string): void => {
  if (typeof window === "undefined") return;
  localStorage.setItem("cognito_access_token", token);
};

const removeAuthToken = (): void => {
  if (typeof window === "undefined") return;
  localStorage.removeItem("cognito_access_token");
  localStorage.removeItem("cognito_id_token");
  localStorage.removeItem("cognito_refresh_token");
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
        error: `API URL not configured for ${endpoint}. Please check your deployment and ensure Lambda function URLs are available.` 
      };
    }
    
    console.log(`Making API request to: ${url}`);
    const token = getAuthToken();
    
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
    });

    // Check if response is JSON
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      const text = await response.text();
      console.error("Non-JSON response received. URL:", url);
      console.error("Response preview:", text.substring(0, 200));
      console.error("This usually means the API URL is pointing to the wrong endpoint (e.g., Astro page instead of Lambda function)");
      return { 
        error: `Server returned HTML instead of JSON (${response.status}). The API URL may be incorrect. Check browser console for details.` 
      };
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: "Unknown error" }));
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
      const config = loadCognitoConfig();
      const userPool = new CognitoUserPool({
        UserPoolId: config.userPoolId,
        ClientId: config.clientId,
      });

      const authenticationDetails = new AuthenticationDetails({
        Username: email,
        Password: password,
      });

      const cognitoUser = new CognitoUser({
        Username: email,
        Pool: userPool,
      });

      return new Promise<{ data?: { user: { email: string } }; error?: string }>((resolve) => {
        cognitoUser.authenticateUser(authenticationDetails, {
          onSuccess: (result) => {
            // Store tokens
            const accessToken = result.getAccessToken().getJwtToken();
            const idToken = result.getIdToken().getJwtToken();
            const refreshToken = result.getRefreshToken().getToken();

            setAuthToken(accessToken);
            localStorage.setItem("cognito_id_token", idToken);
            localStorage.setItem("cognito_refresh_token", refreshToken);

            resolve({
              data: {
                user: { email },
              },
            });
          },
          onFailure: (err) => {
            console.error("Cognito authentication error:", err);
            resolve({
              error: err.message || "Authentication failed",
            });
          },
        });
      });
    } catch (error: any) {
      return {
        error: error.message || "Login failed",
      };
    }
  },

  logout: () => {
    try {
      const config = loadCognitoConfig();
      const userPool = new CognitoUserPool({
        UserPoolId: config.userPoolId,
        ClientId: config.clientId,
      });

      const cognitoUser = userPool.getCurrentUser();
      if (cognitoUser) {
        cognitoUser.signOut();
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      removeAuthToken();
    }
  },

  isAuthenticated: (): boolean => {
    return !!getAuthToken();
  },

  getCurrentUser: async (): Promise<{ email: string } | null> => {
    try {
      const config = loadCognitoConfig();
      const userPool = new CognitoUserPool({
        UserPoolId: config.userPoolId,
        ClientId: config.clientId,
      });

      const cognitoUser = userPool.getCurrentUser();
      if (!cognitoUser) {
        return null;
      }

      return new Promise((resolve) => {
        cognitoUser.getSession((err: any, session: any) => {
          if (err || !session || !session.isValid()) {
            removeAuthToken();
            resolve(null);
            return;
          }

          cognitoUser.getUserAttributes((err: any, attributes: any) => {
            if (err) {
              resolve(null);
              return;
            }

            const emailAttr = attributes?.find((attr: any) => attr.Name === "email");
            resolve({
              email: emailAttr?.Value || "",
            });
          });
        });
      });
    } catch (error) {
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

  create: async (blog: Partial<BlogPost> & { content: string }): Promise<ApiResponse<BlogPost>> => {
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
    return apiRequest<{ uploadUrl: string; media: MediaAsset }>("/api/admin/media", {
      method: "POST",
      body: JSON.stringify({ filename, type, size }),
    });
  },

  delete: async (id: string): Promise<ApiResponse<{ message: string }>> => {
    return apiRequest<{ message: string }>(`/api/admin/media/${id}`, {
      method: "DELETE",
    });
  },
};

// Explicit type exports for Vite compatibility
export type { BlogPost, MediaAsset };

