import { Box, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchScores, processScoresResponse } from "../api/api";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import ScoreCard from "../components/ScoreCard";
import { SearchBarAlternative } from "../components/SearchBar";
import type { Score, ScoresSupabaseResponse } from "../types/api";

const Work = () => {
  const { workId } = useParams();
  
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [scores, setScores] = useState<Score[]>([]);

  const loadScores = async (workId: number) => {
    setIsLoading(true);

    const response: ScoresSupabaseResponse = await fetchScores(workId);
    const scores: Score[] = processScoresResponse(response.data ?? []);
    setScores(scores);

    setIsLoading(false);
  };

  // const handleDownload = async (imslpKey: string, link: string) => {
  //   try {
  //     const res = await fetchMirroredLink(imslpKey, link) ?? '';
  //     if (res) {
  //       window.open(res.link, "_blank");
  //     }
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  useEffect(() => {
    workId && loadScores(Number(workId));
  }, [workId]);

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

          {isLoading
            ? <CircularProgress />
            : scores.map((score: Score, i: number) => {
                return (
                  <ScoreCard score={score} key={i} />
                  // <TableRow key={i}>
                  //   <TableCell>{i + 1}</TableCell>
                  //   <TableCell>
                  //     <Button onClick={() => { }}>
                  //       <Typography>{score.file_info?.file_link}</Typography>
                  //     </Button>
                  //   </TableCell>
                  // </TableRow>
                );
              })
            }
            {/* <Table>
              <TableBody>
          
              </TableBody>
            </Table> */}
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default Work;