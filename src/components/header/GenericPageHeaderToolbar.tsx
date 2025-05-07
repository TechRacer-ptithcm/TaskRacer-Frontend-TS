import { Toolbar, Box } from "@mui/material";
import SearchBar from "./component/SearchBar";
import UserActions from "./component/UserActions";

const GenericPageHeaderToolbar = () => {
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
      <Box sx={{ width: 80, flexShrink: 0 }} />
      <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
        <SearchBar />
      </Box>
      <UserActions />
    </Toolbar>
  );
};

export default GenericPageHeaderToolbar;