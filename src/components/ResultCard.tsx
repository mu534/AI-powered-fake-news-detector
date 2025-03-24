import React from "react";

const ResultCard: React.FC<{
  label: string;
  confidence: number;
  source: string;
  image: string;
  url?: string;
}> = ({ label, confidence, source, image, url }) => {
  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden">
      <img src={image} alt={label} className="w-full h-40 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-bold mb-1">{label}</h3>
        <p className="text-sm text-gray-600 mb-2">
          Confidence Score: {(confidence * 100).toFixed(0)}%
        </p>
        <p className="text-sm text-gray-500">Source: {source}</p>
        {url ? (
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
