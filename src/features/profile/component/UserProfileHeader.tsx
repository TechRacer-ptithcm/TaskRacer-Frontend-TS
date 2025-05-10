import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { getLastInitial } from "@/utils/name";
import editIcon from "@/assets/icons/features/edit-1-svgrepo-com.svg";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useAppDispatch } from "@/redux/store";
import { openProfileDialog } from "@/redux/user/reducers/user.slice";

export default function UserProfileHeader() {
  const { name } = useSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();

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
        <Button
          variant="text"
          sx={{
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.04)'
            },
            padding: 0,
            minWidth: 'auto'
          }}
          onClick={() => dispatch(openProfileDialog())}
        >
          <img src={editIcon} alt="edit" className="h-10 w-10" />
        </Button>
      </div>
    </div>
  );
}