import React from "react";

function Spinner() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-16 h-16 border-4 border-t-transparent border-white animate-spin rounded-full"></div>
    </div>
  );
}

export default Spinner;
