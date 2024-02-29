"use client";
import { Sidebar, Menu, sidebarClasses } from "react-pro-sidebar";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FaBars, FaMapMarked } from "react-icons/fa";
import { LuHome } from "react-icons/lu";
import { cn } from "../../lib/utils";
import { GrStorage } from "react-icons/gr";
import { Separator } from "@/components/ui/separator";
import { usePathname } from "next/navigation";
import { IoNewspaperOutline } from "react-icons/io5";
import { btnVariants } from "./variants";
import { FaCartFlatbed } from "react-icons/fa6";
import { CiUser } from "react-icons/ci";

const NavItem = ({
  pathname,
  href,
  collapsed,
  Icon,
  name,
}: {
  pathname: string;
  href: string;
  collapsed: boolean;
  Icon: React.ReactNode;
  name: string;
}) => {
  return (
    <>
      <Link
        className={`flex justify-center items-center sm:gap-2 w-full rounded-[0px] ${
          pathname === href || pathname.startsWith(`${href}/`)
            ? btnVariants.variant.default
            : btnVariants.variant.link
        } ${btnVariants.size.default}`}
        href={href}
      >
        {Icon}
        {!collapsed && <span className="">{name}</span>}
      </Link>
      <Separator />
    </>
  );
};

const SideBar = () => {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = React.useState<boolean>(false);
  return (
    <Sidebar
      rootStyles={{
        [`.${sidebarClasses.container}`]: {
          backgroundColor: "hsl(var(--background))",
        },
      }}
      rtl
      className="relative bg-background h-screen"
      collapsed={collapsed}
    >
      <Button
        dir="rtl"
        size={"icon"}
        variant={"outline"}
        className={cn(
          "absolute left-2 transition-all top-2",
          collapsed && "right-1/4"
        )}
        onClick={() => setCollapsed(!collapsed)}
      >
        <FaBars />
      </Button>
      <Menu className=" mt-20 ">
        <Separator />

        <Link
          className={`flex justify-center sm:gap-2 w-full rounded-[0px] ${
            pathname === "/"
              ? btnVariants.variant.default
              : btnVariants.variant.link
          } ${btnVariants.size.default}`}
          href={"/"}
        >
          <LuHome />
          {!collapsed && <span className="">الصفحة الرئيسية</span>}
        </Link>

        <Separator />

        <NavItem
          pathname={pathname}
          collapsed={collapsed}
          href="/products"
          Icon={<FaCartFlatbed />}
          name="المنتجات"
        />

        <NavItem
          pathname={pathname}
          collapsed={collapsed}
          href="/storage"
          Icon={<GrStorage />}
          name="المخزن"
        />

        <NavItem
          pathname={pathname}
          collapsed={collapsed}
          href="/orders"
          Icon={<IoNewspaperOutline />}
          name="الطلبات"
        />

        <NavItem
          pathname={pathname}
          collapsed={collapsed}
          href="/cities"
          Icon={<FaMapMarked />}
          name="المدن"
        />
        <NavItem
          pathname={pathname}
          collapsed={collapsed}
          href="/employee"
          Icon={<CiUser />}
          name="الموظفين"
        />
      </Menu>
    </Sidebar>
  );
};

export default SideBar;
