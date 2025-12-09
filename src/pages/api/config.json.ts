import type { APIRoute } from "astro";
import { Resource } from "sst";

export const prerender = false; // Explicitly disable prerendering

export const GET: APIRoute = async () => {
  try {
    // Get API base URL from SST resource
    const baseUrl = (Resource.AdminAPI as any)?.url || import.meta.env.PUBLIC_API_BASE_URL || "";

    return new Response(JSON.stringify({ baseUrl }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (error: any) {
    console.error("Error getting API config:", error);
    return new Response(
      JSON.stringify({ error: "Failed to get API configuration" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
};

