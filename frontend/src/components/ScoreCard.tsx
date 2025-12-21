import { Box, Button, Card, CardContent, Collapse, Typography } from "@mui/material";
import type { FileInfo, Score } from "../types/api";
import { useState } from "react";

interface ScoreCardProps {
  score: Score;
  handleClick: (imslpKey: string, link: string) => Promise<void>;
}

const cardContentStyles = {
  padding: '16px',
  "&:last-child": {
    paddingBottom: '16px',
  }
};

const boxStyles = {
  display: 'flex',
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
  "&:hover": {
    textDecoration: 'underline',
  },
};

const ScoreCard = ({ score, handleClick }: ScoreCardProps) => {
  const file_info: FileInfo | undefined = score.file_info;
  const source_info: Record<string, any> = score.source_info ?? {};

  const [showDetails, setShowDetails] = useState<boolean>(false);

  const onClick = () => handleClick(String(file_info?.imslp_key), String(file_info?.file_link));

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

        <Typography
          variant="body2"
          sx={detailsStyles}
          onClick={() => setShowDetails((v) => !v)}
        >
          {showDetails ? "Hide details" : "Show details"}
        </Typography>

      </CardContent>
    </Card>
  );
};

export default ScoreCard;