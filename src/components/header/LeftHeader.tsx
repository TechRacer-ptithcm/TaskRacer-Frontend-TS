import { Button } from "../ui/button";
import { Menu } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";
import Logo from "../ui/Logo";

export default function LeftHeader() {
  const { toggleSidebar } = useSidebar();

  return (
    <div className="flex items-center">
      <div className="flex items-center justify-center gap-3">
        <Button
          variant="ghost"
          className="cursor-pointer rounded-full p-2 hover:cursor-pointer"
          onClick={toggleSidebar} // Use the sidebar toggle function
        >
          <Menu className="size-6" />
        </Button>
        <Logo />
      </div>
    </div>
  );
}
