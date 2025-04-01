import Sidebar from "./components/sidebar/SideBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Header from "./components/header/Header";

export default function Layout({ children }: { children: React.ReactNode }) {
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
        <Toolbar />
        <Box sx={{ flex: 1, pt: 3, px: 3, overflow: "auto" }}>{children}</Box>
      </Box>
    </Box>
  );
}
