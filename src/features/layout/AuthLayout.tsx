import { Outlet } from "react-router-dom";
import Box from "@mui/material/Box";
import { freeFeatures, proFeatures } from "@/features/auth/constants/features";
import PremiumList from "@/features/premium/components/premium-list";
import AuthHandler from "@/features/auth/components/AuthHandler";

export default function AuthLayout() {
  return (
    <>
      <AuthHandler />
      <Box
        sx={{
          display: "flex",
          minHeight: "100vh",
          flexDirection: { xs: "column", md: "row" },
          bgcolor: "#FFF2F2",
        }}
      >
        {/* Form Container */}
        <Box
          sx={{
            flex: { xs: "1", md: "1" },
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            p: { xs: 2, sm: 4, md: 5 },
          }}
        >
          <Outlet />
        </Box>

        {/* Divider */}
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box sx={{ height: "75%", width: 2, bgcolor: "grey.300" }} />
        </Box>

        {/* Premium Features */}
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            flex: "1",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
            p: { md: 5 },
          }}
        >
          <PremiumList title="Miễn phí" features={freeFeatures} />
          <PremiumList title="Pro" features={proFeatures} />
        </Box>
      </Box>
    </>
  );
}
