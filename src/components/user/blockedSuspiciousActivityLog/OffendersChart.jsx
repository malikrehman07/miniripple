import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const OffendersChart = () => {
    const [chartData, setChartData] = useState({
        series: [],
        options: {
            chart: {
                height: 380,
                type: 'bar',
                toolbar: { show: false },
            },
            plotOptions: {
                bar: {
                    columnWidth: '32px',
                    borderRadius: 8,
                    borderRadiusApplication: 'end',
                    dataLabels: { position: 'top' },
                },
            },
            dataLabels: {
                enabled: true,
                formatter: (val) => val,
                offsetY: -20,
                style: {
                    fontSize: '11px',
                    fontWeight: 'bold',
                    colors: ['#cfdaf2'],
                },
                background: {
                    enabled: true,
                    foreColor: '#000',
                    padding: 4,
                    borderRadius: 2,
                    opacity: 0.9,
                },
            },
            fill: {
                type: 'gradient',
                gradient: {
                    shade: 'light',
                    type: 'vertical',
                    shadeIntensity: 0.5,
                    gradientToColors: ['#254ca6'],
                    opacityFrom: 1,
                    opacityTo: 1,
                    stops: [0, 100],
                },
            },
            colors: ['#3a76d0'],
            xaxis: {
                type: 'category',
                labels: {
                    style: {
                        fontSize: '13px',
                        fontWeight: 'bold',
                        colors: ['#333'],
                    },
                    rotate: -45,
                    offsetY: 5,
                },
            },
        },
    });

    useEffect(() => {
        const fetchChartData = async () => {
            try {
                // Use Firebase Auth if available, else fallback to localStorage token
                let token = localStorage.getItem("token");
                if (window.firebase && window.firebase.auth) {
                    const user = window.firebase.auth().currentUser;
                    if (user) token = await user.getIdToken();
                }
                const response = await fetch(
                    `${import.meta.env.VITE_API_URL}/api/v${import.meta.env.VITE_API_VERSION}/blocked-suspicious-activity/offender-stats`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                if (!response.ok) {
                    throw new Error("Failed to fetch offender stats");
                }
                const result = await response.json();
                const offenders = result?.stats?.ips || [];
                // offenders is an array of IPs (top 10)
                setChartData((prev) => ({
                    ...prev,
                    series: [{ name: 'Repeat Offenders', data: offenders.map((ip, idx) => ({ x: ip, y: offenders.length - idx })) }],
                    options: {
                        ...prev.options,
                        xaxis: {
                            ...prev.options.xaxis,
                            categories: offenders,
                        },
                    },
                }));
            } catch (error) {
                console.error("Error loading offender stats:", error);
            }
        };
        fetchChartData();
    }, []);

    return (
        <div className="w-full">
            <ReactApexChart
                options={chartData.options}
                series={chartData.series}
                type="bar"
                height={290}
            />
        </div>
    );
};

export default OffendersChart;
