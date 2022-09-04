import React from "react";
import { Chart } from "react-google-charts";

export const data = [
  ["Year", "Exams", "Students"],
  ["2004", 3000, 400],
  ["2006", 1370, 560],
  ["2008", 570, 460],
];

export const options = {
  curveType: "function",
  legend: { position: "bottom" },
};

export default function App() {
  return (
    <Chart
      chartType="LineChart"
      width="100%"
      height="100%"
      data={data}
      options={options}
    />
  );
}
