import React, { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";

interface NewsInputProps {
  redirectTo: string;
}

const NewsInput: React.FC<NewsInputProps> = ({ redirectTo }) => {
  const [text, setText] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (text.trim()) {
      navigate(`${redirectTo}?text=${encodeURIComponent(text)}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <textarea
        value={text}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          setText(e.target.value)
        }
        placeholder="Paste the news article or claim here..."
        className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-32 resize-none"
      />
      <button
        type="submit"
        className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
      >
        Verify
      </button>
    </form>
  );
};

export default NewsInput;
