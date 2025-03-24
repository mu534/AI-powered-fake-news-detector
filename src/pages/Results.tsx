import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { verifyNews } from "../services/api";
import ResultCard from "../components/ResultCard";

const Results: React.FC = () => {
  interface Result {
    label: string;
    confidence: number;
    source: string;
    image: string;
  }

  const [results, setResults] = useState<Result[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const location = useLocation();
  const text = new URLSearchParams(location.search).get("text") || "";

  useEffect(() => {
    const fetchResults = async () => {
      if (!text) {
        setError("No text provided for verification.");
        setLoading(false);
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const data = await verifyNews(text);
        setResults([data]);
      } catch (error: unknown) {
        console.error("Error fetching AI results:", error);
        setError(
          error instanceof Error
            ? error.message
            : "An error occurred while fetching results."
        );
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, [text]);

  return (
    <div className="max-w-6xl mx-auto p-6 mb-20 mt-20">
      <h2 className="text-3xl font-bold text-center mb-6">
        AI News Verification Results
      </h2>

      {loading ? (
        <div className="flex flex-col items-center justify-center">
          <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full mb-4"></div>
          <p className="text-lg text-gray-600">
            Analyzing news... Please wait.
          </p>
        </div>
      ) : error ? (
        <div className="text-center text-lg text-red-500">
          <p>{error}</p>
          <p className="mt-2">
            Try searching on{" "}
            <a
              href="https://www.snopes.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Snopes
            </a>{" "}
            or{" "}
            <a
              href="https://www.factcheck.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              FactCheck.org
            </a>
            .
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.length > 0 ? (
            results.map((result, index) => (
              <ResultCard key={index} {...result} />
            ))
          ) : (
            <p className="text-center text-lg text-red-500">
              No results found. Try a different news source.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Results;
