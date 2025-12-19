import { Button, Card, CardContent, Typography } from "@mui/material";
import type { FileInfo, Score } from "../types/api";

interface ScoreCardProps {
  score: Score;
}

const cardContentStyle = {
  padding: '16px',
  "&:last-child": {
    paddingBottom: '16px',
  }
};

const buttonStyle = {
  backgroundColor: '#0e58b3ff',
  color: 'white',
  flexGrow: 0.05,
  textTransform: 'none'
};

const ScoreCard = ({ score }: ScoreCardProps) => {
  const file_info: FileInfo | undefined = score.file_info;
  const source_info: Record<string, any> = score.source_info ?? {};

  return (
    <Card variant="outlined">
      <CardContent sx={cardContentStyle}>
        <Typography variant="body1" fontWeight="bold" flexGrow={0.95}>
          {`${file_info?.file_title} (#${file_info?.imslp_key})`}
        </Typography>
        <Typography variant="body2">
          {`File size: ${file_info?.file_size}`}
        </Typography>
        <Typography variant="body2">
          {`Uploaded by: ${file_info?.uploader}`}
        </Typography>
        {Object.keys(source_info).map(key => {
          const value = source_info[key];
          return (
            <Typography variant="body2">
              {`${key}: ${value}`}
            </Typography>
          );
        })}
        <Button sx={buttonStyle}>Open file</Button>
      </CardContent>
    </Card>
  );
};

export default ScoreCard;