import { prisma } from "../index";

export default async function selectPostsBySearch(term: string) {
    const posts = await prisma.post.findMany({
        where: {
            OR: [
                { title: { contains: term, mode: "insensitive" } },
                { content: { contains: term, mode: "insensitive" } },
            ],
        },
        include: {
            user: { select: { name: true, image: true } },
            topic: { select: { name: true } },
            _count: {
                select: { comments: true },
            },
        },
        orderBy: { createdAt: "desc" },
    }).catch(() => []);

    return posts;
}
