import React, { createContext, useState } from "react";
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
      const response = await axios.post(
        "/v1/datalab/shopping/category/keywords",
        requestBody,
        {
          headers: {
            "X-Naver-Client-Id": import.meta.env.VITE_NAVER_CLIENT_ID,
            "X-Naver-Client-Secret": import.meta.env.VITE_NAVER_CLIENT_SECRET,
            "Content-Type": "application/json",
          },
        }
      );

      setChartData(response.data.results);
    } catch (e) {
      // 1) 내가 실제로 어떤 헤더/바디를 보냈는지 확인
      console.group("%c[DataLab DEBUG] request/response", "color: #0aa");
      console.log("REQUEST URL:", "/v1/datalab/shopping/category/keywords");
      console.log("REQUEST HEADERS:", {
        "X-Naver-Client-Id": import.meta.env.VITE_NAVER_CLIENT_ID,
        "X-Naver-Client-Secret": import.meta.env.VITE_NAVER_CLIENT_SECRET
          ? "***"
          : "(undefined)",
        "Content-Type": "application/json",
      });
      console.log("REQUEST BODY:", requestBody);

      // 2) 응답 상태 + 본문 전체 출력 (네이버가 이유를 써줍니당)
      if (e.response) {
        console.log("STATUS:", e.response.status);
        console.log("RESPONSE DATA:", e.response.data);
        setError(
          `API 오류 (${e.response.status}): ${
            e.response.data?.errorMessage ||
            e.response.data?.message ||
            JSON.stringify(e.response.data)
          }`
        );
      } else {
        console.log("ERROR:", e.message);
        setError(e.message);
      }
      console.groupEnd();
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

export { TrendContext };
