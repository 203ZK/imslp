import SearchBar from "../components/SearchBar.js";
import NavBar from "../components/NavBar.js";
import { Box, Typography } from "@mui/material";
import Footer from "../components/Footer.js";

const Home = () => {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <NavBar />
      <Box
        display="flex" 
        flexDirection="column" 
        sx={{
          justifyContent: "center",
          flexGrow: 1,
          padding: "3rem",
          textAlign: "left",
          transform: "translateY(-2rem)",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Search for any work on IMSLP
        </Typography>
        <Typography variant="body1" gutterBottom>
          IMSLP Clone lets you look up any work by any composer listed in the International Music Score Library Project (IMSLP) /
          Petrucci Music Library database, <b>no matter the domain, and without the 15-second waiting time</b> for non-IMSLP members.
          <br/><br/>
          Search by the work's title and/or the composer's name to find scores!
        </Typography>
        <SearchBar />
      </Box>
      <Footer />
    </Box>
  );
};

export default Home;