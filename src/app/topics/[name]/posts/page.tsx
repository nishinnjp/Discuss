import { notFound } from "next/navigation";
import { prisma } from "@/components/prisma";
import PostList from "@/components/posts/PostList";
import selectPostList from "@/components/prisma/queries/selectPostsByTopicName";

export default async function PostsPage(props: PageProps<"/topics/[name]/posts">) {
    const { name } = await props.params;

    const topic = await prisma.topic.findFirst({ where: { name } });

    if (!topic) {
        notFound();
    }

    const posts = await selectPostList(name);

    return (
        <div className="max-w-2xl mx-auto mt-8 px-4">
            <h1 className="text-2xl font-bold mb-6">Posts in {topic.name}</h1>
            <PostList topicName={topic.name} posts={posts} />
        </div>
    );
}
