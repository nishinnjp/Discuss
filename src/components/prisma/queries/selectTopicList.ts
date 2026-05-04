import { prisma } from "../index";

export default async function selectTopicList() {
    const topics = await prisma.topic.findMany({
      include: {
        _count: {
          select: {
            posts: true,
          },
        },
      },
    }).catch(() => []);
    
    return topics;
}