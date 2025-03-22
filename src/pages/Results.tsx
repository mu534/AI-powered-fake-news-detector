import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { verifyNews } from "../services/api";
import ResultCard from "../components/ResultCard";

const Results: React.FC = () => {
  interface Result {
    label: string;
    confidence: number;
    source: string;
  }

  const [results, setResults] = useState<Result[]>([]);
  const location = useLocation();
  const text = new URLSearchParams(location.search).get("text") || "";

  useEffect(() => {
    const fetchResults = async () => {
      const data = await verifyNews(text);
      setResults([data]);
    };
    if (text) fetchResults();
  }, [text]);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Fake News</h2>
      <div className="mb-4 space-x-4">
        <Link to="/signup" className="text-blue-500">
          Sign Up
        </Link>
        <Link to="/contact" className="text-blue-500">
          Contact Us
        </Link>
      </div>
      <h3 className="text-xl font-medium mb-2">Analysis</h3>
      {results.length > 0 ? (
        results.map((result, index) => <ResultCard key={index} {...result} />)
      ) : (
        <>
          <ResultCard
            label="Fraud Detected"
            confidence={0.95}
            source="Transaction Logs"
          />
          <ResultCard
            label="Overbilling"
            confidence={0.89}
            source="Invoice Analysis"
          />
          <ResultCard label="No Issue" confidence={0.88} source="System Logs" />
          <ResultCard
            label="Anomaly Found"
            confidence={0.9}
            source="Machine Logs"
          />
          <ResultCard
            label="Data Breach"
            confidence={0.92}
            source="Security Scan"
          />
          <ResultCard
            label="System Error"
            confidence={0.94}
            source="Error Reports"
          />
        </>
      )}
      <p className="mt-4">Practice</p>
      <p>Practice</p>
      <p className="mt-2">English</p>
    </div>
  );
};

export default Results;
