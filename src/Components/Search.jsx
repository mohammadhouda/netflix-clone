import React, { useState } from "react";
import axios from "axios";
import Navbar from "./navbar";
import MovieList from "./MovieList";

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3/search/movie";

function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim() === "") {
      setResults([]);
      return;
    }

    try {
      const response = await axios.get(BASE_URL, {
        params: {
          api_key: API_KEY,
          query: value,
        },
      });
      setResults(response.data.results);
    } catch (err) {
      setError("Failed to fetch results. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <Navbar />

      <h2 className="text-3xl font-bold mb-6">Search Movies</h2>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search for a movie..."
        value={query}
        onChange={handleSearch}
        className="bg-zinc-700 p-2 w-full max-w-md outline-none text-white rounded mb-6"
      />

      {/* Error Message */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Display Results using MovieList */}
      {results.length > 0 ? (
        <MovieList movies={results} />
      ) : (
        query && <p className="text-center">No results found.</p>
      )}
    </div>
  );
}

export default Search;
