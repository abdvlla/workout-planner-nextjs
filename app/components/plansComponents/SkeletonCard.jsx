import React from "react";

const SkeletonCard = () => {
  return (
    <div className="bg-gray-200 animate-pulse rounded-lg p-4 h-48">
      <div className="h-8 bg-gray-300 rounded mb-4"></div>
      <div className="h-4 bg-gray-300 rounded mb-2"></div>
      <div className="h-4 bg-gray-300 rounded mb-2"></div>
      <div className="h-4 bg-gray-300 rounded"></div>
    </div>
  );
};

export default SkeletonCard;
