import logo from "../../assets/TaskRacerLogo.png";

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <a href="/" className={`flex items-center justify-center gap-2 ${className}`} onClick={() => window.location.reload()}>
      <img src={logo} alt="TaskRacer Logo" className="h-12 w-12 rounded" />
      <h1 className="text-3xl font-bold text-[#FF3B30]">TaskRacer</h1>
    </a>
  );
}
