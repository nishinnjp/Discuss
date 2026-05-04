import { Button } from "@/components/ui/button";

export default function SignInButton() {
    return (
        <form action="/api/auth/social/github" method="get">
            <Button type="submit">Sign in with GitHub</Button>
        </form>
    );
}