import { notFound } from "next/navigation";
import Link from "next/link";
import selectPostsBySearch from "@/components/prisma/queries/selectPostsBySearch";
import PostList from "@/components/posts/PostList";

export default async function SearchResultsLoader({ term }: { term: string }) {
    const posts = await selectPostsBySearch(term);

    if (posts.length === 0) notFound();

    const grouped = Map.groupBy(posts, (p) => p.topic.name);

    return (
        <div className="flex flex-col gap-6">
            {[...grouped.entries()].map(([topicName, topicPosts]) => (
                <section key={topicName} className="flex flex-col gap-2">
                    <Link
                        href={`/topics/${encodeURIComponent(topicName)}`}
                        className="text-sm font-semibold hover:underline"
                    >
                        {topicName}
                    </Link>
                    <PostList topicName={topicName} posts={topicPosts} />
                </section>
            ))}
        </div>
    );
}
