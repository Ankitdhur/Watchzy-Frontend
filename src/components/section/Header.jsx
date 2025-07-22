"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ProfileSheet from "../atom/ProfileSheet";

export const navLinks = [
  { name: "Home", key: "", href: "/" },
  { name: "Movies", key: "movies", href: "/movies" },
  { name: "Tv Shows", key: "tv", href: "/tv" },
  { name: "Watchlist", key: "watchlist", href: "/watchlist" },
  { name: "Watchzy+", key: "watchzy+", href: "/watchzy+" },
];

export default function Header() {
  const path = usePathname();
  const activeTabKey = path.split("/")[1];

  return (
    <header className="bg-[#0f0f0f] py-4 w-full fixed top-0 z-50 border-b border-neutral-800">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between px-4 md:px-8">
        <div className="flex items-center space-x-6">
          <Link href="/">
            <Image
              src="/Watchzy-logo.png"
              alt="Watchzy Logo"
              width={140}
              height={40}
              className="h-10 md:h-12 w-auto object-contain"
              priority
            />
          </Link>

          <Link
            href="/subscription"
            className="hidden md:flex px-4 py-1 rounded-full items-center gap-2 text-[#eab308] border border-[#eab308] text-sm hover:bg-[#eab308]/10 transition"
          >
            <Image src="/crown.svg" height={16} width={16} alt="crown" />
            <span className="font-medium">Go Premium</span>
          </Link>
        </div>

        <nav className="hidden lg:flex space-x-8">
          {navLinks.map((tab) => (
            <Link
              href={tab.href}
              key={tab.key}
              className={`text-[15px] font-medium tracking-wide transition ${
                activeTabKey === tab.key
                  ? "text-white border-b-2 border-yellow-400 pb-1"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              {tab.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center space-x-4">
          <div className="hidden lg:flex items-center bg-[#1a1a1a] border border-neutral-700 rounded-full px-4 py-1">
            <Image src="/search.svg" alt="search icon" height={20} width={20} />
            <input
              type="text"
              placeholder="Search..."
              className="ml-2 bg-transparent text-sm text-neutral-300 focus:outline-none placeholder:text-neutral-500"
            />
          </div>
          <ProfileSheet />
        </div>
      </div>
    </header>
  );
}
