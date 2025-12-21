import { Button, Card, CardContent, Typography } from "@mui/material";
import type { Work } from "../types/api";
import { useNavigate } from "react-router-dom";

interface WorkCardProps {
  work: Work
}

const cardContentStyle = {
  display: 'flex',
  alignItems: 'center',
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

const WorkCard = ({ work }: WorkCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    const rawParams = {
      id: String(work.id),
      title: work.work_title,
    };

    const searchParams = new URLSearchParams();

    Object.entries(rawParams).forEach(([key, value]) => {
      if (value.trim() !== "") {
        searchParams.set(key, value.trim());
      }
    });

    navigate(`/work?${searchParams.toString()}`);
  };

  return (
    <Card variant="outlined">
      <CardContent sx={cardContentStyle}>
        <Typography variant="body1" fontWeight="bold" flexGrow={0.95}>
          {work.work_title} ({work.composer})
        </Typography>
        <Button sx={buttonStyle} onClick={handleClick}>View scores</Button>
      </CardContent>
    </Card>
  );
};

export default WorkCard;