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

const BounceRateSessionChart = ({ bounceRate, sessionDuration, onValuesUpdate }) => {
    // Calculate bounce rate percentage
    const bouncePercent = (bounceRate * 100).toFixed(1);
    
    // Calculate engagement rate as (100% - bounce rate)
    const engagementPercent = (100 - (bounceRate * 100)).toFixed(1);
    
    // Format session duration in minutes and seconds
    const formattedDuration = React.useMemo(() => {
        const minutes = Math.floor(sessionDuration / 60);
        const seconds = sessionDuration % 60;
        return `${minutes}m ${seconds}s`;
    }, [sessionDuration]);

    const chartData = {
        labels: ["Bounce Rate", "Engagement Rate"],
        datasets: [
            {
                data: [parseFloat(bouncePercent), parseFloat(engagementPercent)],
                backgroundColor: ["#dc2626", "#16a34a"], // red for bounce, green for engagement
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

    // Pass calculated values to parent component
    React.useEffect(() => {
        if (!onValuesUpdate) return;
        onValuesUpdate({
            bouncePercent: bouncePercent + '%',
            engagementPercent: engagementPercent + '%',
            formattedDuration
        });
        // Only run when source props change; onValuesUpdate is stable via useCallback upstream
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [bounceRate, sessionDuration]);

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

export default BounceRateSessionChart;
