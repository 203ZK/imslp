import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import type { Work, WorksApiResponse } from "../types/api";
import { fetchWorks } from "../api/api";
import { CircularProgress, Typography } from "@mui/material";
import NavBar from "../components/NavBar";

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
    }

    setIsLoading(true);
    loadWorks();
    setIsLoading(false);
  }, [params]);

  if (isLoading) return <CircularProgress />;

  return (
    <>
      <NavBar />
      {results.map((work: Work, i: number) => {
        return <Typography key={i}>{work.work_title}</Typography>;
      })}
    </>
  );
};

export default SearchResults;