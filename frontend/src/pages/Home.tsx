import { useState } from "react";
import SearchBar from "../components/SearchBar.js";

const Home = () => {
  const [works, setWorks] = useState<any>([]);

  const handleSearch = (results: any[]) => {
    setWorks(results);
  };

  return (
    <>
      <SearchBar handleSearch={handleSearch} />
      {works.map((work: any, i: number) => {
        const route = `/work/${work.id}`;
        return (
          <>
            <a href={route} key={i}>{work.work_title} ({work.composer})</a>
            <br />
          </>
        );
      })}
    </>
  );
};

export default Home;