import Navbar from "./navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import MovieList from "./MovieList";

function Shows() {
  const [category, setCategory] = useState("popular");
  const [page, setPage] = useState(1);
  const [tv, setTv] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/tv/${category}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&page=${page}`
        );
        setTv(response.data.results);
        setTotalPages(response.data.total_pages);
      } catch (error) {
        console.error("Error fetching tv:", error);
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

      <MovieList tv={tv} />

      <div className="flex justify-center space-x-4 mt-10">
        <button
          className="px-4 py-2 bg-gray-700 transition duration-300 hover:bg-red-700 text-white rounded  disabled:opacity-50"
          onClick={handlePrevPage}
          disabled={page === 1}
        >
          Previous
        </button>
        <button
          className="px-4 py-2 bg-gray-700 text-white rounded transition duration-300 hover:bg-red-700 disabled:opacity-50"
          onClick={handleNextPage}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Shows;
