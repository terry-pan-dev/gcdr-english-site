import { useEffect, useState } from "react";
import { authApi } from "../../lib/admin-api";
import {
  ensureAmplifyConfigured,
  configureAmplifyAsync,
} from "../../lib/amplify-config";

/**
 * Client-side wrapper for admin pages that ensures CSS is loaded and authentication is verified
 * This component dynamically finds and loads CSS files from the _astro directory
 * by inspecting script tags to find matching CSS files with the same hash
 * It also protects the page by checking authentication before rendering children
 */
export function AdminPageWrapper({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // #region agent log
    fetch("http://127.0.0.1:7242/ingest/aeca9443-8952-4b89-b876-38015799b0cb", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        location: "AdminPageWrapper.tsx:15",
        message: "useEffect triggered",
        data: { isChecking, isAuthenticated },
        timestamp: Date.now(),
        sessionId: "debug-session",
        hypothesisId: "A",
      }),
    }).catch(() => {});
    // #endregion
    // Check authentication for client-side verification
    // Note: Server-side middleware already protects this route, so if the page loaded,
    // the cookie exists and auth was verified. This check is mainly for UX.
    const checkAuth = async () => {
      // #region agent log
      fetch(
        "http://127.0.0.1:7242/ingest/aeca9443-8952-4b89-b876-38015799b0cb",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            location: "AdminPageWrapper.tsx:21",
            message: "checkAuth started",
            data: {},
            timestamp: Date.now(),
            sessionId: "debug-session",
            hypothesisId: "A",
          }),
        }
      ).catch(() => {});
      // #endregion
      try {
        console.log("AdminPageWrapper: Starting authentication check...");

        // Small delay to ensure Amplify storage is ready after page load
        await new Promise((resolve) => setTimeout(resolve, 100));

        // Ensure Amplify is configured - try sync first, then async if needed
        let configured = ensureAmplifyConfigured();
        if (!configured) {
          console.log("AdminPageWrapper: Sync config failed, trying async...");
          configured = await configureAmplifyAsync();
        }

        if (!configured) {
          console.warn(
            "AdminPageWrapper: Amplify configuration failed, but trusting server middleware"
          );
          // Server middleware already validated - trust it
          setIsAuthenticated(true);
          setIsChecking(false);
          return;
        }

        // Try to get the current user directly (this is more reliable than isAuthenticated)
        console.log("AdminPageWrapper: Getting current user...");
        const user = await authApi.getCurrentUser();
        console.log(
          "AdminPageWrapper: getCurrentUser result:",
          user ? `success (${user.email})` : "no user"
        );

        // If user found, great. If not, still trust server middleware.
        // Server middleware already validated the cookie, so user IS authenticated.
        if (user) {
          console.log("AdminPageWrapper: Client-side auth check successful");
        } else {
          console.warn(
            "AdminPageWrapper: Client-side check failed, but server middleware validated - trusting server"
          );
        }

        // Always set authenticated to true if we got here (server let the page load)
        setIsAuthenticated(true);
        setIsChecking(false);
      } catch (error: any) {
        // #region agent log
        fetch(
          "http://127.0.0.1:7242/ingest/aeca9443-8952-4b89-b876-38015799b0cb",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              location: "AdminPageWrapper.tsx:60",
              message: "checkAuth caught error",
              data: { error: String(error) },
              timestamp: Date.now(),
              sessionId: "debug-session",
              hypothesisId: "D,E",
            }),
          }
        ).catch(() => {});
        // #endregion
        console.error("AdminPageWrapper: Authentication check error:", error);
        // Don't redirect on error - server middleware handles protection
        // Just mark as not authenticated
        setIsAuthenticated(false);
        setIsChecking(false);
      }
    };

    checkAuth();
  }, []);

  useEffect(() => {
    const injectCSS = () => {
      // Find base path from existing script tags or current URL
      let basePath = window.location.origin;
      const scripts = Array.from(
        document.querySelectorAll('script[src*="_astro"]')
      );
      if (scripts.length > 0) {
        basePath = scripts[0].src.split("/_astro/")[0];
      }

      // Get all existing CSS links to avoid duplicates
      const existingLinks = Array.from(
        document.querySelectorAll('link[rel="stylesheet"]')
      );
      const loadedHrefs = new Set(
        existingLinks.map((link) => (link as HTMLLinkElement).href)
      );

      // Find all script tags to extract CSS file patterns
      const scriptTags = Array.from(
        document.querySelectorAll('script[src*="_astro"]')
      );
      const cssFilesToLoad = new Set<string>();

      // Look for dashboard CSS file - it's named "dashboard.{hash}.css"
      // We need to find it by looking for any CSS link or trying common patterns
      // First, check if there's already a dashboard CSS link
      const hasDashboardCSS = Array.from(existingLinks).some((link) => {
        const href = (link as HTMLLinkElement).href;
        return href.includes("dashboard") && href.includes("_astro");
      });

      if (!hasDashboardCSS) {
        // Try to find dashboard CSS by checking all script tags
        // The CSS file is named "dashboard.{hash}.css" where hash might match a script hash
        // or we can try to fetch it by making a request to find the right hash
        scriptTags.forEach((script) => {
          const src = (script as HTMLScriptElement).src;
          // Extract hash from any script to try as dashboard CSS hash
          const hashMatch = src.match(/\.([A-Za-z0-9]+)\.js/);
          if (hashMatch) {
            const hash = hashMatch[1];
            // Try this hash for dashboard CSS
            cssFilesToLoad.add(`${basePath}/_astro/dashboard.${hash}.css`);
          }
        });

        // Also try to find dashboard CSS by looking for scripts that load dashboard components
        // The actual CSS file might have a different hash, so we try multiple approaches
        const dashboardScript = scriptTags.find((script) => {
          const src = (script as HTMLScriptElement).src;
          return src.includes("DashboardLayout") || src.includes("dashboard");
        });

        if (dashboardScript) {
          // Try the hash from the dashboard script
          const src = (dashboardScript as HTMLScriptElement).src;
          const hashMatch = src.match(/\.([A-Za-z0-9]+)\.js/);
          if (hashMatch) {
            const hash = hashMatch[1];
            cssFilesToLoad.add(`${basePath}/_astro/dashboard.${hash}.css`);
          }
        }
      }

      // Load all identified CSS files
      cssFilesToLoad.forEach((cssHref) => {
        if (!loadedHrefs.has(cssHref)) {
          const link = document.createElement("link");
          link.rel = "stylesheet";
          link.href = cssHref;
          link.onload = () => {
            console.log("Admin CSS loaded:", link.href);
          };
          link.onerror = () => {
            // Silently remove on error - file might not exist
            link.remove();
          };
          document.head.appendChild(link);
          loadedHrefs.add(cssHref);
        }
      });

      // Ensure we have at least the globals CSS loaded
      // Check if there's a link to globals or index CSS
      const hasGlobalCSS = Array.from(existingLinks).some((link) => {
        const href = (link as HTMLLinkElement).href;
        return (
          href.includes("globals") ||
          href.includes("index") ||
          href.includes("_astro")
        );
      });

      if (!hasGlobalCSS) {
        // Try to load a global CSS file - look for index CSS
        const globalCssHref = `${basePath}/_astro/index.css`;
        if (!loadedHrefs.has(globalCssHref)) {
          const link = document.createElement("link");
          link.rel = "stylesheet";
          link.href = globalCssHref;
          link.onerror = () => link.remove();
          document.head.appendChild(link);
        }
      }
    };

    // Inject CSS immediately
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", injectCSS);
    } else {
      injectCSS();
    }

    // Also try after a short delay as fallback
    const timeout = setTimeout(injectCSS, 100);

    return () => clearTimeout(timeout);
  }, []);

  // Don't render children until authentication is verified
  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-muted-foreground">Checking authentication...</div>
      </div>
    );
  }

  if (!isAuthenticated && !isChecking) {
    // If auth check failed, server middleware will handle redirect
    // Show a message but don't redirect client-side to avoid conflicts
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-muted-foreground">
          Authentication verification failed. Redirecting...
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
