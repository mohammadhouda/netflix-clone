import { getTheYear } from "../contexts/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function MovieList({ movies = [], tv = [] }) {
  const items = movies.length > 0 ? movies : tv; // Use the available data

  return (
    <div
      className="w-full grid gap-4 sm:gap-6 mt-9"
      style={{ gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}
    >
      {items.length > 0 ? (
        items.map((item) => (
          <Link
            key={item.id}
            to={`/${item.media_type || (tv.length ? "tv" : "movie")}/${
              item.id
            }`}
          >
            <div className="w-full h-80 overflow-hidden bg-zinc-800 shadow-lg rounded-lg relative group transition-transform hover:scale-105 hover:cursor-pointer">
              <img
                src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                alt={item.title || item.name}
                className="w-full h-full object-cover transition duration-300 group-hover:grayscale"
              />
              <div className="info absolute bottom-0 bg-black bg-opacity-75 w-full opacity-0 text-white transition-opacity duration-300 ease-in-out group-hover:opacity-100">
                <p className="text-center text-lg">{item.title || item.name}</p>
                <p className="text-center my-2 text-xs">
                  {getTheYear(item.first_air_date || item.release_date)}
                </p>
                <div className="flex items-center justify-center gap-1">
                  <FontAwesomeIcon
                    className="text-yellow-400 text-sm"
                    icon={faStar}
                  />
                  <p>{item.vote_average}</p>
                </div>
              </div>
            </div>
          </Link>
        ))
      ) : (
        <p className="text-white">No items found.</p>
      )}
    </div>
  );
}

export default MovieList;
