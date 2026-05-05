"use server";

import { z } from "zod";
import { headers } from "next/headers";
import { prisma } from "@/components/prisma";
import { auth } from "@/lib/auth";
import { sleep } from "@/components/utils";
import { refresh, updateTag } from "next/cache";


const createCommentSchema = z.object({
    content: z.string().min(3).max(500),
});

export type CreateCommentState = {
    errors?: Record<string, string[]>;
    success?: boolean;
} | null;

export async function createCommentAction(
    {topicName, postId, parentId}: {topicName: string, postId: string, parentId: string | null},
    _prevState: CreateCommentState,
    formData: FormData
): Promise<CreateCommentState> {
    await sleep(1000);
    const result = createCommentSchema.safeParse({
        content: formData.get("content"),
    });

    if (!result.success) {
        return { errors: result.error.flatten().fieldErrors };
    }

    const session = await auth.api.getSession({ headers: await headers() });
    if (!session || !session.user) {
        return { errors: { global: ["Unauthorized, please login to continue!"] } };
    }

    try {
        await prisma.comment.create({
            data: {
                content: result.data.content,
                userId: session.user.id,
                postId: postId,
                parentId: parentId,
            },
        });
    } catch (err) {
        return { errors: { global: ["Failed to create comment, please try again."] } };
    }

    // Server Action: updateTag invalidates `cacheTag` from `selectCommentsByPostId` immediately.
    // revalidateTag(tag, "max") can leave client/server caches stale per Next 16 cache-life rules.
    updateTag(`comments-${postId}`);
    refresh();

    return { success: true };
}
