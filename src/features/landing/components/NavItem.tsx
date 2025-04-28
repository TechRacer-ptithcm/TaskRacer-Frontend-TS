import { LucideIcon, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NavItemProps {
  title: string;
  items: { title: string; icon: LucideIcon }[];
}

export default function NavItem({ title, items }: NavItemProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900">
          {title} <ChevronDown className="ml-1 h-4 w-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-64">
        {items.map((item, index) => {
          const Icon = item.icon;
          return (
            <DropdownMenuItem key={index} className="flex items-center gap-2">
              <Icon className="mr-2 h-4 w-4" />
              {item.title}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
