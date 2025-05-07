import { motion } from "framer-motion";
import { WhiteColor } from "@/assets/color";
import TaskRacerLogo from "@/assets/images/logos/TaskRacerLogo.png";

export const Loading = () => {
  return (
    <motion.div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: WhiteColor,
        zIndex: 9999
      }}
    >
      <motion.div
        style={{
          width: '100px',
          height: '100px',
          backgroundImage: `url(${TaskRacerLogo})`,
          backgroundSize: 'cover'
        }}
        animate={{
          rotate: [0, -15, 15, -10, 10, -5, 5, 0],
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </motion.div>
  );
};