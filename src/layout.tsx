import Sidebar from "./components/sidebar/navigation";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 5,
          background: "#FFF2F2",
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
