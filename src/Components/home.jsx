// Home.js
import { useEffect, useState } from "react";
import Navbar from "./navbar";
import axios from "axios";
import MovieList from "./MovieList";
import Spinner from "./spinner"; // Import Spinner

const fetchTrending = async (timeWindow = "day") => {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/trending/all/${timeWindow}?api_key=${process.env.REACT_APP_TMDB_API_KEY}`
  );
  return data?.results;
};

function Home() {
  const [timeWindow, setTimeWindow] = useState("day");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false); // Loading state

  useEffect(() => {
    setLoading(true); // Start loading
    fetchTrending(timeWindow)
      .then((res) => setMovies(res))
      .catch((err) => console.log(err, "Error fetching movies"))
      .finally(() => setLoading(false)); // Stop loading
  }, [timeWindow]);

  const handleTimeWindowChange = (window) => setTimeWindow(window);

  return (
    <div className="w-full min-h-screen bg-black p-5">
      <Navbar />

      <div className="text-white mt-14 flex flex-col sm:flex-row sm:items-center">
        <p className="text-xl font-bold mb-2 sm:mb-0">Trending</p>
        <div className="buttons flex flex-wrap mt-2 sm:mt-0">
          <button
            className={`text-white px-4 py-2 rounded ${
              timeWindow === "day" ? "bg-red-700" : "bg-gray-700"
            } mx-1`}
            onClick={() => handleTimeWindowChange("day")}
          >
            Today
          </button>
          <button
            className={`text-white px-4 py-2 rounded ${
              timeWindow === "week" ? "bg-red-700" : "bg-gray-700"
            } mx-1`}
            onClick={() => handleTimeWindowChange("week")}
          >
            This Week
          </button>
        </div>
      </div>

      {loading ? <Spinner /> : <MovieList movies={movies} />}
    </div>
  );
}

export default Home;
