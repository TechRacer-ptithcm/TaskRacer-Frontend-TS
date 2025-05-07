import React from 'react';
import { Toolbar, Box } from "@mui/material";
import UserActions from "./component/UserActions";
import StudySyncDropdown from "./component/teamHeaderParts/StudySyncDropdown";
import SearchBar from "./component/SearchBar";

const TeanHeader: React.FC = () => {
  return (
    <Toolbar
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        px: 2,
      }}
    >
      <StudySyncDropdown />
      <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
        <SearchBar />
      </Box>
      <UserActions />
    </Toolbar>
  );
};

export default TeanHeader;