import { auth } from "@/auth";
import { NextRequest } from "next/server";

/**
 * Turn a browser GET into Better Auth's POST /sign-in/social so OAuth state
 * cookies are set on the same Response as the GitHub redirect (manual
 * auth.api + NextResponse.redirect often drops or splits cookies on Vercel).
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ provider: string }> },
) {
  const { provider } = await params;
  const callbackURL = request.nextUrl.searchParams.get("callbackURL") ?? "/";

  const target = new URL("/api/auth/sign-in/social", request.nextUrl.origin);
  const headers = new Headers(request.headers);
  headers.delete("content-length");
  headers.set("content-type", "application/json");
  // Browser GET → synthetic POST keeps Sec-Fetch-* / missing Origin; Better Auth's
  // CSRF middleware then forces origin validation and rejects. Normalize for server-proxied POST.
  headers.delete("sec-fetch-site");
  headers.delete("sec-fetch-mode");
  headers.delete("sec-fetch-dest");
  headers.set("origin", request.nextUrl.origin);
  if (!headers.get("referer")) {
    headers.set("referer", `${request.nextUrl.origin}/`);
  }

  const internal = new Request(target, {
    method: "POST",
    headers,
    body: JSON.stringify({
      provider,
      callbackURL,
    }),
  });

  return auth.handler(internal);
}
