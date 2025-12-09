import { useEffect, useState } from "react";
import { authApi } from "../../lib/admin-api";
import { ensureAmplifyConfigured } from "../../lib/amplify-config";
import { DashboardLayout } from "./DashboardLayout";

/**
 * Combined wrapper for admin dashboard that handles authentication and renders the dashboard.
 * This component solves the hydration issue where passing children with client:only="react"
 * causes the children to not be properly hydrated as interactive React components.
 */
export function AdminDashboardWrapper() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        console.log("AdminDashboardWrapper: Starting authentication check...");

        // Small delay to ensure Amplify storage is ready after page load
        await new Promise((resolve) => setTimeout(resolve, 100));

        // Ensure Amplify is configured
        const configured = ensureAmplifyConfigured();
        if (!configured) {
          console.error("AdminDashboardWrapper: Amplify configuration failed");
          setIsAuthenticated(false);
          setIsChecking(false);
          return;
        }

        // Try to get the current user
        console.log("AdminDashboardWrapper: Getting current user...");
        const user = await authApi.getCurrentUser();
        console.log(
          "AdminDashboardWrapper: getCurrentUser result:",
          user ? `success (${user.email})` : "no user"
        );

        if (!user) {
          console.log(
            "AdminDashboardWrapper: No user found - redirecting to login"
          );
          window.location.href = "/admin/login";
          return;
        }

        console.log("AdminDashboardWrapper: Authentication successful");
        setIsAuthenticated(true);
        setIsChecking(false);
      } catch (error: any) {
        console.error("AdminDashboardWrapper: Authentication check error:", error);
        setIsAuthenticated(false);
        setIsChecking(false);
      }
    };

    checkAuth();
  }, []);

  // Show loading state while checking authentication
  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-muted-foreground">Checking authentication...</div>
      </div>
    );
  }

  // If not authenticated, show redirecting message
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-muted-foreground">
          Authentication required. Redirecting to login...
        </div>
      </div>
    );
  }

  // Render the dashboard directly - this ensures proper React hydration
  return <DashboardLayout />;
}

