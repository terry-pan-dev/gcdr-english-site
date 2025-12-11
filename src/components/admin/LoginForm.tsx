import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { AlertCircle } from "lucide-react";
import { authApi, getAuthToken } from "../../lib/admin-api";
import {
  ensureAmplifyConfigured,
  configureAmplifyAsync,
} from "../../lib/amplify-config";
import { shouldShowDebugLogs } from "../../lib/env";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    // Check authentication only once on mount
    const checkAuth = async () => {
      // #region agent log
      fetch(
        "http://127.0.0.1:7242/ingest/aeca9443-8952-4b89-b876-38015799b0cb",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            location: "LoginForm.tsx:21",
            message: "checkAuth started",
            data: {
              checkingAuth,
              hasWindowGlobals:
                typeof window !== "undefined" &&
                !!(window as any).__COGNITO_USER_POOL_ID__,
            },
            timestamp: Date.now(),
            sessionId: "debug-session",
            hypothesisId: "C,D",
          }),
        }
      ).catch(() => {});
      // #endregion
      try {
        // Check for loop detection - if we just redirected here, don't redirect again
        const lastRedirectTime = sessionStorage.getItem(
          "__last_redirect_time__"
        );
        const now = Date.now();
        if (lastRedirectTime) {
          const timeSinceRedirect = now - parseInt(lastRedirectTime, 10);
          // If redirected within last 2 seconds, we might be in a loop
          if (timeSinceRedirect < 2000) {
            console.warn(
              "LoginForm: Potential redirect loop detected, showing login form"
            );
            sessionStorage.setItem("__auth_loop_detected__", "true");
            sessionStorage.removeItem("__last_redirect_time__");
            setCheckingAuth(false);
            return;
          }
        }

        // Ensure Amplify is configured - try sync first, then async if needed
        let configured = ensureAmplifyConfigured();
        // #region agent log
        fetch(
          "http://127.0.0.1:7242/ingest/aeca9443-8952-4b89-b876-38015799b0cb",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              location: "LoginForm.tsx:43",
              message: "ensureAmplifyConfigured result",
              data: { configured },
              timestamp: Date.now(),
              sessionId: "debug-session",
              hypothesisId: "C",
            }),
          }
        ).catch(() => {});
        // #endregion
        if (!configured) {
          if (shouldShowDebugLogs()) {
            console.log("LoginForm: Sync config failed, trying async...");
          }
          configured = await configureAmplifyAsync();

          if (!configured) {
            if (shouldShowDebugLogs()) {
              console.error("LoginForm: Amplify configuration failed");
            }
            setCheckingAuth(false);
            return;
          }
        }

        // Check if user is authenticated
        // #region agent log
        fetch(
          "http://127.0.0.1:7242/ingest/aeca9443-8952-4b89-b876-38015799b0cb",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              location: "LoginForm.tsx:59",
              message: "calling isAuthenticated",
              data: {},
              timestamp: Date.now(),
              sessionId: "debug-session",
              hypothesisId: "D",
            }),
          }
        ).catch(() => {});
        // #endregion
        const isAuth = await authApi.isAuthenticated();
        // #region agent log
        fetch(
          "http://127.0.0.1:7242/ingest/aeca9443-8952-4b89-b876-38015799b0cb",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              location: "LoginForm.tsx:63",
              message: "isAuthenticated returned",
              data: { isAuth },
              timestamp: Date.now(),
              sessionId: "debug-session",
              hypothesisId: "D",
            }),
          }
        ).catch(() => {});
        // #endregion
        if (!isAuth) {
          setCheckingAuth(false);
          return;
        }

        // Verify token is still valid by getting current user
        const user = await authApi.getCurrentUser();
        if (user) {
          // User is authenticated - redirect to dashboard or originally requested page
          // Clear any loop detection flags first
          sessionStorage.removeItem("__auth_loop_detected__");
          const redirectTo =
            (window as any).__REDIRECT_TO__ || "/admin/dashboard";
          if (shouldShowDebugLogs()) {
            console.log(
              "LoginForm: User authenticated, redirecting to:",
              redirectTo
            );
          }
          window.location.href = redirectTo;
        } else {
          // User not authenticated - allow login
          setCheckingAuth(false);
        }
      } catch (err) {
        // Error checking auth - allow login form to be shown
        // #region agent log
        fetch(
          "http://127.0.0.1:7242/ingest/aeca9443-8952-4b89-b876-38015799b0cb",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              location: "LoginForm.tsx:85",
              message: "checkAuth caught error",
              data: { error: String(err) },
              timestamp: Date.now(),
              sessionId: "debug-session",
              hypothesisId: "D,E",
            }),
          }
        ).catch(() => {});
        // #endregion
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
      // Ensure Amplify is configured before login - try sync first, then async if needed
      let configured = ensureAmplifyConfigured();
      if (!configured) {
        console.log(
          "LoginForm: Sync config failed during login, trying async..."
        );
        configured = await configureAmplifyAsync();
      }

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

        // Clear any loop detection flags on successful login
        sessionStorage.removeItem("__auth_loop_detected__");

        // Wait longer for Amplify to fully store the session and for cookie to be set
        // Increased delay to ensure everything is ready before redirect
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Verify the session is established before redirecting
        const user = await authApi.getCurrentUser();
        if (user) {
          // Explicitly set the authentication cookie before redirecting
          // This ensures server-side middleware can read it
          const token = await getAuthToken();
          if (!token && shouldShowDebugLogs()) {
            console.warn("LoginForm: Could not get auth token for cookie");
            // Still proceed - Amplify might have it stored even if we can't get it here
          }

          // Wait a bit more to ensure cookie is persisted
          await new Promise((resolve) => setTimeout(resolve, 300));

          // Check for loop before redirecting
          const loopDetected = sessionStorage.getItem("__auth_loop_detected__");
          if (loopDetected === "true") {
            if (shouldShowDebugLogs()) {
              console.error("LoginForm: Loop detected, aborting redirect");
            }
            setError("Authentication loop detected. Please refresh the page.");
            sessionStorage.removeItem("__auth_loop_detected__");
            return;
          }

          // Record redirect time for loop detection
          sessionStorage.setItem(
            "__last_redirect_time__",
            Date.now().toString()
          );

          const redirectTo =
            (window as any).__REDIRECT_TO__ || "/admin/dashboard";
          window.location.href = redirectTo;
        } else {
          if (shouldShowDebugLogs()) {
            console.error(
              "LoginForm: Login succeeded but session not established"
            );
          }
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
