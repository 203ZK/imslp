import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { fetchWorks } from '../api/api';

interface SearchBarProps {
  handleSearch: (results: any[]) => void,
};

const SearchBar = ({ handleSearch }: SearchBarProps) => {
  const [input, setInput] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetchWorks(input);
      handleSearch(res);
      setInput('');
    } catch (error) {
      console.error("WTV");
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
      />
      <Button type="submit">Search</Button>
    </Box>
  );
};

export default SearchBar;