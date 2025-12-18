import { Button, CircularProgress, Table, TableBody, TableCell, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchScores, processScoresResponse } from "../api/api";
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

    console.log(scores);

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

  return isLoading 
    ? <CircularProgress /> 
    : (
      <Table>
        <TableBody>
          {scores.map((score: Score, i: number) => {
            return (
              <TableRow>
                <TableCell>{i + 1}</TableCell>
                <TableCell>
                  <Button onClick={() => {}} key={i}>
                    <Typography>{score.link}</Typography>
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    );
};

export default Work;