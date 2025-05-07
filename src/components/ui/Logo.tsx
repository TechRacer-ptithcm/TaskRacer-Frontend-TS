import logo from "@/assets/images/logos/TaskRacerLogo.png";
import { useNavigate } from "react-router-dom";

export default function Logo({ className = "" }: { className?: string }) {
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <a
      href="/"
      className={`flex items-center justify-center gap-2 ${className}`}
      onClick={handleClick}
    >
      <img src={logo} alt="TaskRacer Logo" className="h-12 w-12 rounded" />
      <h1 className="text-3xl font-bold text-[#FF3B30]">TaskRacer</h1>
    </a>
  );
}
