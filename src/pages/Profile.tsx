import { Card, CardContent } from "@/components/ui/card";
import Avatar from "@mui/material/Avatar";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { logout } from "@/redux/auth/authSlice";
import { useAppDispatch } from "@/redux/store";
import BRONZER from "@/assets/ranks/BRONZER.png";
import SILVER from "@/assets/ranks/SILVER.png";
import GOLD from "@/assets/ranks/GOLD.png";
import PLATINUM from "@/assets/ranks/PLATINUM.png";
import DIAMOND from "@/assets/ranks/DIAMOND.png";
import Fire from "@/assets/Fire.json";
import Lottie from "lottie-react";

export default function ProfilePage() {
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    await dispatch(logout());
    localStorage.removeItem("accessToken");
  };

  return (
    <main className="flex h-full bg-pink-50">
      <div className="flex flex-1">
        <div className="relative w-full rounded-3xl bg-white p-6 shadow-md">
          <div className="h-32 rounded-t-3xl bg-violet-200" />

          <div className="-mt-12 flex items-center gap-4">
            <Avatar sx={{ ml: 2, bgcolor: "#4caf50", width: 40, height: 40 }}>
              U
            </Avatar>
            <div>
              <h2 className="flex items-center gap-2 text-xl font-semibold">
                Kim Ngân{" "}
                <i className="i-tabler-edit text-muted-foreground text-base" />
              </h2>
              <p className="text-muted-foreground text-sm">UI/Design</p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-6">
            <Card className="bg-yellow-50">
              <CardContent className="flex flex-col gap-2 py-4">
                <h3 className="text-lg font-semibold">About</h3>

                <p className="text-sm">
                  <span className="font-medium">Email:</span>{" "}
                  levukimngan123@gmail.com
                </p>
                <p className="text-sm">
                  <span className="font-medium">Birthday:</span> 08/06/2005
                </p>
                <p className="text-sm">
                  <span className="font-medium">Gender:</span> female
                </p>

                <Button
                  onClick={handleLogout}
                  className="mt-2 w-fit rounded-full bg-[#ff5470] px-6 py-3 font-['Baloo_2',sans-serif] font-medium text-white shadow-md hover:bg-[#ff3c5c]"
                >
                  Đăng xuất
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-yellow-50">
              <CardContent className="flex py-4">
                <div className="flex w-1/2 flex-col justify-center gap-2">
                  <div className="flex items-center justify-center">
                    <div className="text-sm font-medium text-gray-700">
                      Silver II
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <img
                      src={SILVER}
                      alt="Silver Rank"
                      className="h-20 w-20 object-contain"
                    />
                  </div>

                  <div className="flex justify-center gap-1 text-yellow-500">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={i < 3 ? "fill-yellow-500" : ""}
                        size={18}
                      />
                    ))}
                  </div>
                </div>

                <div className="flex w-1/2 flex-col justify-center gap-2 text-orange-600">
                  <div className="flex items-center justify-center">
                    <div className="text-sm font-medium text-gray-700">
                      Chuỗi lửa
                    </div>
                  </div>

                  <div className="mb-6 flex justify-center">
                    <div className="h-13 w-13">
                      <Lottie animationData={Fire} loop autoplay />
                    </div>
                  </div>

                  <div className="flex justify-center text-orange-600">
                    <span className="text-center">10 ngày</span>
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
