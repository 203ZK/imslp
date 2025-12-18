import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import type { Work, WorksApiResponse } from "../types/api";
import { fetchWorks } from "../api/api";
import { Box, CircularProgress, Divider, Pagination, Stack, Typography } from "@mui/material";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import NoResults from "../components/NoResults";
import WorkCard from "../components/WorkCard";
import { SearchBarAlternative } from "../components/SearchBar";

const SearchResults = () => {
  const [params] = useSearchParams();
  const title = params.get("title") ?? "";
  const composer = params.get("composer") ?? "";

  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Pagination states
  const MAX_PAGE_SIZE = 10;
  const [count, setCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [results, setResults] = useState<Work[]>([]);

  const handleChange = (e: React.ChangeEvent<unknown>, value: number) => {
    e.preventDefault();
    setCurrentPage(value);
  };

  const loadWorks = async () => {
    setIsLoading(true);

    const response: WorksApiResponse = await fetchWorks(title, composer, currentPage, MAX_PAGE_SIZE);
    console.log(response);
    setResults(response.data ?? []);
    setCount(response.count ?? 0);

    setIsLoading(false);
  }

  useEffect(() => {
    loadWorks();
  }, [params, currentPage]);

  const baseText = title !== "" && composer !== ""
                   ? `Search results for "${title}" by "${composer}"`
                   : title !== ""
                   ? `Search results for "${title}"`
                   : `Search results for works by "${composer}"`;
  const numOfMatchesText = count === 0 
                         ? ""
                         : count === 1
                         ? ` (${count} match)`
                         : ` (${count} matches)`;
  const matchesText = baseText + numOfMatchesText;

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <NavBar />
      <Box
        display="flex"
        flexDirection="column"
        sx={{ flexGrow: 1, padding: "3rem", textAlign: "left" }}
      >
        <SearchBarAlternative />

        <Box sx={{ padding: "1rem" }}>
          <Typography variant="h6" gutterBottom>{matchesText}</Typography>

          <Divider sx={{ mb: "1rem" }} />

          {isLoading
            ? <CircularProgress />
            : results.length == 0
              ? <NoResults />
              : (
                <Box display="flex" flexDirection="column" rowGap={1}>
                  {results.map((work: Work, i: number) => {
                    return <WorkCard work={work} key={i} />
                  })}
                  <Stack>
                    <Pagination
                      count={Math.floor(count / MAX_PAGE_SIZE) + 1}
                      page={currentPage}
                      onChange={handleChange}
                    />
                  </Stack>
                </Box>
              )
          }
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default SearchResults;