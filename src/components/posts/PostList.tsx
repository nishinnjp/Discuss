"use client";

import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ListBoxWrapper } from "@/components/ui/list-box-wrapper";

interface Post {
    id: string;
    title: string;
    user: { name: string; image: string | null };
    _count: { comments: number };
}

interface PostListProps {
    topicName: string;
    posts: Post[];
}

export default function PostList({ topicName, posts }: PostListProps) {
    const router = useRouter();

    if (posts.length === 0) return null;

    return (
        <ListBoxWrapper>
            <div className="overflow-y-auto max-h-44 p-3 flex flex-col gap-2">
                {posts.map((post) => (
                    <div
                        key={post.id}
                        onClick={() =>
                            router.push(
                                `/topics/${encodeURIComponent(topicName)}/posts/${encodeURIComponent(post.id)}`
                            )
                        }
                        className="flex items-center justify-between gap-2 cursor-pointer rounded hover:bg-muted px-1"
                    >
                        <div className="flex items-center gap-2 min-w-0">
                            <div className="flex flex-col truncate">
                                <span className="text-sm font-medium truncate">{post.title}</span>
                                <div className="flex items-center gap-1">
                                    <Avatar size="sm">
                                        <AvatarImage src={post.user.image ?? undefined} alt={post.user.name} />
                                        <AvatarFallback>{post.user.name.charAt(0).toUpperCase()}</AvatarFallback>
                                    </Avatar>
                                    <span className="text-xs text-muted-foreground">By {post.user.name}</span>
                                </div>
                            </div>
                        </div>
                        <Badge variant="secondary" className="shrink-0">
                            {post._count.comments}
                        </Badge>
                    </div>
                ))}
            </div>
        </ListBoxWrapper>
    );
}
