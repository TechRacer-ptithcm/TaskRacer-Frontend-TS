import LeftHeader from "./LeftHeader"
import RightHeader from "./RightHeader"
import CenterHeader from "./CenterHeader"

export default function Header() {
  return (
    <div className="flex items-center justify-between mx-3 py-3">
        <LeftHeader />
        <CenterHeader />
        <RightHeader />
    </div>
  )
}
