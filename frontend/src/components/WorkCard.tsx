import { Button, Card, CardContent, Typography } from "@mui/material";
import type { Work } from "../types/api";

interface WorkCardProps {
  work: Work
}

const WorkCard = ({ work }: WorkCardProps) => {
  return (
    <Card variant="outlined">
      <CardContent
        sx={{
          display: 'flex',
          alignItems: 'center',
          padding: '16px',
          "&:last-child": {
            paddingBottom: '16px',
          }}}
      >
        <Typography
          variant="body1"
          fontWeight="bold"
          flexGrow={0.95}
        >
          {work.work_title} ({work.composer})
        </Typography>

        <Button
          sx={{
            backgroundColor: '#0e58b3ff',
            color: 'white',
            flexGrow: 0.05,
            textTransform: 'none'
          }}
        >
          View scores
        </Button>
      </CardContent>
    </Card>
  );
};

export default WorkCard;