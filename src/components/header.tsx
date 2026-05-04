import Link from "next/link";
import Image from "next/image";
import { HeaderAuth } from "./HearderAuth";
import { SearchInput } from "./SearchInput";
import { ThemeToggle } from "./ThemeToggle";


export async function Header() {

  return (
    <header className="flex items-start flex-3 justify-between px-6 py-4 border-b border-gray-200">
      <Link href="/" className="flex items-center gap-2 hover:opacity-75 transition-opacity">
        <Image src="/favicon.ico" alt="Acme logo" width={28} height={28} />
        <span className="font-bold text-lg">Acme</span>
      </Link>
      <nav className="flex gap-6">
        <SearchInput />
      </nav>
      <div className="hidden lg:flex gap-2 items-center">
        <ThemeToggle />
        <HeaderAuth />
      </div>
    </header>
  );
}
