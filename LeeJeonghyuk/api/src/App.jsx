import React from "react";
import "./App.css";
import SearchPage from "./components/SearchPage.jsx";
import TrendChart from "./components/TrendChart.jsx";

function App() {
  return (
    <div className="App">
      <h1>네이버 데이터랩 트렌드 대시보드</h1>
      <SearchPage />
      <TrendChart />
    </div>
  );
}

export default App;
