import selectPostsByTopicName from "@/components/prisma/queries/selectPostsByTopicName";
import PostList from "./PostList";

export default async function PostListLoader({ topicName }: { topicName: string }) {
    const posts = await selectPostsByTopicName(topicName);
    return <PostList topicName={topicName} posts={posts} />;
}
