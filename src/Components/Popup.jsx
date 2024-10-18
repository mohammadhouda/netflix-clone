// Popup.js
import React, { useEffect } from "react";

const Popup = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-4 right-4 flex items-center justify-center z-50">
      <div className="bg-red-700/75 shadow-lg p-3 text-center rounded-lg">
        <p className="text-lg font-semibold text-white">{message}</p>
      </div>
    </div>
  );
};

export default Popup;
