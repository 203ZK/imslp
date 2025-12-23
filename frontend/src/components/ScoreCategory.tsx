import { Box } from "@mui/material";
import type { Movements } from "../api/utils";
import ScoreMovement from "./ScoreMovement";

interface ScoreCategoryProps {
  movements: Movements;
  handleOpen: (imslpKey: string, link: string) => Promise<void>;
}

const ScoreCategory = ({ movements, handleOpen }: ScoreCategoryProps) => {
  return (
    <Box>
      {Object.keys(movements).map((movement: string) => {
        return (
          <ScoreMovement
            movementTitle={movement}
            arrangements={movements[movement]}
            handleOpen={handleOpen}
          />);
      })}      
    </Box>
  );
};

export default ScoreCategory;