import { auth } from "@/auth";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { headers } from "next/headers";

export default async function UserInfo() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user.image) {
    return null;
  }

  return (
    <div>
      <Avatar>
        <AvatarImage src={session.user.image} />
        <AvatarFallback>{session.user.name?.charAt(0)}</AvatarFallback>
      </Avatar>
    </div>
  );
}
