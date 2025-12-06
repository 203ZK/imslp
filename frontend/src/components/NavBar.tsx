import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";

const NavBar = () => {
  const navItems = ['Home', 'About', 'Contact'];

  return (
    <Box display="flex">
      <AppBar component="nav" position="static">
        <Toolbar sx={{ backgroundColor: "#1d4e8eff", justifyContent: "space-between" }}>
          <Typography variant="h6">IMSLP Clone</Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map((item) => (
              <Button key={item} sx={{ color: '#fff' }}>
                {item}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;