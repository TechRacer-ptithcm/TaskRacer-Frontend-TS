import { Card, CardContent } from "@/components/ui/card";
import Avatar from "@mui/material/Avatar";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import { Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { logout } from "@/redux/auth/authSlice";
import { useAppDispatch } from "@/redux/store";

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
            <div>
              <h3 className="mb-2 text-lg font-semibold">About</h3>
              <p className="mb-1 text-sm">
                <span className="font-medium">Email:</span>{" "}
                levukimngan123@gmail.com
              </p>
              <p className="mb-1 text-sm">
                <span className="font-medium">Birthday:</span> 08/06/2005
              </p>
              <p className="mb-1 text-sm">
                <span className="font-medium">Gender:</span> female
              </p>

              <Button
                onClick={handleLogout}
                className="rounded-full bg-[#ff5470] px-6 py-3 font-['Baloo_2',sans-serif] font-medium text-white shadow-md hover:bg-[#ff3c5c]"
              >
                Đăng xuất
              </Button>
            </div>

            <Card className="bg-yellow-50">
              <CardContent className="py-4">
                <div className="mb-1 text-sm font-medium text-gray-700">
                  Sliver II
                </div>
                <div className="mb-2 flex items-center gap-1">
                  <Badge
                    variant="secondary"
                    className="border-yellow-600 bg-yellow-100 text-yellow-700"
                  >
                    <i className="i-tabler-medal text-yellow-600" />
                  </Badge>
                </div>
                <div className="mb-2 flex gap-1 text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={i < 3 ? "fill-yellow-500" : ""}
                      size={18}
                    />
                  ))}
                </div>
                <div className="flex items-center gap-1 text-orange-600">
                  <Flame size={18} /> 10 ngày
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
