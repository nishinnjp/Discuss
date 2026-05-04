"use client";

import { signOut } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";

export default function SignOutButton() {
    return (
        <Button onClick={() => signOut()}>
            Sign Out
        </Button>
    );
}