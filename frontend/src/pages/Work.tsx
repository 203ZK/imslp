import {
  Alert,
  Box,
  CircularProgress,
  Divider,
  Snackbar,
  Typography,
  type SnackbarCloseReason
} from "@mui/material";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchMirroredLink, fetchScores } from "../api/api";
import { processScoresResponse, type Categories } from "../api/utils";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import ScoreTabs from "../components/ScoreTabs";
import { SearchBarAlternative } from "../components/SearchBar";
import type { ScoresSupabaseResponse } from "../types/api";

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
  const [scores, setScores] = useState<Categories>({});

  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [hasSuccessfullyFetched, setHasSuccessfullyFetched] = useState<boolean>(false);
  const [hasErrorFetching, setHasErrorFetching] = useState<boolean>(false);

  const handleClose = (close: any) => (
    _event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    close(false);
  };

  const handleOpen = async (imslpKey: string, link: string) => {
    setIsFetching(true);

    try {
      const res = await fetchMirroredLink(imslpKey, link);
      if (res.link) {
        setHasSuccessfullyFetched(true);
        window.open(res.link, "_blank");
      } else {
        setHasErrorFetching(true);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsFetching(false);
    }
  };

  const loadScores = async (workId: number) => {
    setIsLoading(true);

    const response: ScoresSupabaseResponse = await fetchScores(workId);
    console.log(response);
    const scores = processScoresResponse(response.data ?? []);
    setScores(scores);

    setIsLoading(false);
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
          <Typography variant="h6" gutterBottom>{`List of scores for "${workTitle}":`}</Typography>
          <Divider sx={{ mb: "1rem" }} />
          {isLoading
            ? <CircularProgress />
            : <ScoreTabs scores={scores} handleOpen={handleOpen} />}
        </Box>
      </Box>

      <Footer />

      <Snackbar
        open={isFetching}
        message={"Fetching from mirrors..."}
      />

      <Snackbar
        open={hasSuccessfullyFetched}
        autoHideDuration={6000}
        onClose={handleClose(setHasSuccessfullyFetched)}
      >
        <Alert
          onClose={handleClose(setHasSuccessfullyFetched)}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Successfully fetched score!
        </Alert>
      </Snackbar>

      <Snackbar
        open={hasErrorFetching}
        autoHideDuration={6000}
        onClose={handleClose(setHasErrorFetching)}
      >
        <Alert
          onClose={handleClose(setHasErrorFetching)}
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Error fetching score, please try again.
        </Alert>
      </Snackbar>

    </Box>
  );
};

export default Work;