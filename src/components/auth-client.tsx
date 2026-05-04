"use client";
import { createAuthClient } from "better-auth/react";
import { Button } from "@/components/ui/button";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
});

export const { signIn, signOut, signUp, useSession } = authClient;

export const signInWithGitHub = async () => {
  const data = await signIn.social({ provider: "github" });
  if (data.error) {
    throw new Error(data.error.message);
  }
  return data;
};

export default function AuthClient() {
  return (
    <div className="flex flex-row justify-center items-center gap-2">
      <Button onClick={() => signInWithGitHub()}>Sign in with GitHub</Button>
      <Button onClick={() => signOut()}>Sign out</Button>
    </div>
  );
}
