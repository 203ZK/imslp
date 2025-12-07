import { Box, Toolbar, Typography } from "@mui/material";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box component="footer" position="absolute" sx={{ bottom: 0, width: "100%", color: "white" }}>
      <Toolbar sx={{ backgroundColor: "#1d4e8eff", justifyContent: "space-between" }}>
        <Typography>
          Copyright © {currentYear} Hou Jin Peh.
        </Typography>
      </Toolbar>
    </Box>
  );
};

export default Footer;