import React from "react";

export default function LoadingScreen({ message = "Loading..." }) {
  return (
    <div className="flex flex-col items-center justify-center p-6">
      {/* Spinner Animation */}
      <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>

      {/* Message */}
      <p className="mt-4 text-gray-600 font-medium animate-pulse">{message}</p>
    </div>
  );
}
