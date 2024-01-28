"use client";
import { TopCommand } from "./command";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { BellIcon, GearIcon } from "@radix-ui/react-icons";
import SettingsBar from "./settings-bar";
import ThemeSwitch from "./theme-swither";

const Header = () => {
  return (
    
    <div className=" flex-between px-4 my-2 ">
      <div className="flex-between gap-2 ">
        <SettingsBar />
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Button variant={"ghost"} size={"icon"}>
          <BellIcon />
        </Button>
        <ThemeSwitch/>
      </div>
      <TopCommand />
    </div>
  );
};

export default Header;
