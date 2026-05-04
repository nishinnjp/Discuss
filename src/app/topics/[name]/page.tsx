import { Suspense } from "react";
import PostCreateForm from "@/components/posts/PostCreateFrom";
import PostListLoader from "@/components/posts/PostListLoader";

export default async function TopicPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;

  return (
    <div className="flex flex-col gap-4 mt-4 max-w-2xl">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">{name}</h1>
        <PostCreateForm topicName={name} />
      </div>
      <Suspense fallback={null}>
        <PostListLoader topicName={name} />
      </Suspense>
    </div>
  );
}
