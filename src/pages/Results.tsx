import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ResultCard from "../components/ResultCard";

interface FactCheckResult {
  claim: string;
  claimant: string;
  date: string;
  publisher: string;
  rating: string;
  url: string;
  image: string | null;
}

interface NewsResult {
  title: string;
  description: string;
  url: string;
  image: string | null;
  publishedAt: string;
  source: string;
}

const Results: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [results, setResults] = useState<FactCheckResult[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const query = new URLSearchParams(location.search).get("text") || "";

  const fetchResults = async () => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");
      const refreshToken = localStorage.getItem("refreshToken") || "";
      if (!token) {
        navigate("/login");
        return;
      }

      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
      let response = await fetch(`${apiUrl}/api/fact-check`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ query, includeNews: true }),
      });

      if (response.status === 403) {
        const refreshResponse = await fetch(`${apiUrl}/api/auth/refresh`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refreshToken }),
        });

        if (!refreshResponse.ok) {
          localStorage.removeItem("token");
          localStorage.removeItem("refreshToken");
          navigate("/login");
          return;
        }

        const { accessToken } = await refreshResponse.json();
        localStorage.setItem("token", accessToken);

        response = await fetch(`${apiUrl}/api/fact-check`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ query, includeNews: true }),
        });
      }

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("refreshToken");
          navigate("/login");
          return;
        }
        throw new Error("Failed to fetch results from the server.");
      }

      const data = await response.json();
      console.log("API Response:", data);

      const factCheckResults: FactCheckResult[] = data.factCheckResults || [];
      const newsResults: FactCheckResult[] = (data.newsResults || []).map(
        (news: NewsResult) => ({
          claim: news.title,
          claimant: "N/A (News Article)",
          date: new Date(news.publishedAt).toLocaleDateString(),
          publisher: news.source,
          rating: "Not Fact-Checked",
          url: news.url,
          image: news.image || "https://via.placeholder.com/500?text=No+Image",
        })
      );

      setResults([...factCheckResults, ...newsResults]);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred."
      );
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!query) {
      setLoading(false);
      setError("No query provided. Please verify a claim first.");
      return;
    }
    fetchResults();
  }, [query]);

  return (
    <div className="max-w-6xl mx-auto p-6 mb-20 mt-20">
      <h2 className="text-3xl font-bold text-center mb-6">
        News Verification Results
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
          <button
            onClick={fetchResults}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      ) : (
        <div>
          {results.length > 0 && (
            <button
              onClick={() => navigate("/verify")}
              className="mb-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              New Search
            </button>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.length > 0 ? (
              results.map((result, index) => {
                const imageUrl =
                  result.image ||
                  "https://via.placeholder.com/500?text=No+Image";
                console.log(`Image for ${result.claim}:`, imageUrl);
                return (
                  <div key={index} className="relative">
                    {result.rating === "Not Fact-Checked" && (
                      <span className="absolute top-2 left-2 bg-yellow-500 text-white text-xs font-semibold px-2 py-1 rounded">
                        News Article
                      </span>
                    )}
                    <ResultCard {...result} image={imageUrl} />
                  </div>
                );
              })
            ) : (
              <div className="text-center text-lg text-gray-600">
                <p>No fact-check or news results found for "{query}".</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Results;
