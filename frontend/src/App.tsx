import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import SearchResults from './pages/SearchResults';
import Work from './pages/Work';

const theme = createTheme({
  typography: {
    fontFamily: [
      'Georgia',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif'
    ].join(','),
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/work" element={<Work />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App
