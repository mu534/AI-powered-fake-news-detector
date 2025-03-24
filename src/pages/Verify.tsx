import React, { useState, FormEvent } from "react";
import axios, { AxiosResponse } from "axios";

import NewsInput from "../components/NewsInput";

// Define types for the fact-check results based on the backend response
interface FactCheck {
  publisher: string;
  url: string;
  title: string;
  rating: string;
}

interface FactCheckResult {
  text: string;
  claimant: string | null;
  claimDate: string | null;
  factCheck: FactCheck[];
}

interface FactCheckResponse {
  message: string;
  results?: FactCheckResult[];
  checkWorthyClaims?: string[];
}

const Verify: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<FactCheckResult[] | null>(null);
  const [checkWorthyClaims, setCheckWorthyClaims] = useState<string[] | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!query.trim()) {
      setError("Please enter a claim to verify.");
      return;
    }

    setError(null);
    setResults(null);
    setCheckWorthyClaims(null);
    setLoading(true);

    try {
      const response: AxiosResponse<FactCheckResponse> = await axios.post(
        "http://localhost:5000/api/fact-check",
        { query }
      );
      if (response.data.results) {
        setResults(response.data.results);
      } else if (response.data.checkWorthyClaims) {
        setCheckWorthyClaims(response.data.checkWorthyClaims);
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const errorMessage =
          err.response?.data?.message ||
          "An error occurred while verifying the news.";
        if (errorMessage.includes("Fact Check Tools API has not been used")) {
          setError(
            "Google Fact Check API is not enabled. Please contact the administrator."
          );
        } else if (errorMessage.includes("429")) {
          setError("Too many requests. Please try again later.");
        } else if (errorMessage === "Unable to connect to the server") {
          setError(
            "Unable to connect to the server. Please check if the backend is running."
          );
        } else if (
          errorMessage ===
          "No fact-checks or check-worthy claims found for this query"
        ) {
          setError(
            "No fact-checks or check-worthy claims found. Try rephrasing your query (e.g., 'COVID-19 vaccines cause infertility') or checking a well-known claim."
          );
        } else {
          setError(errorMessage);
        }
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setQuery("");
    setResults(null);
    setCheckWorthyClaims(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Article Verification Section */}
        <div className="bg-white shadow-xl rounded-2xl p-8 mb-8 text-center border border-gray-200">
          <h2 className="text-4xl font-extrabold text-gray-800 mb-2">
            Verify News
          </h2>
          <h3 className="text-2xl font-semibold text-gray-600 mb-6">Article</h3>
          <NewsInput redirectTo="/results" />
        </div>

        {/* Claim Verification Section */}
        <div className="bg-white shadow-xl rounded-2xl p-8 text-center border border-gray-200">
          <h3 className="text-2xl font-semibold text-gray-600 mb-6">Claim</h3>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={query}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setQuery(e.target.value)
                }
                placeholder="Enter a claim or news headline (e.g., 'The moon landing was faked')"
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1"
              />
              {query && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="p-3 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
                >
                  Clear
                </button>
              )}
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`p-3 rounded-lg text-white font-semibold flex items-center justify-center ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? (
                <>
                  Verifying{" "}
                  <svg
                    className="animate-spin h-5 w-5 ml-2 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8h8a8 8 0 01-8 8v-8H4z"
                    ></path>
                  </svg>
                </>
              ) : (
                "Verify"
              )}
            </button>
          </form>

          {error && (
            <div className="mt-4 text-red-500">
              <p>{error}</p>
              <p className="mt-2">
                You can also try searching on{" "}
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
          )}
          {results && (
            <div className="mt-6 text-left">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">
                Fact-Check Results
              </h3>
              {results.map((result, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg p-4 mb-4 shadow-sm"
                >
                  <p>
                    <strong className="text-gray-800">Claim:</strong>{" "}
                    {result.text}
                  </p>
                  <p>
                    <strong className="text-gray-800">Claimant:</strong>{" "}
                    {result.claimant || "Unknown"}
                  </p>
                  <p>
                    <strong className="text-gray-800">Date:</strong>{" "}
                    {result.claimDate || "N/A"}
                  </p>
                  {result.factCheck.length > 0 ? (
                    result.factCheck.map((fc, i) => (
                      <div key={i} className="mt-2">
                        <p>
                          <strong className="text-gray-800">Publisher:</strong>{" "}
                          {fc.publisher}
                        </p>
                        <p>
                          <strong className="text-gray-800">Rating:</strong>{" "}
                          {fc.rating}
                        </p>
                        <p>
                          <a
                            href={fc.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            Read More
                          </a>
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-600">
                      No fact-checks available for this claim.
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
          {checkWorthyClaims && (
            <div className="mt-6 text-left">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">
                Check-Worthy Claims
              </h3>
              <p className="text-gray-600 mb-2">
                No fact-checks were found, but the following claims may be worth
                investigating:
              </p>
              <ul className="list-disc list-inside text-gray-600">
                {checkWorthyClaims.map((claim, index) => (
                  <li key={index}>{claim}</li>
                ))}
              </ul>
              <p className="mt-2">
                Try searching these claims on{" "}
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
          )}
        </div>
      </div>
    </div>
  );
};

export default Verify;
