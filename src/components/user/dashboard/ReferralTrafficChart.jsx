import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const ReferralTrafficChart = ({ gaData = [], total = 0 }) => {
    const [referralData, setReferralData] = useState([0, 0, 0]); // [Organic, Social, Direct]

    useEffect(() => {
        if (!Array.isArray(gaData)) return;

        let organic = 0;
        let social = 0;
        let direct = 0;

        // If API already categorizes, use that
        gaData.forEach((row) => {
            const category = (row.category || "").toLowerCase();
            const count =
                typeof row.visitors === "number"
                    ? row.visitors
                    : parseInt(row.sessions, 10) || 0;

            if (category === "organic") organic += count;
            else if (category === "social") social += count;
            else if (category === "direct") direct += count;
            else {
                // fallback: infer from source strings if no category present
                const source = (
                    row.visitorSource ||
                    row.sessionSource ||
                    ""
                ).toLowerCase();
                if (source === "(direct)") direct += count;
                else if (
                    /(facebook|twitter|instagram|linkedin|t\.co)/.test(source)
                )
                    social += count;
                else if (/(google|bing|yahoo)/.test(source)) organic += count;
            }
        });

        setReferralData([organic, social, direct]);
    }, [gaData]);

    const data = {
        labels: ["Organic", "Social", "Direct"],
        datasets: [
            {
                data: referralData, // e.g., [3, 4, 69]
                backgroundColor: ["#D2691E", "#3B82F6", "#001E3C"],
                borderWidth: 0,
                borderRadius: 8, // was 40
                spacing: 0,
            },
        ],
    };

    const options = {
        cutout: "68%",
        maintainAspectRatio: true,
        plugins: { 
            legend: { display: false },
            datalabels: {
                display: true,
                color: 'white',
                font: {
                    weight: 'bold',
                    size: 11
                },
                formatter: (value, context) => {
                    const sum = context.dataset.data.reduce((a, b) => a + b, 0);
                    const percentage = sum > 0 ? ((value / sum) * 100).toFixed(1) : 0;
                    return percentage + '%';
                },
                anchor: 'center',
                align: 'center'
            }
        },
        animation: { duration: 600 },
    };

    const sum = referralData.reduce((a, b) => a + b, 0);

    return (
        <div className="flex items-center flex-col justify-center rounded-lg flex-1 w-full h-full">
            <div className="relative">
                <div className="w-[150px] h-[150px]">
                    {" "}
                    {/* give it height as well */}
                    {sum > 0 ? (
                        <Doughnut data={data} options={options} />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
                            No data
                        </div>
                    )}
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                    <h3 className="font-bold text-gray-500 text-sm">Total</h3>
                    <p className="font-bold text-xl text-gray-700">{total}</p>
                </div>
            </div>
        </div>
    );
};

export default ReferralTrafficChart;
