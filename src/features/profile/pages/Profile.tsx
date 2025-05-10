import { CardContent } from "@/components/ui/card";
import UserProfileHeader from "../component/UserProfileHeader";
import UserInfoCard from "../component/UserInfoCard";
import UserStatsCard from "../component/UserStatsCard";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export default function ProfilePage() {
  const { name, email, birth, gender, streak } = useSelector(
    (state: RootState) => state.user,
  );

  return (
    <main className="flex h-full bg-pink-50 font-['Baloo_2',sans-serif]">
      <div className="mr-3 mb-10 flex flex-1">
        <div className="relative w-full rounded-[50px] bg-white p-6 opacity-80 shadow-[20px_20px_40px_0px_rgba(0,_0,_0,_0.1)]">
          <div className="h-[242px] rounded-tl-[50px] rounded-tr-[50px] rounded-br-[15px] rounded-bl-[15px] bg-[#D9D4E7]" />
          
          <UserProfileHeader name={name} />
          
          <p className="text-muted-foreground mt-8 ml-8 text-3xl">UI/Design</p>

          <div className="mt-6 grid grid-cols-2 gap-6">
            <CardContent>
              <UserInfoCard email={email} birth={birth} gender={gender} />
            </CardContent>
            <UserStatsCard streak={streak} />
          </div>
        </div>
      </div>
    </main>
  );
}
