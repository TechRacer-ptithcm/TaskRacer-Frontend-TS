import { Button } from "../ui/button";
import {  Menu } from "lucide-react";
import Logo from "../ui/Logo";

export default function LeftHeader() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center justify-center">
        <Button variant="ghost" className="cursor-pointer rounded-full p-2 hover:cursor-pointer">
          <Menu className="size-6" />
        </Button>
        <Logo />
      </div>
    </div>
  );
}
