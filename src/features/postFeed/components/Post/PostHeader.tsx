import { MoreHorizontal } from "lucide-react";
import { Avatar } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { getLastInitial } from "@/utils/name";
import { Button } from "@/components/ui/button";

export default function PostHeader() {
  const { name } = useSelector((state: RootState) => state.user);
  
  return (
    <div className="flex items-center justify-between p-3">
      <div className="flex items-center space-x-2">
        <div className="h-8 w-8 overflow-hidden rounded-full border border-rose-500 p-0.5">
          <Avatar sx={{ ml: 2, bgcolor: "#f582ae", width: 50, height: 50 }}>
            {getLastInitial(name)}
          </Avatar>
        </div>
        <div>
          <span className="text-sm font-semibold">{name}</span>
        </div>
      </div>
      <Button variant="ghost" size="icon" className="rounded-full">
        <MoreHorizontal className="h-5 w-5 text-gray-700" />
      </Button>
    </div>
  );
}
