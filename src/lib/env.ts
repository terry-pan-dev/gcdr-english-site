/**
 * Environment detection utilities
 *
 * Custom logic: Only production stage deployments hide debug logs.
 * All other cases (local dev, staging, etc.) show logs.
 */

/**
 * Returns true if we should show debug/development logs
 *
 * Logic:
 * - Local development: Always show logs
 * - Staging/dev deployments: Show logs
 * - Production deployment (--stage production): Hide logs
 */
export const shouldShowDebugLogs = (): boolean => {
  // Check custom flag set by SST based on deployment stage
  // Only production stage sets PUBLIC_IS_PRODUCTION to "true"
  const isProduction = import.meta.env.PUBLIC_IS_PRODUCTION === "true";

  // Show logs unless it's a production deployment
  return !isProduction;
};
