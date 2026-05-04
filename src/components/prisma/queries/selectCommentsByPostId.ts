import { prisma } from "../index";
import { CommentWithUser } from "@/app/types/CommentWithUser";
import { cacheTag } from "next/cache";

export default async function selectCommentsByPostId(postId: string): Promise<CommentWithUser[]> {
    "use cache";
    cacheTag(`comments-${postId}`);

    const comments = await prisma.comment.findMany({
        where: { postId: postId },
        include: {
            user: { select: { name: true, image: true } },
        },
    }).catch(() => []);

    return comments;
}
