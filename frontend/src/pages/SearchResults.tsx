import { Box, CircularProgress, Divider, Pagination, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchWorks } from "../api/api";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import NoWorksFound from "../components/NoWorksFound";
import { SearchBarAlternative } from "../components/SearchBar";
import WorkCard from "../components/WorkCard";
import type { Work, WorksSupabaseResponse } from "../types/api";

const boxStyles = {
  flexGrow: 1,
  padding: '2rem',
  textAlign: 'left',
};

const resultsStyles = {
  mb: '0.8rem',
  color: 'gray',
  fontStyle: 'italic',
};

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

    const response: WorksSupabaseResponse = await fetchWorks(title, composer, currentPage, MAX_PAGE_SIZE);
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

  const resultsStart = Math.min((currentPage - 1) * MAX_PAGE_SIZE + 1, count);
  const resultsEnd = Math.min(currentPage * MAX_PAGE_SIZE, count);

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <NavBar />
      <Box display="flex" flexDirection="column" sx={boxStyles}>
        <SearchBarAlternative />

        <Box sx={{ padding: "1rem" }}>
          <Typography variant="h6" gutterBottom>{matchesText}</Typography>
          <Divider sx={{ mb: "1rem" }} />

          <Typography variant="body2" sx={resultsStyles}>
            Showing results {resultsStart} - {resultsEnd} of {count}
          </Typography>

          {isLoading
            ? <CircularProgress />
            : results.length == 0
              ? <NoWorksFound />
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