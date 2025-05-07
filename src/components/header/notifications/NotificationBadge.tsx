import { Badge } from "@mui/material";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import notificationIcon from "@/assets/icons/features/notification-svgrepo-com.svg";
import { motion } from "framer-motion";
import NotificationItem from "./NotificationItem";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { markAsRead } from "@/redux/notifications/notifications.slice";

const NotificationBadge = () => {
  const dispatch = useDispatch();
  const { notifications, unreadCount } = useSelector(
    (state: RootState) => state.notifications,
  );

  const handleNotificationClick = (id: string) => {
    dispatch(markAsRead(id));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <motion.div
          className="cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Badge badgeContent={unreadCount} color="error">
            <img
              src={notificationIcon}
              alt="notifications"
              className="h-[40px] w-[40px]"
            />
          </Badge>
        </motion.div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="z-[9999] w-80">
        <DropdownMenuLabel className="flex justify-between">
          <span>Thông báo</span>
          {unreadCount > 0 && (
            <span className="text-sm text-blue-500">
              {unreadCount} chưa đọc
            </span>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="max-h-[400px] overflow-y-auto">
          {notifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              onClick={() => handleNotificationClick(notification.id)}
            />
          ))}
        </div>
        <DropdownMenuSeparator />
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <DropdownMenuItem className="justify-center text-blue-500">
            Xem tất cả thông báo
          </DropdownMenuItem>
        </motion.div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationBadge;
