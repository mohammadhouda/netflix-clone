import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function PrivateRoute({ children, redirectTo = "/login" }) {
  const { currentUser, loading } = useAuth();
  const location = useLocation(); // To capture the current location

  // If the app is still determining authentication status, show a loading spinner
  if (loading) {
    return <div className="text-center text-white">Loading...</div>;
  }

  // If the user is not authenticated, redirect to login (or a custom page)
  if (!currentUser) {
    return <Navigate to={redirectTo} state={{ from: location }} />;
  }

  // If the user is authenticated, allow access to the protected route
  return children;
}

export default PrivateRoute;
