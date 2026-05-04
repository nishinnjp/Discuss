"use client";

import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Field, FieldLabel } from "@/components/ui/field"
import * as actions from "@/app/actions";
import { useActionState, useEffect, useState } from "react";

export default function TopicCreateForm() {
    const [state, action, isPending] = useActionState(actions.createTopicAction, null);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        if (state?.success) {
            setName("");
            setDescription("");
        }
    }, [state?.success]);

    return (
        <Popover>
            <PopoverTrigger render={<Button className="bg-blue-400">Create Topic</Button>} />
            <PopoverContent align="end">
                <form action={action}>
                    <div className="flex flex-col gap-3 p-3">
                        <h3 className="text-lg font-bold">Create Topic</h3>
                        <Field className="flex flex-col gap-1">
                            <FieldLabel>Name</FieldLabel>
                            <Input
                                name="name"
                                className="w-full"
                                placeholder="Topic name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                aria-invalid={!!state?.errors?.name}
                            />
                            {state?.errors?.name && (
                                <p className="text-xs text-red-500">{state.errors.name[0]}</p>
                            )}
                        </Field>
                        <Field className="flex flex-col gap-1">
                            <FieldLabel>Description</FieldLabel>
                            <Textarea
                                name="description"
                                className="w-full resize-none"
                                placeholder="Describe the topic..."
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                aria-invalid={!!state?.errors?.description}
                            />
                            {state?.errors?.description && (
                                <p className="text-xs text-red-500">{state.errors.description[0]}</p>
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