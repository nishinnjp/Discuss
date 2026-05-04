import { prisma } from "../index";

export default async function selectPostsByTopicName(topicName: string) {
    const posts = await prisma.post.findMany({
        where: { topic: { name: topicName } },
        include: {
            user: { select: { name: true, image: true } },
            _count: {
                select: { comments: true },
            },
        },
        orderBy: { createdAt: "desc" },
    }).catch(() => []);

    return posts;
}
