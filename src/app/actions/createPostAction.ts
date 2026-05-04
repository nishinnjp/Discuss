"use server";

import { z } from "zod";
import { headers } from "next/headers";
import { prisma } from "@/components/prisma";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import type { Post, Topic } from "@/generated/prisma/client";
import { sleep } from "@/components/utils";


const createPostSchema = z.object({
    title: z.string().min(3).max(50),
    content: z.string().min(10).max(500),
});

export type CreatePostState = {
    errors?: Record<string, string[]>;
    success?: boolean;
} | null;

export async function createPostAction(
    topicName: string,
    _prevState: CreatePostState,
    formData: FormData
): Promise<CreatePostState> {
    await sleep(1000);
    const result = createPostSchema.safeParse({
        title: formData.get("title"),
        content: formData.get("content"),
    });

    if (!result.success) {
        return { errors: result.error.flatten().fieldErrors };
    }

    const session = await auth.api.getSession({ headers: await headers() });
    if (!session || !session.user) {
        return { errors: { global: ["Unauthorized, please login to continue!"] } };
    }

    const topic = await prisma.topic.findFirst({
        where: {
            name: topicName,
        },
    });

    if (!topic) {
        return { errors: { global: ["Topic not found, please try again."] } };
    }

    let post: Post;
    try {
        post = await prisma.post.create({
            data: {
                title: result.data.title,
                content: result.data.content,
                userId: session.user.id,
                topicId: topic.id,
            },
        });
    } catch (err) {
        return { errors: { global: ["Failed to create topic, please try again."] } };
    }

    redirect(`/topics/${encodeURIComponent(topic.name)}/posts/${encodeURIComponent(post.id)}`);
}
