import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./signup";
import Login from "./login";
import { AuthProvider } from "../contexts/AuthContext";
import Home from "./home";
import ProtectedRoute from "./ProtectedRoute";
import Movies from "./Movies";
import Shows from "./Shows";
import MovieDetails from "./MovieDetails";
import Search from "./Search";
import Watchlist from "./Watchlist";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/movies"
            element={
              <ProtectedRoute>
                <Movies />
              </ProtectedRoute>
            }
          />
          <Route
            path="/:media_type/:id"
            element={
              <ProtectedRoute>
                <MovieDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/shows"
            element={
              <ProtectedRoute>
                <Shows />
              </ProtectedRoute>
            }
          />

          <Route
            path="/search"
            element={
              <ProtectedRoute>
                <Search />
              </ProtectedRoute>
            }
          />
          <Route
            path="/watchlist"
            element={
              <ProtectedRoute>
                <Watchlist />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
