import { Button, Card, Typography } from "@mui/material";
import type { Work } from "../types/api";

interface WorkCardProps {
  work: Work
}

const WorkCard = ({ work }: WorkCardProps) => {
  return (
    <Card>
      <Typography variant="h6" fontWeight="bold">{work.work_title}</Typography>
      <Typography variant="body1">Composer: {work.composer}</Typography>
      <Button>View scores</Button>
    </Card>
  );
};

export default WorkCard;