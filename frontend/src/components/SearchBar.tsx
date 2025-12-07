import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const SearchBar = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    "title": "",
    "composer": ""
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const searchParams = new URLSearchParams();

    Object.entries(form).forEach(([key, value]) => {
      if (value.trim() !== "") {
        searchParams.set(key, value.trim());
      }
    });

    navigate(`/search?${searchParams.toString()}`);
  }

  return (
    <Box
      component="form"
      sx={{ '& > :not(style)': { mt: 1 } }}
      noValidate
      autoComplete="off"
      display="flex"
      justifyContent="center"
      onSubmit={handleSubmit}
    >
      <Box flexGrow={1}>
        <TextField
          id="search-bar"
          label="Search by work title..."
          value={form.title}
          name="title"
          onChange={onChange}
          sx={{ width: 0.95 }}
        />
      </Box>

      <Box flexGrow={1}>
        <TextField
          id="search-bar"
          label="Search by composer's name..."
          value={form.composer}
          name="composer"
          onChange={onChange}
          sx={{ width: 0.95 }}
        />
      </Box>

      <Button type="submit">Search</Button>
    </Box>
  );
};

export const SearchBarAlternative = () => {
  return (
    <Box
      sx={{
        padding: "1rem",
        border: 2,
        borderColor: "#3156a5ff",
        borderRadius: "12px",
        marginBottom: "1rem",
      }}
    >
      <Typography variant="body1" gutterBottom>Search for more works:</Typography>
      <SearchBar />
    </Box>
  );
};
