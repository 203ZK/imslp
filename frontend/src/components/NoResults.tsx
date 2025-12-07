import { Card, Typography } from "@mui/material";

const NoResults = () => {
  return (
    <Card>
      <Typography>No results were found. Try checking your query for typos.</Typography>
    </Card>
  );
};

export default NoResults;