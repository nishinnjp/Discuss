"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { signInAction } from "@/app/actions";
import { useSession, signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import { Spinner } from "./ui/spinner";

export function HeaderAuth() {
  const { data: session, isPending, error } = useSession();
  const router = useRouter();
  let authContent: React.ReactNode = null;

  if (error) {
    authContent = (
      <div className="text-sm text-red-500" title={error.message}>
        Session error
      </div>
    );
  } else if (isPending) {
    authContent = <Spinner />
  } else if (session?.user) {
    authContent = (
      <Popover>
        <PopoverTrigger>
          <Avatar>
            <AvatarImage src={session.user.image ?? undefined} />
            <AvatarFallback>{session.user.name?.charAt(0)}</AvatarFallback>
          </Avatar>
        </PopoverTrigger>
        <PopoverContent>
          <Button
            className="bg-blue-400 border-blue-400 w-full"
            onClick={() => signOut({ fetchOptions: { onSuccess: () => router.push("/") } })}
          >
            Logout
          </Button>
        </PopoverContent>
      </Popover>
    );
  } else {
    authContent = (
      <form action={signInAction}>
        <Button type="submit" className="bg-blue-400 border-blue-400">Login</Button>
      </form>
    );
  }

  return authContent;
}
