import React, { useMemo } from "react";
import { Doughnut } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

// Mock data now interpreted as realTime and returning user percentages
const mockGAData = [
    { realTimeUsers: 0.35, returningUsers: 0.65 },
    { realTimeUsers: 0.40, returningUsers: 0.60 },
    { realTimeUsers: 0.38, returningUsers: 0.62 },
    { realTimeUsers: 0.36, returningUsers: 0.64 },
    { realTimeUsers: 0.37, returningUsers: 0.63 },
];

const RealTimeVsReturningUsersChart = ({ realTimeUsers, returningUsers }) => {
    const realTimePercent = (realTimeUsers * 100).toFixed(1);
    const returningPercent = (returningUsers * 100).toFixed(1);

    const chartData = {
        labels: ["Real-Time Users", "Returning Users"],
        datasets: [
            {
                data: [realTimePercent, returningPercent],
                backgroundColor: ["#059669", "#e29400"], // Blue shades
                borderWidth: 0,
                borderRadius: 30,
                spacing: -20,
            },
        ],
    };

    const options = {
        cutout: "70%",
        plugins: {
            legend: { display: false },
            tooltip: {
                callbacks: {
                    label: (ctx) => `${ctx.label}: ${ctx.parsed}%`,
                },
            },
            datalabels: {
                display: true,
                color: 'white',
                font: {
                    weight: 'bold',
                    size: 12
                },
                formatter: (value, context) => {
                    return value + '%';
                },
                anchor: 'center',
                align: 'center'
            }
        },
    };

    return (
        <div className="relative w-[220px] h-[220px] mx-auto">
            <Doughnut data={chartData} options={options} />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="text-md text-gray-900 font-medium">Total</p>
                <p className="text-lg font-bold text-black">100%</p>
            </div>
        </div>
    );
};

export default RealTimeVsReturningUsersChart;
