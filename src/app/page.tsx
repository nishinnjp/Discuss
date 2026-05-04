import { Suspense } from "react";
import PostCreateForm from "@/components/posts/PostCreateFrom";
import TopicCreateForm from "@/components/topics/TopicCreateForm";
import TopicList from "@/components/topics/TopicList";

export default function Home() {
  return (
    <div className="flex flex-row justify-between">
      <div>
        <h1>Top posts</h1>      
      </div>
      <div className="flex flex-col items-end gap-2">
        <TopicCreateForm />
        <Suspense fallback={null}>
          <TopicList />
        </Suspense>
      </div>
    </div>
  );
}
