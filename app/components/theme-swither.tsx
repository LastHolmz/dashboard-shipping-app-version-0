"use client";
import * as React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select";
import { SelectTrigger } from "@/components/ui/selectWithoutIcon";
import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { btnVariants } from "./variants";
const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      <Select dir="rtl" onValueChange={(e) => setTheme(e)} defaultValue={theme}>
        <SelectTrigger className={`${btnVariants.variant.ghost} ${btnVariants.size.icon} flex justify-center items-center rounded-sm`}>
          {theme === "dark" ? <MdOutlineLightMode /> : <MdOutlineDarkMode />}
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="light">الوضع الفاتح</SelectItem>
            <SelectItem value="dark">الوضع الداكن</SelectItem>
            <SelectItem value="system">النظام</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
};

export default ThemeSwitch;
