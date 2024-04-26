"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GoHome } from "react-icons/go";
import { useEffect, useState } from "react";

interface StaticSegments {
  [key: string]: string;
}

const Indicator: React.FC = () => {
  const pathname = usePathname();
  const [pageTitle, setPageTitle] = useState("");

  useEffect(() => {
    setPageTitle(document.title);
  }, [pageTitle]);

  const pathSegments = pathname.split("/").filter((segment) => segment !== "");

  const staticSegments: StaticSegments = {
    products: "المنتجات",
    services: "الخدمات",
    about: "عنا",
    storage: "المخزن",
    employee: "الموظفين",
    cities: "المدن",
    orders: "الطلبات",

    // Add more static segments here if needed
  };

  return (
    <nav dir="rtl" className=" px-4 my-2">
      <ul className="flex text-sm items-center gap-2" dir="rtl">
        {pathname !== "/" ? (
          <li>
            <Link href="/">لوحة التحكم</Link>
          </li>
        ) : (
          <li>
            <Link href="/" className="text-primary">
              لوحة التحكم | تلقائي
            </Link>
          </li>
        )}

        {pathSegments.map((segment, index) => {
          let segmentLabel: string = segment;
          if (index === pathSegments.length - 1 && pathSegments.length > 1) {
            segmentLabel = pageTitle;
          } else if (segment in staticSegments) {
            segmentLabel = staticSegments[segment];
          }

          return (
            <li key={index}>
              <Link
                className={cn(
                  "",
                  pathname === `/${pathSegments.slice(0, index + 1).join("/")}`
                    ? "text-primary  underline-offset-4 underline"
                    : "hover:text-primary dark:hover:text-primary dark:hover:underline-offset-4 hover:underline-offset-4 dark:hovor:underline hovor:underline  dark:text-white text-black"
                )}
                href={`/${pathSegments.slice(0, index + 1).join("/")}`}
              >
                / {segmentLabel}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Indicator;
