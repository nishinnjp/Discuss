import { Button } from "@/components/ui/button";

export default function SignOutButton() {
    return (
        <form action="/api/auth/social/signout" method="get">
            <Button type="submit">Sign Out</Button>
        </form>
    );
}