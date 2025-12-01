import { Button, CircularProgress, Table, TableBody, TableCell, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMirroredLink, fetchScores } from "../api/api";
import type { Score } from "../types/api";

const Work = () => {
  const { id } = useParams();
  
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [scores, setScores] = useState<any>([]);

  const loadScores = async () => {
    setIsLoading(true);

    try {
      const res = await fetchScores(Number(id) ?? 0);
      if (res) {
        setScores(res.scores);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = async (imslpKey: string, link: string) => {
    try {
      const res = await fetchMirroredLink(imslpKey, link) ?? '';
      if (res) {
        window.open(res.link, "_blank");
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    loadScores();
  }, [id]);

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
                  <Button onClick={() => handleDownload(score.imslp_key, score.link)} key={i}>
                    {score.link}
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