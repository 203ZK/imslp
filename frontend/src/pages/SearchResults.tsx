import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import type { Work, WorksApiResponse } from "../types/api";
import { fetchWorks } from "../api/api";
import { Box, CircularProgress, Divider, Typography } from "@mui/material";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import NoResults from "../components/NoResults";

const SearchResults = () => {
  const [params] = useSearchParams();
  const title = params.get("title") ?? "";
  const composer = params.get("composer") ?? "";

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [results, setResults] = useState<Work[]>([]);

  useEffect(() => {
    async function loadWorks() {
      const response: WorksApiResponse = await fetchWorks(title, composer);
      console.log(response.data);
      setResults(response.data ?? []);
      setIsLoading(false);
    }

    setIsLoading(true);
    loadWorks();
  }, [params]);

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <NavBar />
      <Box
        display="flex"
        flexDirection="column"
        sx={{ flexGrow: 1, padding: "3rem", textAlign: "left" }}
      >
        <Typography variant="h4" gutterBottom>
          Search Results for "{title}" by "{composer}"
        </Typography>
        <Divider sx={{ mb: "2rem" }} />
        {isLoading 
          ? <CircularProgress /> 
          : results.length == 0 
          ? <NoResults />
          : (results.map((work: Work, i: number) => {
              return <Link color="inherit" to="" key={i}>{work.work_title} ({work.composer})</Link>;
            })
        )}
      </Box>
      <Footer />
    </Box>
  );
};

export default SearchResults;