import React, { useState } from "react";
import { useTrend } from "../context/TrendProvider";

function SearchForm() {
  const [startDate, setStartDate] = useState("2023-01-01");
  const [endDate, setEndDate] = useState("2023-12-31");
  const [timeUnit, setTimeUnit] = useState("month");
  const [keyword, setKeyword] = useState("자켓, 패딩, 코트");

  const { fetchTrendData } = useTrend();

  const handleSubmit = (e) => {
    e.preventDefault();

    // 1️⃣ 콤마(,) 기준으로 분리하고 공백 제거
    const keywords = String(keyword || "")
      .split(",")
      .map((k) => k.trim())
      .filter(Boolean);

    if (keywords.length === 0) {
      alert("키워드를 1개 이상 입력하세요.");
      return;
    }

    // 2️⃣ 키워드 비교용 요청 바디 (category/keywords 엔드포인트)
    const requestBody = {
      startDate: "2023-01-01",
      endDate: "2023-12-31",
      timeUnit: "month",
      category: "50000000", // 문자열 하나
      // TOOD: keywords 배열을 입력 받으면 들어가게 !!! 현재 목업임;;
      keyword: [
        { name: "자켓", param: ["자켓"] },
        { name: "패딩", param: ["패딩"] },
        { name: "코트", param: ["코트"] },
      ],
      device: "pc",
    };

    fetchTrendData(requestBody);
  };

  return (
    <form onSubmit={handleSubmit} className="card search-form">
      <h2>조회 조건 설정</h2>
      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="startDate">시작일</label>
          <input
            id="startDate"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="endDate">종료일</label>
          <input
            id="endDate"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="timeUnit">분석 단위</label>
          <select
            id="timeUnit"
            value={timeUnit}
            onChange={(e) => setTimeUnit(e.target.value)}
          >
            <option value="date">일간</option>
            <option value="week">주간</option>
            <option value="month">월간</option>
          </select>
        </div>
        <div className="form-group keywords-group">
          <label htmlFor="keywords">키워드 (콤마로 구분)</label>
          <input
            id="keywords"
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="예: 자켓, 패딩, 코트"
          />
        </div>
        <div className="form-group button-group">
          <button type="submit" className="submit-button">
            분석하기
          </button>
        </div>
      </div>
    </form>
  );
}

export default SearchForm;
