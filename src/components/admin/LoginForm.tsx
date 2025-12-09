import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { authApi, getAuthToken } from "../../lib/admin-api";
import { ensureAmplifyConfigured } from "../../lib/amplify-config";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    // Check authentication only once on mount
    const checkAuth = async () => {
      try {
        // Debug: Log window globals
        console.log("LoginForm: Window globals available:", {
          userPoolId: !!(window as any).__COGNITO_USER_POOL_ID__,
          clientId: !!(window as any).__COGNITO_USER_POOL_CLIENT_ID__,
          identityPoolId: !!(window as any).__COGNITO_IDENTITY_POOL_ID__,
          region: !!(window as any).__AWS_REGION__,
        });

        // Ensure Amplify is configured
        const configured = ensureAmplifyConfigured();
        if (!configured) {
          console.error("LoginForm: Amplify configuration failed");
          setCheckingAuth(false);
          return;
        }

        // Check if user is authenticated
        const isAuth = await authApi.isAuthenticated();
        if (!isAuth) {
          setCheckingAuth(false);
          return;
        }

        // Verify token is still valid by getting current user
        const user = await authApi.getCurrentUser();
        if (user) {
          // User is authenticated - redirect to dashboard or originally requested page
          const redirectTo =
            (window as any).__REDIRECT_TO__ || "/admin/dashboard";
          window.location.href = redirectTo;
        } else {
          // User not authenticated - allow login
          setCheckingAuth(false);
        }
      } catch (err) {
        // Error checking auth - allow login form to be shown
        console.error("Auth check error:", err);
        setCheckingAuth(false);
      }
    };

    checkAuth();
  }, []); // Empty dependency array - only run once on mount

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Ensure Amplify is configured before login
      const configured = ensureAmplifyConfigured();
      if (!configured) {
        setError(
          "Authentication system not configured. Please refresh the page."
        );
        setLoading(false);
        return;
      }

      const result = await authApi.login(email, password);
      if (result.error) {
        setError(result.error);
      } else {
        console.log("LoginForm: Login successful, verifying session...");

        // Wait a moment for Amplify to fully store the session
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Verify the session is established before redirecting
        const user = await authApi.getCurrentUser();
        if (user) {
          console.log("LoginForm: Session verified, setting auth cookie...");

          // Explicitly set the authentication cookie before redirecting
          // This ensures server-side middleware can read it
          const token = await getAuthToken();
          if (!token) {
            console.warn("LoginForm: Could not get auth token for cookie");
          } else {
            console.log("LoginForm: Auth cookie set successfully");
          }

          console.log("LoginForm: Redirecting to dashboard...");
          const redirectTo =
            (window as any).__REDIRECT_TO__ || "/admin/dashboard";
          window.location.href = redirectTo;
        } else {
          console.error(
            "LoginForm: Login succeeded but session not established"
          );
          setError(
            "Login succeeded but session not established. Please try again."
          );
        }
      }
    } catch (err: any) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  // Show loading state while checking authentication
  if (checkingAuth) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "#EBE9CF" }}
      >
        <div className="text-muted-foreground">Checking authentication...</div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: "#EBE9CF" }}
    >
      <div
        className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg"
        style={{ borderColor: "#c9a050", borderWidth: "2px" }}
      >
        <h1
          className="text-3xl font-bold mb-6 text-center"
          style={{ color: "#1c1917" }}
        >
          Admin Login
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium mb-2"
              style={{ color: "#1c1917" }}
            >
              Email
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-2"
              style={{ color: "#1c1917" }}
            >
              Password
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
          </div>
          {error && <div className="text-red-600 text-sm">{error}</div>}
          <Button
            type="submit"
            disabled={loading}
            className="w-full"
            style={{ backgroundColor: "#c9a050", color: "#1c1917" }}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>
      </div>
    </div>
  );
}
