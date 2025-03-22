import React from "react";
import NewsInput from "../components/NewsInput";

const Verify: React.FC = () => {
  return (
    <div className="max-w-lg mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Fake News</h2>
      <NewsInput redirectTo="/results" />
    </div>
  );
};

export default Verify;
