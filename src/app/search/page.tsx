import { Suspense } from "react";
import { redirect } from "next/navigation";
import SearchResultsLoader from "@/components/search/SearchResultsLoader";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const term = (Object.keys(params)[0] ?? "").trim();

  if (!term) redirect("/");

  return (
    <div className="flex flex-col gap-4 mt-4 max-w-2xl">
      <h1 className="text-xl font-bold">
        Results for &ldquo;{term}&rdquo;
      </h1>
      <Suspense fallback={null}>
        <SearchResultsLoader term={term} />
      </Suspense>
    </div>
  );
}
