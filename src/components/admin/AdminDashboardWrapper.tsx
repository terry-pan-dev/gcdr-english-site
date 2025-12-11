import { useEffect, useState } from "react";
import { authApi } from "../../lib/admin-api";
import {
  ensureAmplifyConfigured,
  configureAmplifyAsync,
} from "../../lib/amplify-config";
import { DashboardLayout } from "./DashboardLayout";
import { shouldShowDebugLogs } from "../../lib/env";

/**
 * Combined wrapper for admin dashboard that handles authentication and renders the dashboard.
 * This component solves the hydration issue where passing children with client:only="react"
 * causes the children to not be properly hydrated as interactive React components.
 *
 * IMPORTANT: This component trusts server-side middleware as the authoritative auth check.
 * If the page loaded without a server redirect, the user IS authenticated. Client-side
 * checks are for UX enhancement only, not security.
 */
export function AdminDashboardWrapper() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // #region agent log
    fetch("http://127.0.0.1:7242/ingest/aeca9443-8952-4b89-b876-38015799b0cb", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        location: "AdminDashboardWrapper.tsx:23",
        message: "useEffect triggered",
        data: { isChecking, isAuthenticated },
        timestamp: Date.now(),
        sessionId: "debug-session",
        hypothesisId: "A",
      }),
    }).catch(() => {});
    // #endregion
    const checkAuth = async () => {
      // #region agent log
      fetch(
        "http://127.0.0.1:7242/ingest/aeca9443-8952-4b89-b876-38015799b0cb",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            location: "AdminDashboardWrapper.tsx:27",
            message: "checkAuth started",
            data: { isChecking },
            timestamp: Date.now(),
            sessionId: "debug-session",
            hypothesisId: "A",
          }),
        }
      ).catch(() => {});
      // #endregion
      try {
        // Check for loop detection flag
        const loopDetected = sessionStorage.getItem("__auth_loop_detected__");
        if (loopDetected === "true") {
          if (shouldShowDebugLogs()) {
            console.warn(
              "AdminDashboardWrapper: Auth loop detected, trusting server auth"
            );
          }
          // Clear the flag and trust server middleware
          sessionStorage.removeItem("__auth_loop_detected__");
          setIsAuthenticated(true);
          setIsChecking(false);
          return;
        }

        // Small delay to ensure Amplify storage is ready after page load
        await new Promise((resolve) => setTimeout(resolve, 100));

        // Ensure Amplify is configured - try sync first, then async if needed
        let configured = ensureAmplifyConfigured();
        // #region agent log
        fetch(
          "http://127.0.0.1:7242/ingest/aeca9443-8952-4b89-b876-38015799b0cb",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              location: "AdminDashboardWrapper.tsx:50",
              message: "ensureAmplifyConfigured result",
              data: {
                configured,
                hasWindowGlobals:
                  typeof window !== "undefined" &&
                  !!(window as any).__COGNITO_USER_POOL_ID__,
              },
              timestamp: Date.now(),
              sessionId: "debug-session",
              hypothesisId: "C",
            }),
          }
        ).catch(() => {});
        // #endregion
        if (!configured) {
          if (shouldShowDebugLogs()) {
            console.log(
              "AdminDashboardWrapper: Sync config failed, trying async..."
            );
          }
          configured = await configureAmplifyAsync();
        }

        if (!configured) {
          if (shouldShowDebugLogs()) {
            console.warn(
              "AdminDashboardWrapper: Amplify configuration failed, but trusting server middleware"
            );
          }
          // Server middleware already validated - trust it
          setIsAuthenticated(true);
          setIsChecking(false);
          return;
        }

        // Try to get the current user (non-blocking check)
        // #region agent log
        fetch(
          "http://127.0.0.1:7242/ingest/aeca9443-8952-4b89-b876-38015799b0cb",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              location: "AdminDashboardWrapper.tsx:67",
              message: "calling getCurrentUser",
              data: {},
              timestamp: Date.now(),
              sessionId: "debug-session",
              hypothesisId: "D",
            }),
          }
        ).catch(() => {});
        // #endregion
        const user = await authApi.getCurrentUser();
        // #region agent log
        fetch(
          "http://127.0.0.1:7242/ingest/aeca9443-8952-4b89-b876-38015799b0cb",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              location: "AdminDashboardWrapper.tsx:71",
              message: "getCurrentUser returned",
              data: { hasUser: !!user },
              timestamp: Date.now(),
              sessionId: "debug-session",
              hypothesisId: "D",
            }),
          }
        ).catch(() => {});
        // #endregion

        // Always set authenticated to true if we got here (server let the page load)
        setIsAuthenticated(true);
        setIsChecking(false);
      } catch (error: any) {
        if (shouldShowDebugLogs()) {
          console.error(
            "AdminDashboardWrapper: Authentication check error:",
            error
          );
        }
        // Even on error, trust server middleware - if page loaded, user is authenticated
        setIsAuthenticated(true);
        setIsChecking(false);
      }
    };

    // Set a maximum timeout - if Amplify is slow, show dashboard anyway
    const timeoutId = setTimeout(() => {
      if (isChecking) {
        if (shouldShowDebugLogs()) {
          console.warn(
            "AdminDashboardWrapper: Auth check timeout - trusting server middleware"
          );
        }
        setIsAuthenticated(true);
        setIsChecking(false);
      }
    }, 3000); // 3 second max wait

    checkAuth();

    return () => clearTimeout(timeoutId);
  }, []); // Fixed: Removed isChecking from dependencies to prevent infinite loop

  // Show loading state while checking authentication
  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-muted-foreground">Checking authentication...</div>
      </div>
    );
  }

  // Always render dashboard if we got here - server middleware already validated
  // The client check is just for UX, not security
  return <DashboardLayout />;
}
