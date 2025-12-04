import { useState } from "react";
import SearchBar from "../components/SearchBar.js";
import type { Work } from "../types/api.js";
import NavBar from "../components/NavBar.js";
import { Box } from "@mui/material";

const Home = () => {
  const [works, setWorks] = useState<Work[]>([]);

  const handleSearch = (results: Work[]) => {
    setWorks(results);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <NavBar />
      <SearchBar handleSearch={handleSearch} />
      {works.map((work: any, i: number) => {
        const route = `/work/${work.id}`;
        return (
          <>
            <a href={route} key={i}>{work.work_title} ({work.composer})</a>
            <br />
          </>
        );
      })}
    </Box>
  );
};

export default Home;