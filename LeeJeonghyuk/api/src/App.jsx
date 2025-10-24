import React from "react";
import "./App.css";
import SearchPage from "./components/SearchPage.jsx";
import TrendChart from "./components/TrendChart.jsx";

function App() {
  return (
    <div className="App">
      <h1>네이버 쇼핑인사이트 키워드별 트렌드 조회</h1>
      <SearchPage />
      <TrendChart />
    </div>
  );
}

export default App;
