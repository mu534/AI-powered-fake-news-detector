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
  const placeholderImage = "https://via.placeholder.com/300x200?text=No+Image";
  const [imageSrc, setImageSrc] = useState(image || placeholderImage);
  const [imageLoaded, setImageLoaded] = useState(false);

  console.log(`Checking image for ${publisher}: ${image}`);

  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden">
      {!imageLoaded && (
        <div className="w-full h-40 flex items-center justify-center bg-gray-200">
          <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
        </div>
      )}
      <img
        src={imageSrc}
        alt={claim}
        className={`w-full h-40 object-cover ${
          imageLoaded ? "block" : "hidden"
        }`}
        onLoad={() => {
          console.log(
            `Image loaded successfully for ${publisher}: ${imageSrc}`
          );
          setImageLoaded(true);
        }}
        onError={() => {
          console.error(`Image failed for ${publisher}: ${imageSrc}`);
          setImageSrc(placeholderImage);
        }}
      />
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
