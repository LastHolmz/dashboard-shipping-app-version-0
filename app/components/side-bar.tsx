"use client";
import { Sidebar, Menu, sidebarClasses } from "react-pro-sidebar";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FaBars } from "react-icons/fa";
import { LuHome } from "react-icons/lu";
import { cn } from "../../lib/utils";
import { GrStorage } from "react-icons/gr";
import { Separator } from "@/components/ui/separator";
import { usePathname } from "next/navigation";

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

        <Button
          className=" w-full rounded-[0px] flex flex-end"
          variant={pathname === "/" ? "default" : "link"}
        >
          <Link className="flex-between sm:gap-2" href={"/"}>
            <LuHome />
            {!collapsed && <span className="">الصفحة الرئيسية</span>}
          </Link>
        </Button>

        <Separator />

        <Button
          className=" w-full rounded-[0px]"
          variant={pathname === "/products" ? "default" : "link"}
        >
          <Link className="flex-between sm:gap-2" href={"/"}>
            <LuHome />
            {!collapsed && <span className="">المنتجات</span>}
          </Link>
        </Button>

        <Separator />

        <Button
          className=" w-full rounded-[0px]"
          variant={pathname === "/storage" ? "default" : "link"}
        >
          <Link className="flex-between sm:gap-2" href={"/storage"}>
            <GrStorage />
            {!collapsed && <span className="">المخزن</span>}
          </Link>
        </Button>

        <Separator />
      </Menu>
    </Sidebar>
  );
};

export default SideBar;
