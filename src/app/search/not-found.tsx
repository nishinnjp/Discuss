import Link from "next/link";

export default function SearchNotFound() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 mt-24 text-center">
      <h1 className="text-2xl font-bold">No results found</h1>
      <p className="text-muted-foreground text-sm">
        Try a different search term, or browse all topics.
      </p>
      <Link
        href="/"
        className="text-sm font-medium underline underline-offset-4 hover:opacity-75"
      >
        Back to home
      </Link>
    </div>
  );
}
