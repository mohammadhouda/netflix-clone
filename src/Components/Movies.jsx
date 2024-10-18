import Navbar from "./navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import MovieList from "./MovieList";
import Spinner from "./spinner";

function Movies() {
  const [category, setCategory] = useState("popular");
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true); // Start loading
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${category}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&page=${page}`
        );
        setMovies(response.data.results);
        setTotalPages(response.data.total_pages);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchMovies();
  }, [category, page]);

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    setPage(1);
  };

  const handleNextPage = () => {
    if (page < totalPages) setPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    if (page > 1) setPage((prevPage) => prevPage - 1);
  };

  return (
    <div className="w-full min-h-screen bg-black p-5">
      <Navbar />

      <div className="flex justify-center space-x-4 my-5">
        <button
          className={`px-4 py-2 font-semibold text-white rounded ${
            category === "popular" ? "bg-red-700" : "bg-gray-700"
          }`}
          onClick={() => handleCategoryChange("popular")}
        >
          Popular
        </button>
        <button
          className={`px-4 py-2 font-semibold text-white rounded ${
            category === "top_rated" ? "bg-red-700" : "bg-gray-700"
          }`}
          onClick={() => handleCategoryChange("top_rated")}
        >
          Top Rated
        </button>
      </div>

      {loading ? <Spinner /> : <MovieList movies={movies} />}

      <div className="flex justify-center space-x-4 mt-10">
        <button
          className="px-4 py-2 bg-gray-700 text-white rounded transition duration-300 hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
          onClick={handlePrevPage}
          disabled={page === 1}
        >
          Previous
        </button>
        <button
          className="px-4 py-2 bg-gray-700 text-white transition duration-300 hover:bg-red-700 rounded disabled:opacity-50"
          onClick={handleNextPage}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Movies;
