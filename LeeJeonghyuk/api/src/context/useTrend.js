import { useContext } from "react";
import { TrendContext } from "./TrendProvider";

export function useTrend() {
  const context = useContext(TrendContext);
  if (!context) {
    throw new Error("Cannot use useTrend outside of TrendProvider");
  }
  return context;
}
