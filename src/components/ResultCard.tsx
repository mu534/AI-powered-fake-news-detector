import React, { useState } from "react";

const ResultCard: React.FC<{
  claim: string;
  claimant: string;
  date: string;
  publisher: string;
  rating: string;
  url: string;
  image: string | null;
}> = ({ claim, claimant, date, publisher, rating, url, image }) => {
  const placeholderImage = "https://via.placeholder.com/300x200";
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  // Use the provided image initially, switch to placeholder on error
  const [currentImage, setCurrentImage] = useState(image || placeholderImage);

  console.log(`Attempting to load image for ${publisher}: ${currentImage}`);

  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden">
      {imageLoading && (
        <div className="w-full h-40 flex items-center justify-center bg-gray-200">
          <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
        </div>
      )}
      <img
        src={currentImage}
        alt={claim}
        className={`w-full h-40 object-cover ${
          imageLoading ? "hidden" : "block"
        } image-no-icon`}
        onLoad={() => {
          console.log(
            `Image loaded successfully for ${publisher}: ${currentImage}`
          );
          setImageLoading(false);
        }}
        onError={() => {
          console.error(
            `Failed to load image for ${publisher}: ${currentImage}`
          );
          if (currentImage !== placeholderImage) {
            // Switch to placeholder if the current image fails
            setCurrentImage(placeholderImage);
          } else {
            // If the placeholder also fails, stop loading
            setImageLoading(false);
            setImageError(true);
          }
        }}
      />
      {imageError && (
        <div className="w-full h-40 flex items-center justify-center bg-gray-200 text-gray-500">
          <span>Image Unavailable</span>
        </div>
      )}
      <div className="p-4">
        <h3 className="text-lg font-bold mb-1">{claim}</h3>
        <p className="text-sm text-gray-600 mb-1">
          <strong>Claimant:</strong> {claimant}
        </p>
        <p className="text-sm text-gray-600 mb-1">
          <strong>Date:</strong> {date}
        </p>
        <p className="text-sm text-gray-600 mb-1">
          <strong>Publisher:</strong> {publisher}
        </p>
        <p className="text-sm text-gray-600 mb-2">
          <strong>Rating:</strong> {rating}
        </p>
        {url && url !== "#" ? (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="block mt-3 text-blue-600 font-semibold hover:underline"
          >
            View Details
          </a>
        ) : (
          <span className="block mt-3 text-gray-500">Details Unavailable</span>
        )}
      </div>
    </div>
  );
};

export default ResultCard;
