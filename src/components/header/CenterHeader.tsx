import { Button } from "../ui/button";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import { FaCaretDown } from "react-icons/fa";

export default function CenterHeader() {
  return (
    <div className="flex items-center gap-4 p-4">
      <Button variant="outline" className="rounded-3xl px-4 py-2">Hôm nay</Button>
      <div className="flex items-center gap-2">
        <Button variant="ghost" className="p-2 rounded-full">
          <MdKeyboardArrowLeft />
        </Button>
        <Button variant="ghost" className="p-2 rounded-full">
          <MdKeyboardArrowRight />
        </Button>
      </div>
      <Button variant="ghost" className="p-2 rounded-full">
        <FaCaretDown />
      </Button>
    </div>
  );
}
