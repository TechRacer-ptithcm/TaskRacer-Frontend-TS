import { Button } from "@/components/ui/button";
import { logout } from "@/redux/auth/authSlice";
import { useAppDispatch } from "@/redux/store";

interface UserInfoCardProps {
  email: string;
  birth: string;
  gender: string;
}

export default function UserInfoCard({ email, birth, gender }: UserInfoCardProps) {
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    await dispatch(logout());
    localStorage.removeItem("accessToken");
  };

  return (
    <div className="flex flex-col gap-2 py-4">
      <p className="text-3xl font-semibold">Thông tin</p>
      <p className="text-2xl">
        <span className="font-medium">Email:</span> {email}
      </p>
      <p className="text-2xl">
        <span className="font-medium">Ngày sinh:</span> {birth}
      </p>
      <p className="text-2xl">
        <span className="font-medium">Giới tính:</span> {gender}
      </p>
      <Button
        onClick={handleLogout}
        className="mt-5 w-fit rounded-full bg-[#F3737E] px-10 py-5 font-['Baloo_2',sans-serif] text-xl font-medium text-white shadow-md hover:bg-[#ff3c5c]/60"
      >
        Đăng xuất
      </Button>
    </div>
  );
}