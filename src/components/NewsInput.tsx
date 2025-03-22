import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const NewsInput: React.FC<{ redirectTo?: string }> = ({ redirectTo }) => {
  const [text, setText] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (redirectTo) navigate(`${redirectTo}?text=${encodeURIComponent(text)}`);
  };

  return (
    <div>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full p-2 border rounded mb-4"
        placeholder="input"
      />
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Check News Now
      </button>
    </div>
  );
};

export default NewsInput;
