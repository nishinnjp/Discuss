import React from 'react'
import Image from 'next/image'
import { CommentWithUser } from '@/app/types/CommentWithUser';
import CommentCreateForm from './CommentCreateForm';

interface CommentShowProps {
    comment: CommentWithUser;
    topicName: string;
    allComments: CommentWithUser[];
}

export default function CommentShow({ comment, topicName, allComments }: CommentShowProps) {
    const replies = allComments.filter((c) => c.parentId === comment.id);

    return (
        <div className="border border-border bg-muted mt-2 p-4 rounded-md">
            <div className="flex justify-between items-center gap-2">
                <div className="flex items-center gap-2">
                    <Image src={comment.user.image || '/windows.svg'} alt='windows' width={40} height={40} />
                    <p className="text-sm font-medium text-gray-500">{comment.content}</p>
                </div>
                <p className="text-sm font-medium text-gray-500">{comment.createdAt.toLocaleDateString()}</p>
            </div>
            <CommentCreateForm topicName={topicName} postId={comment.postId} parentId={comment.id} />
            {replies.map((reply) => (
                <CommentShow key={reply.id} comment={reply} topicName={topicName} allComments={allComments} />
            ))}
        </div>
    );
}
