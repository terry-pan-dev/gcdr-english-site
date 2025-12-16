"use client";

import { useEffect } from "react";
import { authApi } from "../../lib/admin-api";

export function AdminRedirect() {
  useEffect(() => {
    // Check authentication client-side
    if (!authApi.isAuthenticated()) {
      window.location.href = "/admin/login";
    } else {
      window.location.href = "/admin/dashboard";
    }
  }, []);

  return <div>Redirecting...</div>;
}
