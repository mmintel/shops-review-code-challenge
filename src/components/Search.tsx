import React, { useState } from "react";
import SearchResult from "./SearchResult";

const Search: React.FC = () => {
  const [search, setSearch] = useState<string | null>(null);

  const handleSearch = (e: React.FormEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value);
  };

  return (
    <div>
      <h1>Search</h1>
      <label htmlFor="search">Search</label>
      <input id="search" onChange={handleSearch} />
      {search && <SearchResult term={search} />}
    </div>
  );
};

export default Search;
