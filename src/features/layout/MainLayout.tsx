import { Outlet } from "react-router-dom";
import Sidebar from "@/features/layout/components/sidebar/SideBar";
import Box from "@mui/material/Box";
import Header from "../../components/header/Header";

export default function Layout() {
  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          background: "#FFF2F2",
        }}
      >
        <Header />
        <Box sx={{ flex: 1, pt: 3, px: 3, overflow: "auto", height: "50px" }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
