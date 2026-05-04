import { prisma } from "@/components/prisma";
import { notFound } from "next/navigation";

interface PostShowProps {
    postId: string;
}

export default async function PostShow({ postId }: PostShowProps) {
    const post = await prisma.post.findUnique({
        where: { id: postId },
        include: { user: true, topic: true },
    });

    if (!post) {
        notFound();
    }

    return (
        <div>
            <h1 className="text-2xl font-bold mb-2">{post.title}</h1>
            <p className="whitespace-pre-wrap border border-border rounded-lg p-4 shadow-sm bg-muted">{post.content}</p>
        </div>
    );
}