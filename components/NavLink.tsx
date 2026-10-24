"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className="relative group text-sm text-soft-white/80 hover:text-soft-white transition-colors"
    >
      {children}
      <span
        className={`absolute left-0 -bottom-1 h-[1px] bg-[#F3DFA2] transition-all duration-300 ease-out ${
          isActive ? "w-full" : "w-0 group-hover:w-full"
        }`}
      />
    </Link>
  );
}
