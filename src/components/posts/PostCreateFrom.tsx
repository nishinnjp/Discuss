"use client";

import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Field, FieldLabel } from "@/components/ui/field"
import * as actions from "@/app/actions";
import { useActionState, useEffect, useState } from "react";

export default function PostCreateForm({ topicName }: { topicName: string }) {
    const [state, action, isPending] = useActionState(actions.createPostAction.bind(null, topicName), null);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    useEffect(() => {
        if (state?.success) {
            setTitle("");
            setContent("");
        }
    }, [state?.success]);

    return (
        <Popover>
            <PopoverTrigger render={<Button className="bg-blue-400">Create Post</Button>} />
            <PopoverContent align="end">
                <form action={action}>
                    <div className="flex flex-col gap-3 p-3">
                        <h3 className="text-lg font-bold">Create Post</h3>
                        <Field className="flex flex-col gap-1">
                            <FieldLabel>Title</FieldLabel>
                            <Input
                                name="title"
                                className="w-full"
                                placeholder="Post name"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                aria-invalid={!!state?.errors?.title}
                            />
                            {state?.errors?.title && (
                                <p className="text-xs text-red-500">{state.errors.title[0]}</p>
                            )}
                        </Field>
                        <Field className="flex flex-col gap-1">
                            <FieldLabel>Content</FieldLabel>
                            <Textarea
                                name="content"
                                className="w-full resize-none"
                                placeholder="Describe the topic..."
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                aria-invalid={!!state?.errors?.content}
                            />
                            {state?.errors?.content && (
                                <p className="text-xs text-red-500">{state.errors.content[0]}</p>
                            )}
                        </Field>
                        {state?.errors?.global && (
                            <p className="text-xs text-red-500">{state.errors.global[0]}</p>
                        )}
                        <Button disabled={isPending} type="submit" className="bg-blue-400 w-full">
                            {isPending ? "Submitting..." : "Submit"}
                        </Button>
                    </div>
                </form>
            </PopoverContent>
        </Popover>
    );
}