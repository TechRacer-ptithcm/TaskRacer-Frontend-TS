import { Box, IconButton, Typography, Menu, MenuItem } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { useState } from "react";

const CalendarHeader = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box display="flex" alignItems="center" px={2}>
      <Box
        sx={{
          px: 1.5,
          py: 0.5,
          borderRadius: "20px",
          border: "1px solid #888",
          mr: 2,
          cursor: "pointer",
        }}
      >
        Hôm nay
      </Box>
      <IconButton>
        <ChevronLeft />
      </IconButton>
      <IconButton>
        <ChevronRight />
      </IconButton>
      <Typography variant="h6" sx={{ mx: 2 }}>
        Tháng 5, 2025
      </Typography>
      <Box sx={{ flexGrow: 1 }} />
      <Box>
        <Box
          sx={{
            border: "1px solid #888",
            borderRadius: "20px",
            px: 1.5,
            py: 0.5,
            cursor: "pointer",
          }}
          onClick={handleMenuClick}
        >
          Tháng
        </Box>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
          <MenuItem onClick={handleMenuClose}>Ngày</MenuItem>
          <MenuItem onClick={handleMenuClose}>Tuần</MenuItem>
          <MenuItem onClick={handleMenuClose}>Tháng</MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};

export default CalendarHeader;
