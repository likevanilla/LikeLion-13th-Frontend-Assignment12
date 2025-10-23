import React, { createContext, useContext, useState } from "react";
import axios from "axios";

const TrendContext = createContext();

export function TrendProvider({ children }) {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTrendData = async (requestBody) => {
    setLoading(true);
    setError(null);
    setChartData(null);

    try {
      const response = await axios.post("/v1/datalab/search", requestBody, {
        headers: {
          "X-Naver-Client-Id": import.meta.env.VITE_NAVER_CLIENT_ID,
          "X-Naver-Client-Secret": import.meta.env.VITE_NAVER_CLIENT_SECRET,
          "Content-Type": "application/json",
        },
      });

      setChartData(response.data.results);
    } catch (e) {
      if (e.response) {
        setError(
          `API 오류 (Status ${e.response.status}): ${e.response.data.errorMessage}`
        );
      } else {
        setError(e.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const value = {
    chartData,
    loading,
    error,
    fetchTrendData,
  };

  return (
    <TrendContext.Provider value={value}>{children}</TrendContext.Provider>
  );
}

export function useTrend() {
  const context = useContext(TrendContext);
  if (!context) {
    throw new Error("Cannot use useTrend outside of TrendProvider");
  }
  return context;
}
