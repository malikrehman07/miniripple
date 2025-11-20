// src/components/traffic/BotsVpnDetectionChart.jsx
import React, { useMemo } from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const BotsVpnDetectionChart = ({ bots = 0, vpn = 0 }) => {
  const { botsPercent, vpnPercent } = useMemo(() => {
    const total = Number(bots) + Number(vpn);
    const pct = (n) => (total > 0 ? Number(((n / total) * 100).toFixed(1)) : 0);
    return {
      botsPercent: pct(bots),
      vpnPercent: pct(vpn),
    };
  }, [bots, vpn]);

  const chartData = {
    labels: ["Bots", "VPN Detection"],
    datasets: [
      {
        data: [botsPercent, vpnPercent],
        backgroundColor: ["#e7992e", "#e6302d"], // orange / red
        borderWidth: 0,
        borderRadius: 30,
        spacing: -16, // a little less negative to avoid tight corners
      },
    ],
  };

  const options = {
    // Slightly thicker ring so there's more inner area for the labels
    cutout: "64%",
    maintainAspectRatio: false, // prevents canvas from squeezing/cropping
    layout: { padding: { top: 10, right: 10, bottom: 10, left: 10 } },
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: { label: (ctx) => `${ctx.label}: ${ctx.parsed}%` },
      },
      datalabels: {
        display: true,
        color: "#fff",
        font: { weight: "bold", size: 11 },
        formatter: (value) => {
          const v = typeof value === "string" ? parseFloat(value) : value;
          if (!Number.isFinite(v)) return "";
          // optionally hide super-tiny slivers; set to 0 if you want all labels
          if (v < 2) return "";
          return `${v}%`;
        },
        anchor: "center",
        align: "center",
        offset: -12,   // <-- correct lowercase; pulls label toward inner hole
        clamp: true,
        clip: false,
      },
    },
  };

  return (
    <div className="relative w-[240px] h-[240px] mx-auto">
      <Doughnut data={chartData} options={options} />
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <p className="text-sm text-gray-900 font-medium">Total</p>
        <p className="text-lg font-bold text-black">100%</p>
      </div>
    </div>
  );
};

export default BotsVpnDetectionChart;
