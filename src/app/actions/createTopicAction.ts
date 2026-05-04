"use server";

import { z } from "zod";
import { headers } from "next/headers";
import { prisma } from "@/components/prisma";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import type { Topic } from "@/generated/prisma/client";
import { sleep } from "@/components/utils";


const createTopicSchema = z.object({
    name: z.string().min(3).max(50),
    description: z.string().min(10).max(500),
});

export type CreateTopicState = {
    errors?: Record<string, string[]>;
    success?: boolean;
} | null;

export async function createTopicAction(
    _prevState: CreateTopicState,
    formData: FormData
): Promise<CreateTopicState> {
    await sleep(1000);
    const result = createTopicSchema.safeParse({
        name: formData.get("name"),
        description: formData.get("description"),
    });

    if (!result.success) {
        return { errors: result.error.flatten().fieldErrors };
    }

    const session = await auth.api.getSession({ headers: await headers() });
    if (!session || !session.user) {
        return { errors: { global: ["Unauthorized, please login to continue!"] } };
    }

    let topic: Topic;
    try {
        topic = await prisma.topic.create({
            data: {
                name: result.data.name,
                description: result.data.description,
                userId: session.user.id,
            },
        });
    } catch (err) {
        return { errors: { global: ["Failed to create topic, please try again."] } };
    }

    redirect(`/topics/${encodeURIComponent(topic.name)}`);
}
