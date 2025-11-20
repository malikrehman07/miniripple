import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

const PeakTrafficHoursChart = () => {
  const [seriesData, setSeriesData] = useState([]);

  const hours = [
    "12AM","2AM","4AM","6AM","8AM","10AM",
    "12PM","2PM","4PM","6PM","8PM","10PM",
  ];
  const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

  const fetchPeakHours = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v${import.meta.env.VITE_API_VERSION}/traffic-analytics/traffic/peak-hours`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const result = await res.json();

      // Build a day-name keyed map (ignore any non-day fields like "success")
      const dayMap = Object.values(result).reduce((acc, v) => {
        if (v && typeof v === "object" && v.day && Array.isArray(v.hours)) {
          acc[v.day] = v;
        }
        return acc;
      }, {});

      const series = days
        .slice()
        .reverse() // Top to bottom Sat..Sun
        .map((day) => {
          // default zeros for all hours
          const hourMap = Object.fromEntries(hours.map((h) => [h, 0]));
          const dayData = dayMap[day];

          if (dayData) {
            dayData.hours.forEach(({ hour, count }) => {
              // only set if hour matches our buckets
              if (hourMap.hasOwnProperty(hour)) {
                hourMap[hour] = Number(count) || 0;
              }
            });
          }

          return {
            name: day.slice(0, 3),
            data: hours.map((h) => ({ x: h, y: hourMap[h] })),
          };
        });

      setSeriesData(series);
    } catch (e) {
      console.error("Error fetching peak hours data:", e);
      setSeriesData([]); // optional
    }
  };

  useEffect(() => {
    fetchPeakHours();
  }, []);

  const chartData = {
    series: seriesData,
    options: {
      chart: { height: 320, type: "heatmap", toolbar: { show: false } },
      dataLabels: { enabled: false },
      // Explicit categories to keep buckets aligned across series
      xaxis: {
        type: "category",
        categories: hours,
        labels: { style: { fontSize: "12px", fontWeight: 500, colors: "#444" } },
      },
      yaxis: {
        categories: days.slice().reverse().map((d) => d.slice(0, 3)),
        labels: { style: { fontSize: "12px", fontWeight: 500, colors: "#444" } },
      },
      plotOptions: {
        heatmap: {
          shadeIntensity: 0.5,
          radius: 4,
          useFillColorAsStroke: false,
          colorScale: {
            ranges: [
              { from: 0, to: 5, color: "#f0f8ff" },
              { from: 5, to: 10, color: "#a0c4ff" },
              { from: 10, to: 20, color: "#5b9bff" },
              { from: 20, to: 30, color: "#004ecb" },
              { from: 30, to: 9999, color: "#002d99" },
            ],
          },
        },
      },
      tooltip: { theme: "light", style: { fontSize: "13px", fontFamily: "Arial" } },
    },
  };

  return (
    <div className="w-full">
      <ReactApexChart
        // key helps force redraw if series was initially empty
        key={seriesData.length ? "loaded" : "empty"}
        options={chartData.options}
        series={chartData.series}
        type="heatmap"
        height={320}
      />
    </div>
  );
};

export default PeakTrafficHoursChart;
