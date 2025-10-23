import React from "react";
import { useTrend } from "../context/TrendProvider";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const CHART_COLORS = [
  "#3B82F6",
  "#10B981",
  "#F97316",
  "#EC4899",
  "#8B5CF6",
  "#06B6D4",
];

function TrendChart() {
  const { chartData, loading, error } = useTrend();

  if (!Array.isArray(chartData) || chartData.length === 0) {
    return (
      <div className="card chart-container chart-placeholder">
        <p>
          {loading
            ? "데이터를 불러오는 중입니다..."
            : error
            ? `오류가 발생했습니다: ${error}` // API 오류 메시지 표시
            : '분석할 키워드를 입력하고 "분석하기"를 눌러주세요.'}
        </p>
      </div>
    );
  }

  const data = {
    labels: chartData[0].data.map((item) => item.period),
    datasets: chartData.map((result, index) => ({
      label: result.title,
      data: result.data.map((item) => item.ratio),
      borderColor: CHART_COLORS[index % CHART_COLORS.length],
      backgroundColor: `${CHART_COLORS[index % CHART_COLORS.length]}33`,
      fill: true,
      tension: 0.3,
      pointRadius: 3,
      pointHoverRadius: 6,
      borderWidth: 2,
    })),
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          usePointStyle: true,
          padding: 20,
        },
      },
      title: {
        display: true,
        text: "키워드별 검색량 트렌드 비교",
        font: {
          size: 16,
          weight: "600",
        },
        padding: {
          bottom: 20,
        },
      },
      tooltip: {
        mode: "index",
        intersect: false,
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleFont: { size: 14, weight: "bold" },
        bodyFont: { size: 12 },
        padding: 10,
        cornerRadius: 4,
        usePointStyle: true,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "상대적 검색량",
          font: { size: 12, weight: "500" },
        },
        grid: {
          color: "#e2e8f0",
        },
      },
      x: {
        title: {
          display: true,
          text: "기간",
          font: { size: 12, weight: "500" },
        },
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="card chart-container">
      <div style={{ height: "450px" }}>
        <Line options={options} data={data} />
      </div>
    </div>
  );
}

export default TrendChart;
