import React, { useState } from "react";
import { useTrend } from "../context/useTrend";

function SearchForm() {
  const [startDate, setStartDate] = useState("2023-01-01");
  const [endDate, setEndDate] = useState("2023-12-31");
  const [timeUnit, setTimeUnit] = useState("month");
  const [keyword, setKeyword] = useState("자켓, 패딩, 코트");

  const { fetchTrendData } = useTrend();

  const handleSubmit = (e) => {
    e.preventDefault();

    const keywords = String(keyword || "")
      .split(",")
      .map((k) => k.trim())
      .filter(Boolean);

    if (keywords.length === 0) {
      alert("키워드를 1개 이상 입력하세요.");
      return;
    }

    const keywordArray = keywords.map((k) => ({
      name: k,
      param: [k],
    }));

    const requestBody = {
      startDate,
      endDate,
      timeUnit,
      category: "50000000", // 패션의류 카테고리 코드입니당
      keyword: keywordArray,
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
