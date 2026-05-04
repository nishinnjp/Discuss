import { auth } from "@/auth";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ provider: string }> }
) {
    const { provider } = await params;
    const callbackURL = request.nextUrl.searchParams.get("callbackURL") ?? "/";

    const response = await auth.api.signInSocial({
        body: {
            provider: provider as "github",
            callbackURL,
        },
        headers: await headers(),
        asResponse: true,
    });

    const { url } = await response.json();
    const redirect = NextResponse.redirect(url);

    // Forward the state cookie Better Auth set on its response
    response.headers.getSetCookie().forEach((cookie) => {
        redirect.headers.append("Set-Cookie", cookie);
    });

    return redirect;
}
