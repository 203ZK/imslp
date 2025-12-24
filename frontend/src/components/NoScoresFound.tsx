import { Box, Typography } from "@mui/material";
import { useState } from "react";
import DialogBox from "./DialogBox";
import { SCORES_NOT_FOUND } from "../constants/values";

interface NoScoresFoundProps {
  workId: number;
  workTitle: string;
}

const flagStyles = {
  mt: '0.5rem',
  cursor: 'pointer',
  color: 'primary.main',
  width: 'fit-content',
  "&:hover": {
    textDecoration: 'underline',
  },
};

const NoScoresFound = ({ workId, workTitle }: NoScoresFoundProps) => {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const onFlag = () => {
    setDialogOpen(true);
  }

  return (
    <>
      <Box>
        <Typography variant="body1">
          No scores were found for this work.
        </Typography>
        <Typography variant="body1" sx={flagStyles} onClick={onFlag}>
          Suspect this is an error? Consider flagging it by clicking here.
        </Typography>
      </Box>

      <DialogBox
        errorTitle={SCORES_NOT_FOUND}
        workId={workId}
        title={workTitle}
        setOpen={setDialogOpen}
        isOpen={dialogOpen}
      />
    </>
  );
};

export default NoScoresFound;