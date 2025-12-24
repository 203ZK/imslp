import { Button, Card, CardContent, Typography } from "@mui/material";
import type { Work } from "../types/api";
import { useNavigate } from "react-router-dom";
import { Visibility } from "@mui/icons-material";

interface WorkCardProps {
  work: Work
}

const cardContentStyle = {
  display: 'flex',
  gap: 2,
  alignItems: 'center',
  padding: '16px',
  "&:last-child": {
    paddingBottom: '16px',
  }
};

const titleStyles = {
  fontWeight: 'bold',
  flexGrow: 1,
  minWidth: 0,
};

const buttonStyles = {
  flexShrink: 0,
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
        <Typography variant="body1" sx={titleStyles}>
          {work.work_title} ({work.composer})
        </Typography>
        <Button sx={buttonStyles} onClick={handleClick}>
          <Visibility />
        </Button>
      </CardContent>
    </Card>
  );
};

export default WorkCard;