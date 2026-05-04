import "dotenv/config";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { prisma } from "@/components/prisma";

/**
 * Vercel sets VERCEL_URL (no protocol) per deployment. Preview URLs must use
 * that host for baseURL or session/JWT handling can 500. Production can still
 * set BETTER_AUTH_URL to a custom domain (skipped for previews).
 */
function resolveAuthBaseURL(): string {
  if (process.env.VERCEL_ENV === "preview" && process.env.VERCEL_URL) {
    const v = process.env.VERCEL_URL.trim();
    return (v.startsWith("http") ? v : `https://${v}`).replace(/\/+$/, "");
  }
  const explicit = process.env.BETTER_AUTH_URL?.trim().replace(/\/+$/, "");
  if (explicit) return explicit;
  if (process.env.VERCEL_URL) {
    const v = process.env.VERCEL_URL.trim();
    return (v.startsWith("http") ? v : `https://${v}`).replace(/\/+$/, "");
  }
  return "http://localhost:3000";
}

const baseURL = resolveAuthBaseURL();

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  plugins: [nextCookies()],

  emailAndPassword: {
    enabled: true,
  },

  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },

  session: {
    strategy: "jwt",
    cookiePrefix: "discuss",
    expiresIn: 60 * 60 * 24 * 7, // 7 days
  },

  trustedOrigins: [
    baseURL,
    "http://localhost:3000",
    "https://*.vercel.app",
  ],

  secret: process.env.BETTER_AUTH_SECRET!,
  baseURL,
});
