import { Card, CardContent } from "@/components/ui/card";
import Avatar from "@mui/material/Avatar";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { logout } from "@/redux/auth/authSlice";
import { useAppDispatch } from "@/redux/store";
import Fire from "@/assets/icons/features/Fire.json";
import Lottie from "lottie-react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { getLastInitial } from "@/utils/name";
import editIcon from "@/assets/icons/features/edit-1-svgrepo-com.svg";
import { User } from "@/redux/rank/rankData";

export default function ProfilePage() {
  const dispatch = useAppDispatch();

  const { name, email, birth, gender, streak } = useSelector(
    (state: RootState) => state.user,
  );
  const currentUser = User[0];

  const handleLogout = async () => {
    await dispatch(logout());
    localStorage.removeItem("accessToken");
  };

  return (
    <main className="flex h-full bg-pink-50 font-['Baloo_2',sans-serif]">
      <div className="mr-3 mb-10 flex flex-1">
        <div className="relative w-full rounded-[50px] bg-white p-6 opacity-80 shadow-[20px_20px_40px_0px_rgba(0,_0,_0,_0.1)]">
          <div className="h-[242px] rounded-tl-[50px] rounded-tr-[50px] rounded-br-[15px] rounded-bl-[15px] bg-[#D9D4E7]" />

          <div className="-mt-12 flex items-center gap-4">
            <Avatar sx={{ ml: 2, bgcolor: "#f582ae", width: 150, height: 150 }}>
              {getLastInitial(name)}
            </Avatar>
            <div>
              <h2 className="mt-10 flex items-center gap-2 text-3xl font-semibold">
                {name}{" "}
                <i className="i-tabler-edit text-muted-foreground text-base" />
              </h2>
            </div>
            <button className="mt-8 hover:bg-gray-200">
              <img src={editIcon} alt="edit" className="h-10 w-10" />
            </button>
          </div>
          <p className="text-muted-foreground mt-8 ml-8 text-3xl">UI/Design</p>

          <div className="mt-6 grid grid-cols-2 gap-6">
            <CardContent className="flex flex-col gap-2 py-4">
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
            </CardContent>

            <Card className="border-none bg-[#FFE8A2]">
              <CardContent className="flex py-4">
                <div className="flex w-1/2 flex-col justify-center gap-2">
                  <div className="flex items-center justify-center">
                    <div className="text-2xl font-semibold text-gray-700">
                      {currentUser.rankTitle}
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <img
                      src={currentUser.rankImage}
                      alt={`${currentUser.rankTitle} Rank`}
                      className="h-20 w-20 rounded-[50px] object-contain"
                    />
                  </div>

                  <div className="flex justify-center gap-1 text-yellow-500">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={
                          i < currentUser.stars ? "fill-yellow-500" : ""
                        }
                        size={25}
                      />
                    ))}
                  </div>
                </div>

                <div className="flex w-1/2 flex-col justify-center gap-2 text-[#FC9502]">
                  <div className="flex items-center justify-center">
                    <div className="text-2xl font-bold">Streak</div>
                  </div>

                  <div className="mb-6 flex justify-center">
                    <div className="h-13 w-13">
                      <Lottie animationData={Fire} loop autoplay />
                    </div>
                  </div>

                  <div className="flex justify-center text-[#FC9502]">
                    <span className="text-center text-2xl font-bold">
                      {streak} ngày
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
