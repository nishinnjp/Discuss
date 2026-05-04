"use client";

import { signIn } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";

export default function SignInButton() {
    return (
        <Button variant="default" onClick={() => signIn.social({ provider: "github", callbackURL: "/" })}>
            Sign in with GitHub
        </Button>
    );
}