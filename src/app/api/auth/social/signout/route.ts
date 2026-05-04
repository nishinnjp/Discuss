import { auth } from "@/auth";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const callbackURL = request.nextUrl.searchParams.get("callbackURL") ?? "/";

    await auth.api.signOut({
        headers: await headers(),
        asResponse: true,
    });

    return NextResponse.redirect(new URL(callbackURL, request.url));
}
