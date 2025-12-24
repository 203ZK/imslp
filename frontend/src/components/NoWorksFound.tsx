import { Box, Typography } from "@mui/material";

const NoWorksFound = () => {
  return (
    <>
      <Box>
        <Typography variant="body1">
          No works were found for this query.
        </Typography>
      </Box>
    </>
  );
};

export default NoWorksFound;