import Avatar from "@mui/material/Avatar";
import { getLastInitial } from "@/utils/name";
import editIcon from "@/assets/icons/features/edit-1-svgrepo-com.svg";

interface UserProfileHeaderProps {
  name: string;
}

export default function UserProfileHeader({ name }: UserProfileHeaderProps) {
  return (
    <div className="-mt-12 flex items-center gap-4">
      <Avatar sx={{ ml: 2, bgcolor: "#f582ae", width: 150, height: 150 }}>
        {getLastInitial(name)}
      </Avatar>
      <div>
        <h2 className="flex items-center gap-2 text-xl font-semibold">
          {name}{" "}
          <i className="i-tabler-edit text-muted-foreground text-base" />
        </h2>
        <button className="hover:bg-gray-200">
          <img src={editIcon} alt="edit" className="h-10 w-10" />
        </button>
      </div>
    </div>
  );
}