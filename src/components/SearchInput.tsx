'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { searchAction } from '@/app/actions';

function SearchInputInner() {
  const searchParams = useSearchParams();

  // Our URL format is /search?<term> (no key), so the term is the first key.
  const currentTerm = [...searchParams.keys()][0] ?? '';

  const [value, setValue] = useState(currentTerm);

  // Keep the input in sync when navigating between different search pages.
  useEffect(() => {
    setValue(currentTerm);
  }, [currentTerm]);

  return (
    <form action={searchAction}>
      <Input
        name="term"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type="text"
        placeholder="Search posts…"
        autoComplete="off"
        className="w-full"
      />
    </form>
  );
}

export function SearchInput() {
  return (
    <Suspense fallback={
      <Input type="text" placeholder="Search posts…" className="w-full" disabled />
    }>
      <SearchInputInner />
    </Suspense>
  );
}
