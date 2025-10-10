"use client";

import React from "react";
import { Bar } from "react-chartjs-2";
import { ensureChartJSRegistered, chartColors } from "./chart-setup";

interface BarItem { label: string; value: number }

export default function BarChart({ data, height = 220 }: { data: BarItem[]; height?: number }) {
  ensureChartJSRegistered();
  const colors = chartColors();
  return (
    <div style={{ height }}>
      <Bar
        data={{
          labels: data.map(d => d.label),
          datasets: [{
            data: data.map(d => d.value),
            backgroundColor: colors.primary,
            borderRadius: 6,
          }]
        }}
        options={{
          plugins: { legend: { display: false } },
          scales: { x: { grid: { display: false } }, y: { grid: { color: "rgba(120,120,120,0.15)" }, ticks: { precision: 0 } } },
          responsive: true,
          maintainAspectRatio: false,
          resizeDelay: 0,
        }}
      />
    </div>
  );
}


