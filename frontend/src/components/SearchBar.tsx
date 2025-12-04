import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { fetchWorks } from '../api/api';
import type { Work, WorksApiResponse } from '../types/api';

interface SearchBarProps {
  handleSearch: (results: Work[]) => void,
};

const SearchBar = ({ handleSearch }: SearchBarProps) => {
  const [input, setInput] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const works: WorksApiResponse = await fetchWorks(input);
      handleSearch(works.data ?? []);
      setInput('');
    } catch (error) {
      console.error();
    }
  }

  return (
    <Box
      component="form"
      sx={{ '& > :not(style)': { m: 1 } }}
      noValidate
      autoComplete="off"
      display="flex"
      justifyContent="center"
      onSubmit={handleSubmit}
    >
      <TextField
        id="search-bar"
        label="Enter a search term..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        sx={{ width: 0.8 }}
      />
      <Button type="submit">Search</Button>
    </Box>
  );
};

export default SearchBar;