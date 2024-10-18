import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Spinner from "./spinner";
import Navbar from "./navbar";
import Popup from "./Popup";
import { database, ref, set } from "./firebase";
import { getAuth } from "firebase/auth";

function MovieDetails() {
  const { id, media_type } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [trailer, setTrailer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [popupMessage, setPopupMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const handleAddToWatchlist = async () => {
    const auth = getAuth();
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("User not logged in");

      const watchlistRef = ref(database, `watchlists/${user.uid}/${movie.id}`);

      await set(watchlistRef, movie);
      setPopupMessage("Movie added to watchlist");
      setShowPopup(true);
    } catch (error) {
      console.error("Error adding to watchlist:", error);
    }
  };

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const movieResponse = await axios.get(
          `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}`
        );
        setMovie(movieResponse.data);

        const castResponse = await axios.get(
          `https://api.themoviedb.org/3/${media_type}/${id}/credits?api_key=${process.env.REACT_APP_TMDB_API_KEY}`
        );
        setCast(castResponse.data.cast.slice(0, 10));

        const videosResponse = await axios.get(
          `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${process.env.REACT_APP_TMDB_API_KEY}`
        );
        const trailerData = videosResponse.data.results.find(
          (video) => video.type === "Trailer" && video.site === "YouTube"
        );
        setTrailer(trailerData);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, media_type]);

  if (loading) return <Spinner />;

  if (!movie) return <p className="text-white">No movie found</p>;

  const scorePercentage = Math.round((movie.vote_average / 10) * 100);

  return (
    <div className="w-full min-h-screen bg-black text-white p-5">
      {showPopup && <Popup message={popupMessage} onClose={handlePopupClose} />}
      <Navbar />
      <div
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        }}
        className="w-full bg-cover bg-center relative before:absolute before:w-full before:h-full before:bg-black/80"
      >
        <div className="relative flex flex-col md:flex-row p-5">
          <div className="max-w-xs w-full mb-5 md:mb-0">
            <img
              className="h-96 max-w-full object-cover rounded-lg"
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title || movie.name}
            />
          </div>
          <div className="md:ml-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              {movie.title || movie.name}
            </h1>
            <p className="text-slate-400 text-lg mb-5">
              {movie.release_date || movie.first_air_date}
            </p>
            <p className="text-2xl font-semibold mb-3">Overview</p>
            <p className="text-base mb-5">{movie.overview}</p>
            <div className="mt-5 flex items-center gap-3">
              <div
                className="w-14 h-14 rounded-full bg-gray-700 relative"
                style={{
                  background: `conic-gradient(#22c55e ${scorePercentage}%, #374151 0%)`,
                }}
              >
                <div className="absolute inset-1 bg-black rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">
                    {movie.vote_average.toFixed(1)}
                  </span>
                </div>
              </div>
              <p className="font-semibold">User Score</p>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {movie.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="bg-gray-800 p-1 text-sm font-semibold uppercase"
                >
                  {genre.name}
                </span>
              ))}
            </div>
            <div className="button mt-5">
              <button
                onClick={handleAddToWatchlist}
                className="text-slate-300 p-2 rounded-lg border-slate-300 border font-semibold transition duration-300 hover:border-red-700 hover:bg-red-700"
              >
                Add To WatchList
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="my-14">
        <h1 className="text-3xl font-semibold mb-10">Cast</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5">
          {cast.map((actor) => (
            <div key={actor.id} className="flex flex-col items-center">
              <img
                className="w-24 h-24 object-cover rounded-full"
                src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                alt={actor.name}
                onError={(e) => (e.target.src = "/default-profile.png")}
              />
              <p className="text-center text-sm font-semibold mt-2">
                {actor.name}
              </p>
              <p className="text-center text-xs text-slate-400">
                {actor.character}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="my-14">
        <h1 className="text-3xl font-semibold mb-5">Trailer</h1>
        {trailer ? (
          <iframe
            width="100%"
            height="500"
            src={`https://www.youtube.com/embed/${trailer.key}`}
            title="YouTube Trailer"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
          <p className="text-slate-400">No trailer available</p>
        )}
      </div>
    </div>
  );
}

export default MovieDetails;
