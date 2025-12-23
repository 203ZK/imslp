import { Box, Button, Card, CardContent, Collapse, Typography } from "@mui/material";
import { useState } from "react";
import type { FileInfo, Score } from "../types/api";
import DialogBox from "./DialogBox";

interface ScoreCardProps {
  score: Score;
  handleOpen: (imslpKey: string, link: string) => Promise<void>;
}

const cardContentStyles = {
  padding: '16px',
  "&:last-child": {
    paddingBottom: '16px',
  }
};

const boxStyles = {
  display: 'flex',
  mt: '0.1rem',
};

const titleStyles = {
  fontWeight: 'bold',
  flexGrow: 0.95,
  lineHeight: '2rem',
};

const buttonStyles = {
  backgroundColor: '#0e58b3ff',
  color: 'white',
  flexGrow: 0.05,
  textTransform: 'none',
};

const fieldStyles = {
  lineHeight: '1.4rem',
};

const detailsStyles = {
  lineHeight: '1.8rem',
  cursor: 'pointer',
  color: 'primary.main',
  width: 'fit-content',
  flexGrow: 0.2,
  "&:hover": {
    textDecoration: 'underline',
  },
};

const flagStyles = {
  textAlign: 'right',
  cursor: 'pointer',
  color: 'primary.main',
  width: 'fit-content',
  flexGrow: 0.8,
  "&:hover": {
    textDecoration: 'underline',
  },
};

const ScoreCard = ({ score, handleOpen }: ScoreCardProps) => {
  const file_info: FileInfo | undefined = score.file_info;
  const source_info: Record<string, any> = score.source_info ?? {};

  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  

  const onClick = () => handleOpen(String(file_info?.imslp_key), String(file_info?.file_link));

  const onFlag = () => {
    setDialogOpen(true);
  }

  return (
    <Card variant="outlined" sx={{ mb: 1 }}>
      <CardContent sx={cardContentStyles}>

        <Box sx={boxStyles}>
          <Typography variant="body1" sx={titleStyles}>
            {`${file_info?.file_title} (#${file_info?.imslp_key})`}
          </Typography>
          
          <Button onClick={onClick} sx={buttonStyles}>Open file</Button>
        </Box>

        <Typography variant="body2" sx={fieldStyles}>
          <b>File size</b>{`: ${file_info?.file_size}`}
        </Typography>

        <Typography variant="body2" sx={fieldStyles}>
          <b>Uploaded by</b>{`: ${file_info?.uploader}`}
        </Typography>

        <Collapse in={showDetails}>
          {Object.keys(source_info).map(key => {
            const value = source_info[key];
            return (
              <Typography variant="body2" sx={fieldStyles}>
                <b>{`${key}`}</b>{`: ${value}`}
              </Typography>
            );
          })}
        </Collapse>

        <Box sx={boxStyles}>
          <Typography
            variant="body2"
            sx={detailsStyles}
            onClick={() => setShowDetails((v) => !v)}
          >
            {showDetails ? "Hide details" : "Show details"}
          </Typography>

          <Typography
            variant="body2"
            sx={flagStyles}
            onClick={onFlag}
          >
            Spot an error with the details of the score? Flag it here.
          </Typography>
        </Box>
      </CardContent>

      <DialogBox
        workId={score.work_id ?? 0}
        scoreTitle={`${file_info?.file_title} (#${file_info?.imslp_key})`}
        scoreId={score.id ?? 0}
        setOpen={setDialogOpen}
        isOpen={dialogOpen}
      />

    </Card>
  );
};

export default ScoreCard;