import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-hot-toast";

const Verify: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [inputClaim, setInputClaim] = useState<string>("");
  const { factCheck, token } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const urlClaim = new URLSearchParams(location.search).get("claim") || "";
  const [currentClaim, setCurrentClaim] = useState<string>(urlClaim);

  const fetchResults = async (claimToVerify: string) => {
    if (!claimToVerify.trim()) {
      setError("No claim provided for verification.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await factCheck(claimToVerify.trim());
      if (!response || (!response.factCheckResults && !response.newsResults)) {
        throw new Error("No results returned from fact-check service.");
      }
      navigate(`/results?text=${encodeURIComponent(claimToVerify)}`, {
        state: { results: response },
      });
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error
          ? err.message === "auth_required"
            ? "Authentication required. Redirecting to login..."
            : err.message === "Request failed with status 404"
            ? "No fact-check results found for this claim."
            : err.message
          : "An unexpected error occurred.";
      setError(errorMessage);
      toast.error(errorMessage);
      if (err instanceof Error && err.message === "auth_required") {
        setTimeout(() => navigate("/login"), 2000); // Redirect after showing toast
      }
      console.error("Fact-check error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputClaim.trim()) {
      setError("Please enter a claim to verify.");
      return;
    }
    setCurrentClaim(inputClaim);
    fetchResults(inputClaim);
  };

  useEffect(() => {
    if (urlClaim) {
      setCurrentClaim(urlClaim);
      fetchResults(urlClaim);
    }
  }, [urlClaim, token]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-6">Verify News</h2>

      {!urlClaim && (
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="flex flex-col gap-4">
            <label htmlFor="claim" className="text-lg font-medium">
              Enter a claim to verify:
            </label>
            <textarea
              id="claim"
              value={inputClaim}
              onChange={(e) => setInputClaim(e.target.value)}
              placeholder="e.g., The moon landing was faked"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
            />
            <button
              type="submit"
              disabled={loading}
              className={`p-3 rounded-lg text-white font-semibold ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? "Verifying..." : "Verify"}
            </button>
          </div>
        </form>
      )}

      {loading ? (
        <div className="flex flex-col items-center justify-center">
          <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full mb-4"></div>
          <p className="text-lg text-gray-600">
            Analyzing claim: "{currentClaim}"... Please wait.
          </p>
        </div>
      ) : error ? (
        <div className="text-center text-lg text-red-500 mb-4">
          <p>{error}</p>
          {error.toLowerCase().includes("server") ||
          error.toLowerCase().includes("404") ? (
            <>
              <button
                onClick={() => fetchResults(currentClaim)}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Retry
              </button>
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
            </>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

export default Verify;
