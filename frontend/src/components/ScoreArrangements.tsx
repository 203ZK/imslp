import { Box, Typography } from "@mui/material";
import type { Score } from "../types/api";
import ScoreCard from "./ScoreCard";

interface ScoreArrangementProps {
  arrangementTitle: string;
  scores: Score[];
  handleOpen: (imslpKey: string, link: string) => Promise<void>;
}

const titleStyles = {
  fontWeight: 'bold',
  mt: '1rem',
  mb: '0.7rem',
};

const ScoreArrangement = ({ arrangementTitle, scores, handleOpen }: ScoreArrangementProps) => {
  return (
    <Box>
      {arrangementTitle !== "null" &&
        <Typography variant="body1" sx={titleStyles}>{arrangementTitle}</Typography>
      }

      {scores.map((score: Score) => {
        return <ScoreCard score={score} handleOpen={handleOpen} />;
      })}      
    </Box>
  );
};

export default ScoreArrangement;