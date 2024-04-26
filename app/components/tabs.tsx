"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function Tabs({ children }: { children: React.ReactNode }) {
  return (
    <nav className="hidden md:flex items-center" dir="rtl">
      {children}
    </nav>
  );
}
interface LinkProps {
  href: string;
  content: string;
}
export function TabItem({ href, content }: LinkProps) {
  const pathname = usePathname();
  if (pathname === `/${href}` || pathname.startsWith(`${href}/`)) {
    console.log(pathname);
  }
  return (
    <div className=" relative w-fit">
      <Link
        className={cn(
          "flex-center h-12 px-4",
          pathname === `/${href}` || pathname.startsWith(`${href}/`)
            ? "text-rose-900 dark:text-rose-600"
            : "dark:text-white text-black"
        )}
        href={`/${href}`}
      >
        {content}
      </Link>
      <div
        className={cn(
          "h-1 w-full transition-all rounded-lg",
          pathname === `/${href}` && "bg-rose-900 dark:bg-rose-600"
        )}
      />
    </div>
  );
}
