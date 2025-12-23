import { Box, Typography } from "@mui/material";
import type { Arrangements } from "../api/utils";
import ScoreArrangement from "./ScoreArrangements";

interface ScoreMovementProps {
  movementTitle: string;
  arrangements: Arrangements;
  handleOpen: (imslpKey: string, link: string) => Promise<void>;
}

const titleStyles = {
  fontWeight: 'bold', 
  mb: '0.5rem',
};

const ScoreMovement = ({ movementTitle, arrangements, handleOpen }: ScoreMovementProps) => {
  console.log(arrangements);
  return (
    
    <Box mt='1.5rem'>
      {movementTitle !== "null" &&
        <Typography variant="h6" sx={titleStyles}>{movementTitle}</Typography>
      }

      {Object.keys(arrangements).map((arrangement: string) => {
        return (
          <ScoreArrangement
            arrangementTitle={arrangement}
            scores={arrangements[arrangement]}
            handleOpen={handleOpen}
          />
        ); 
      })}      
    </Box>
  );
};

export default ScoreMovement;