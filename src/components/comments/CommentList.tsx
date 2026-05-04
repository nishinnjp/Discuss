import selectCommentsByPostId from "../prisma/queries/selectCommentsByPostId";
import CommentShow from "./CommentShow";

export default async function CommentList({ postId, topicName }: { postId: string; topicName: string }) {
    const comments = await selectCommentsByPostId(postId);

    if (comments.length === 0) return null;

    const topLevelComments = comments.filter((comment) => comment.parentId === null);
    
    return (
        <div>
            <h1 className="text-2xl font-bold">All Comments</h1>
            {
                topLevelComments.map((comment) => (
                    <CommentShow key={comment.id} comment={comment} topicName={topicName} allComments={comments} />
                ))
            }
        </div>
    );
}
