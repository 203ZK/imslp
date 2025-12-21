import {
  Box,
  CircularProgress,
  Divider,
  Snackbar,
  Typography,
  type SnackbarCloseReason
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchMirroredLink, fetchScores, processScoresResponse } from "../api/api";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import ScoreCard from "../components/ScoreCard";
import { SearchBarAlternative } from "../components/SearchBar";
import type { Score, ScoresSupabaseResponse } from "../types/api";

const boxStyles = {
  flexGrow: 1,
  padding: '3rem',
  textAlign: 'left',
};

const Work = () => {
  const [params] = useSearchParams();
  const workId = params.get("id");
  const workTitle = params.get("title") ?? "";
  
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [scores, setScores] = useState<Score[]>([]);

  const loadScores = async (workId: number) => {
    setIsLoading(true);

    const response: ScoresSupabaseResponse = await fetchScores(workId);
    const scores: Score[] = processScoresResponse(response.data ?? []);
    setScores(scores);

    setIsLoading(false);
  };

  const handleOpen = async (imslpKey: string, link: string) => {
    setIsFetching(true);

    try {
      const res = await fetchMirroredLink(imslpKey, link);
      if (res.link) {
        window.open(res.link, "_blank");
      } else {
        setIsFetching(false);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsFetching(false);
    }
  };

  const handleClose = (
    _event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setIsFetching(false);
  };

  useEffect(() => {
    workId && loadScores(Number(workId));
  }, [workId]);

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <NavBar />

      <Box display="flex" flexDirection="column" sx={boxStyles}>
        <SearchBarAlternative />

        <Box sx={{ padding: "1rem" }}>
          <Typography variant="h6" gutterBottom>
            {`List of scores for "${workTitle}":`}
          </Typography>
          <Divider sx={{ mb: "1rem" }} />
          {isLoading
            ? <CircularProgress />
            : scores.map((score: Score, i: number) => {
                return <ScoreCard score={score} key={i} handleClick={handleOpen} />;
              })
            }
        </Box>
      </Box>
      
      <Footer />

      <Snackbar
        open={isFetching}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Fetching from mirrors..."
      />
    </Box>
  );
};

export default Work;