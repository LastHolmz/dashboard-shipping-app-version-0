"use client";
import {
  CalendarIcon,
  EnvelopeClosedIcon,
  FaceIcon,
  GearIcon,
  PersonIcon,
  RocketIcon,
} from "@radix-ui/react-icons";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandDialog,
  CommandShortcut,
} from "@/components/ui/command";
import React from "react";

export function TopCommand() {
  const [open, setOpen] = React.useState<boolean>(false);
  const menuRef = React.useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setOpen(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <Command className="rounded-lg border shadow-md w-[250px]">
      <CommandInput
        onClick={() => setOpen(!open)}
        dir="rtl"
        placeholder="ابحث من هنا..."
      />
      <CommandDialog open={open} onOpenChange={setOpen}>
        <div className=" px-5 py-2">
        <CommandInput
          // onClick={() => setOpen(!open)}
          dir="rtl"
          placeholder="ابحث من هنا..."
        />
        <CommandList>
          <CommandEmpty>لا توجد نتائج</CommandEmpty>
          <CommandGroup dir="rtl" heading="اقتراحات">
            <CommandItem>
              <span>التقويم</span>
              <CalendarIcon className="mr-2 h-4 w-4" />
            </CommandItem>
            <CommandItem>
              <span>البدء</span>
              <RocketIcon className="mr-2 h-4 w-4" />
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup dir="rtl" heading="الإعدادات">
            <CommandItem>
              <span>الملف الشخصي</span>
              <PersonIcon className="mr-2 h-4 w-4" />
              {/* <CommandShortcut>⌘P</CommandShortcut> */}
            </CommandItem>
            <CommandItem>
              <span>البريد</span>
              <EnvelopeClosedIcon className="mr-2 h-4 w-4" />
              {/* <CommandShortcut>⌘B</CommandShortcut> */}
            </CommandItem>
            <CommandItem>
              <span>الإعدادات</span>
              <GearIcon className="mr-2 h-4 w-4" />
              {/* <CommandShortcut>⌘S</CommandShortcut> */}
            </CommandItem>
          </CommandGroup>
        </CommandList>
        </div>
      </CommandDialog>
    </Command>
  );
}
