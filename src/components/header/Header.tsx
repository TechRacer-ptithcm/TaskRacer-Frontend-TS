import LeftHeader from "./LeftHeader";
import RightHeader from "./RightHeader";
import CenterHeader from "./CenterHeader";

export default function Header() {
  return (
    <div className="flex items-center justify-between px-5 w-full mr-6">
        <LeftHeader />
        <CenterHeader />
        <RightHeader />
    </div>
  );
}
