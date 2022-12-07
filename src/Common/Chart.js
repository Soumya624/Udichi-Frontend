import React from "react";
import { Chart } from "react-google-charts";

export const data = [
  [ "Month", "Exams"],
  [ "12", 3000],
  [ "10",1370],
  [ "9",570],
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
