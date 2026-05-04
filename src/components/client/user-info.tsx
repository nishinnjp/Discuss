"use client";

import { useSession } from "@/lib/auth-client";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useEffect, useState } from "react";

export default function UserInfo() {
  const { data: session } = useSession();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  if (!mounted || !session?.user.image) {
    return null;
  }

  return (
    <div className="flex flex-row justify-center items-center gap-2">
      <Avatar>
        <AvatarImage src={session.user.image} />
        <AvatarFallback>{session.user.name?.charAt(0)}</AvatarFallback>
      </Avatar>
    </div>
  );
}
