import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const DeviceUsageStatisticsChart = () => {
    const [chartData, setChartData] = useState({
        series: [],
        options: {
            chart: {
                height: 280,
                type: 'bar',
                toolbar: { show: false },
            },
            plotOptions: {
                bar: {
                    columnWidth: '32px',
                    borderRadius: 8,
                    dataLabels: {
                        position: 'top',
                    },
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
                    gradientToColors: ['#3a76d0'],
                    opacityFrom: 1,
                    opacityTo: 1,
                    stops: [0, 100],
                },
            },
            colors: ['#4cae50', '#ff9901', '#2195f2'],
            xaxis: {
                type: 'category',
                categories: ['Mobile', 'Desktop', 'Tablet'],
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
            legend: {
                show: false,
            },
        },
    });

    const fetchDeviceStats = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v${import.meta.env.VITE_API_VERSION}/dashboard/device-stat`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`, // ✅ Include auth if required
                },
            });
            if (!res.ok) throw new Error("Failed to fetch device stats");

            const result = await res.json();
            const data = result?.data || { mobile: 0, desktop: 0, tablet: 0 };

            // Update chart series
            setChartData((prev) => ({
                ...prev,
                series: [
                    {
                        name: 'Sessions',
                        data: [data.mobile, data.desktop, data.tablet],
                    },
                ],
            }));
        } catch (error) {
            console.error("Error fetching device stats:", error);
        }
    };

    useEffect(() => {
        fetchDeviceStats();
    }, []);

    return (

        <div className='w-full'>
            <ReactApexChart
                options={chartData.options}
                series={chartData.series}
                type="bar"
                height={280}
            />
        </div>
    );
};

export default DeviceUsageStatisticsChart;
