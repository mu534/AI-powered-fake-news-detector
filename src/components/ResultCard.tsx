import React from "react";

const ResultCard: React.FC<{
  label: string;
  confidence: number;
  source: string;
}> = ({ label, confidence, source }) => {
  return (
    <div className="p-4 bg-gray-100 rounded mb-4">
      <p className="font-semibold">{label}</p>
      <p>Confidence Score: {(confidence * 100).toFixed(0)}%</p>
      <p>Source: {source}</p>
      <a href="#" className="text-blue-500">
        View Details
      </a>
    </div>
  );
};

export default ResultCard;
