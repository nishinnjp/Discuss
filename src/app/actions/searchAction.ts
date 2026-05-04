"use server";

import { redirect } from "next/navigation";

export async function searchAction(formData: FormData) {
    const term = ((formData.get("term") as string) ?? "").trim();
    if (!term) redirect("/");
    redirect(`/search?${encodeURIComponent(term)}`);
}
