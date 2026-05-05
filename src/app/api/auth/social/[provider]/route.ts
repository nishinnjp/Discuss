import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

function appendSetCookieHeaders(from: Headers, to: NextResponse) {
  const list = from.getSetCookie?.();
  if (list?.length) {
    for (const v of list) {
      to.headers.append("Set-Cookie", v);
    }
    return;
  }
  const legacy = from.get("set-cookie");
  if (legacy) {
    to.headers.append("Set-Cookie", legacy);
  }
}

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

  const response = await auth.handler(internal);

  // Better Auth answers with 200 + JSON { url, redirect: true } and a Location header.
  // Top-level browser navigation does not follow Location on 200 — show JSON instead.
  let location = response.headers.get("Location");
  if (!location && response.ok) {
    const ct = response.headers.get("content-type");
    if (ct?.includes("application/json")) {
      try {
        const data = (await response.clone().json()) as {
          url?: string;
          redirect?: boolean;
        };
        if (data.redirect && typeof data.url === "string") {
          location = data.url;
        }
      } catch {
        /* keep location null */
      }
    }
  }

  if (location) {
    const redirectRes = NextResponse.redirect(location);
    appendSetCookieHeaders(response.headers, redirectRes);
    return redirectRes;
  }

  return response;
}
