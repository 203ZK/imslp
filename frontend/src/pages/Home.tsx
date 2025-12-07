import SearchBar from "../components/SearchBar.js";
import NavBar from "../components/NavBar.js";
import { Box, Typography } from "@mui/material";
import Footer from "../components/Footer.js";

const Home = () => {
  return (
    <Box display="flex" flexDirection="column">
      <NavBar />
      <Box display="flex" sx={{ flexDirection: "column", flexGrow: 1, padding: "3rem", textAlign: "left" }}>
        <Typography variant="h4" sx={{ mb: "1rem" }}>
          Search for any work on IMSLP
        </Typography>
        <Typography variant="body1" sx={{ mb: "2rem" }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
          exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
          dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        </Typography>
        <SearchBar />
      </Box>
      <Footer />
    </Box>
  );
};

export default Home;