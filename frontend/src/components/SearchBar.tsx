import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
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
        <Typography mb={1}>Search by work title:</Typography>
        <TextField
          id="search-bar"
          label="Enter a work title"
          value={form.title}
          name="title"
          onChange={onChange}
          sx={{ width: 0.9 }}
        />
      </Box>

      <Box flexGrow={1}>
        <Typography mb={1}>Search by composer name:</Typography>
        <TextField
          id="search-bar"
          label="Enter a composer's name"
          value={form.composer}
          name="composer"
          onChange={onChange}
          sx={{ width: 0.9 }}
        />
      </Box>

      <Button type="submit">Search</Button>
    </Box>
  );
};

export default SearchBar;