import { motion } from "framer-motion";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Notification } from "@/redux/notifications/notifications.slice";

interface NotificationItemProps {
  notification: Notification;
  onClick?: () => void;
}

const NotificationItem = ({ notification, onClick }: NotificationItemProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2 }}
    >
      <DropdownMenuItem
        className={`flex flex-col items-start gap-1 ${!notification.read ? "bg-blue-50" : ""}`}
        onClick={onClick}
      >
        <span className="font-medium">{notification.title}</span>
        <span className="text-sm text-gray-500">{notification.message}</span>
        <span className="text-xs text-gray-400">{notification.timestamp}</span>
      </DropdownMenuItem>
    </motion.div>
  );
};

export default NotificationItem;
