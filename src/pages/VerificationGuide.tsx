import React, { useState } from "react";

const VerificationGuide: React.FC = () => {
  const [checkedItems, setCheckedItems] = useState<{ [key: number]: boolean }>(
    {}
  );

  const steps = [
    "Analyze source's credibility",
    "Assess the timing and context of the event",
    "Cross-reference with reliable sources",
    "Review the evidence supporting the claim",
    "Distinguish between fact and opinion",
  ];

  const handleCheck = (index: number) => {
    setCheckedItems((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <div className="max-w-5xl mx-auto p-6 text-center">
      <h2 className="text-3xl font-bold mb-6">Verification Process Guide</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        {steps.map((step, index) => (
          <label key={index} className="flex items-center space-x-2 text-lg">
            <input
              type="checkbox"
              className="w-5 h-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              checked={checkedItems[index] || false}
              onChange={() => handleCheck(index)}
            />
            <span>{step}</span>
          </label>
        ))}
      </div>

      {/* Additional Resources */}
      <h3 className="text-2xl font-semibold mb-4">Additional Resources</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <img
            src="/news-verification.jpg"
            alt="News Verification"
            className="w-full h-40 object-cover"
          />
          <div className="p-4">
            <h4 className="font-semibold text-lg mb-2">News Verification</h4>
            <p className="text-gray-600 mb-4">
              Learn techniques to verify news effectively.
            </p>
            <button className="bg-blue-600 text-white px-4 py-2 rounded">
              Read More
            </button>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <img
            src="/ai-in-media.jpg"
            alt="AI in Media"
            className="w-full h-40 object-cover"
          />
          <div className="p-4">
            <h4 className="font-semibold text-lg mb-2">AI in Media</h4>
            <p className="text-gray-600 mb-4">
              Explore AI's advancements in news verification.
            </p>
            <button className="bg-blue-600 text-white px-4 py-2 rounded">
              Watch Video
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerificationGuide;
