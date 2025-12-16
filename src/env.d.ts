/// <reference types="astro/client" />

// Type definitions for Astro context.locals
declare namespace App {
  interface Locals {
    user?: {
      email: string;
      sub: string;
    };
    authenticated?: boolean;
  }
}
