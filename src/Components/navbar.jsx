// Navbar.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faUser } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../contexts/AuthContext";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch {
      console.error("Failed to log out");
    }
  };

  return (
    <nav className="mx-auto flex place-items-center justify-between h-12">
      <h2 className="text-red-600 font-semibold text-3xl">MoFlex</h2>
      <div className="md:flex hidden">
        <ul className="text-white flex relative">
          <li className="text-slate-200 cursor-pointer">
            <Link
              to="/home"
              className="text-slate-200 cursor-pointer font-semibold px-3 py-1 relative before:absolute before:h-0.5 before:bg-red-700 before:left-0 before:bottom-0 before:w-0 before:transition-all before:duration-300 hover:before:w-full"
            >
              Home
            </Link>
          </li>
          <li className="text-slate-200 cursor-pointer">
            <Link
              to="/movies"
              className="text-slate-200 cursor-pointer font-semibold px-3 py-1 relative before:absolute before:h-0.5 before:bg-red-700 before:left-0 before:bottom-0 before:w-0 before:transition-all before:duration-300 hover:before:w-full"
            >
              Movies
            </Link>
          </li>
          <li className="text-slate-200 cursor-pointer">
            <Link
              to="/shows"
              className="text-slate-200 cursor-pointer font-semibold px-3 py-1 relative before:absolute before:h-0.5 before:bg-red-700 before:left-0 before:bottom-0 before:w-0 before:transition-all before:duration-300 hover:before:w-full"
            >
              Shows
            </Link>
          </li>
          <li>
            <Link
              to="/search"
              className="text-slate-200 cursor-pointer font-semibold px-3 py-1"
            >
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </Link>
          </li>
          <li className="relative">
            <span
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="text-slate-200 cursor-pointer font-semibold px-3 py-1"
            >
              <FontAwesomeIcon icon={faUser} />
            </span>

            {isMenuOpen && ( // Show logout button if menu is open
              <div className="absolute z-50 w-32 right-0 mt-2 flex flex-col bg-zinc-700 p-1 rounded shadow-lg">
                <Link
                  to="/watchlist"
                  className="text-white px-4 py-1 w-full text-left transition duration-150 hover:bg-red-700"
                >
                  Watch List
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-white px-4 py-1 w-full text-left transition duration-150 hover:bg-red-700"
                >
                  Logout
                </button>
              </div>
            )}
          </li>
        </ul>
      </div>
      {/* Mobile Hamburger Menu */}
      <div className="md:hidden flex items-center">
        <button onClick={() => setIsMenuOpen((prev) => !prev)}>
          <FontAwesomeIcon icon={faUser} className="text-white" />
        </button>
        {isMenuOpen && (
          <div className="absolute top-0 right-0 z-50 w-40 mt-20 flex flex-col bg-zinc-700 p-2 rounded shadow-lg">
            <Link
              to="/home"
              className="text-white px-4 py-1 w-full text-left transition duration-150 hover:bg-red-700"
            >
              Home
            </Link>
            <Link
              to="/movies"
              className="text-white px-4 py-1 w-full text-left transition duration-150 hover:bg-red-700"
            >
              Movies
            </Link>
            <Link
              to="/shows"
              className="text-white px-4 py-1 w-full text-left transition duration-150 hover:bg-red-700"
            >
              Shows
            </Link>
            <Link
              to="/search"
              className="text-white px-4 py-1 w-full text-left transition duration-150 hover:bg-red-700"
            >
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </Link>
            <Link
              to="/watchlist"
              className="text-white px-4 py-1 w-full text-left transition duration-150 hover:bg-red-700"
            >
              Watch List
            </Link>
            <button
              onClick={handleLogout}
              className="text-white px-4 py-1 w-full text-left transition duration-150 hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
