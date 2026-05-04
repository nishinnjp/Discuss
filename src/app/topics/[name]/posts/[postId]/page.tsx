import { notFound } from "next/navigation";
import { prisma } from "@/components/prisma";
import PostShow from "@/components/posts/PostShow";
import { Suspense } from "react";
import PostShowLoading from "@/components/posts/PostShowLoading";
import CommentCreateForm from "@/components/comments/CommentCreateForm";
import CommentList from "@/components/comments/CommentList";

export default async function PostShowPage(props: PageProps<"/topics/[name]/posts/[postId]">) {
    const { postId } = await props.params;

    const post = await prisma.post.findUnique({
        where: { id: postId },
        include: { user: true, topic: true },
    });

    if (!post) {
        notFound();
    }

    return (
        <div className="max-w-2xl mt-8 px-4 flex flex-col gap-6">
            <Suspense fallback={<PostShowLoading />}>
                <PostShow postId={postId} />
            </Suspense>
            <CommentCreateForm topicName={post.topic.name} postId={postId} parentId={null} isShowReply={true} />
            <CommentList postId={postId} topicName={post.topic.name} />
        </div>
    );
}
