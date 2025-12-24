import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";

const toolbarStyles = {
  backgroundColor: "#1d4e8eff",
  justifyContent: "space-between",
};

const NavBar = () => {
  const navItems = ['Home', 'About', 'Contact'];

  return (
    <Box display="flex" width='100%'>
      <AppBar component="nav" position="static">
        <Toolbar sx={toolbarStyles}>
          <Typography variant="h6">IMSLP Clone</Typography>
          <Box>
            {navItems.map((item) => (
              <Button key={item} sx={{ color: '#fff' }}>{item}</Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;