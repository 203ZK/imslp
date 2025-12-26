import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const toolbarStyles = {
  backgroundColor: "#1d4e8eff",
  justifyContent: "space-between",
};

const NavBar = () => {
  const navigate = useNavigate();
  const navItems = ['Home'];

  const onClick = () => {
    navigate("/");
  };

  return (
    <Box display="flex" width='100%'>
      <AppBar component="nav" position="static">
        <Toolbar sx={toolbarStyles}>
          <Typography variant="h6">IMSLP Clone</Typography>
          <Box>
            {navItems.map((item) => (
              <Button key={item} sx={{ color: 'white' }} onClick={onClick}>{item}</Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;