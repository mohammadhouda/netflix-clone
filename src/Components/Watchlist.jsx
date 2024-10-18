import { useEffect, useState } from "react";
import { database, ref, onValue, remove } from "./firebase";
import Navbar from "./navbar";
import Popup from "./Popup";
import { getAuth } from "firebase/auth";

function Watchlist() {
  const [watchlist, setWatchlist] = useState([]);
  const auth = getAuth();
  const [popupMessage, setPopupMessage] = useState(""); // Popup message state
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const watchlistRef = ref(database, `watchlists/${user.uid}`);
    const unsubscribe = onValue(watchlistRef, (snapshot) => {
      const data = snapshot.val();
      const movies = data
        ? Object.entries(data).map(([key, value]) => ({ id: key, ...value }))
        : [];
      setWatchlist(movies);
    });

    return () => unsubscribe();
  }, []);

  const handleRemove = async (id) => {
    try {
      const user = auth.currentUser;
      if (!user) return alert("User not logged in");

      const movieRef = ref(database, `watchlists/${user.uid}/${id}`);
      await remove(movieRef);
      setPopupMessage("Movie removed from watchlist");
      setShowPopup(true);
    } catch (error) {}
  };

  const handlePopupClose = () => {
    setShowPopup(false); // Close the popup
  };

  return (
    <div className="w-full min-h-screen bg-black text-white p-5">
      {showPopup && <Popup message={popupMessage} onClose={handlePopupClose} />}
      <Navbar />
      <h1 className="text-3xl font-bold mb-5">My Watchlist</h1>
      {watchlist.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
          {watchlist.map((movie) => (
            <div
              key={movie.id}
              className="bg-zinc-800 h-96  rounded-lg relative"
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title || movie.name}
                className=" w-full h-full transition duration-300 group-hover:grayscale"
              />
              <div className="absolute bottom-0 m-1">
                <h2 className="text-xl font-semibold">
                  {movie.title || movie.name}
                </h2>
                <button
                  onClick={() => handleRemove(movie.id)}
                  className="mt-2 p-2 bg-red-700 text-white rounded-lg"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No movies in your watchlist</p>
      )}
    </div>
  );
}

export default Watchlist;
