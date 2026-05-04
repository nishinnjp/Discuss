"use client";

import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { useActionState } from "react";
import * as actions from "@/app/actions";

interface CommentCreateFormProps {
    topicName: string;
    postId: string;
    parentId: string | null;
    isShowReply?: boolean;
}

export default function CommentCreateForm({ topicName, postId, parentId, isShowReply }: CommentCreateFormProps) {
    const [state, action, isPending] = useActionState(
        actions.createCommentAction.bind(null, { topicName, postId, parentId }),
        null
    );
    const [content, setContent] = useState("");
    const [isReply, setIsReply] = useState(isShowReply);

    useEffect(() => {
        if (state?.success) {
            setContent("");
            setIsReply(false);
        }
    }, [state?.success]);

    return (
        <div className="space-y-4 mt-3">
            <Button variant="ghost" type="button" onClick={() => setIsReply(!isReply)}>
                {isReply ? "Cancel" : "Reply"}
            </Button>
            {isReply && (
                <form action={action} className="space-y-4">
                    <Textarea
                        name="content"
                        placeholder="Add a comment"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        aria-invalid={!!state?.errors?.content}
                    />
                    {state?.errors?.content && (
                        <p className="text-xs text-red-500">{state.errors.content[0]}</p>
                    )}
                    {state?.errors?.global && (
                        <p className="text-xs text-red-500">{state.errors.global[0]}</p>
                    )}
                    <Button type="submit" disabled={isPending}>
                        {isPending ? "Submitting..." : "Add Comment"}
                    </Button>
                </form>
            )}
        </div>
    );
}
