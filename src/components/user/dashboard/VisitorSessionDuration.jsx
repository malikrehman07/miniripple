import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { parse, format } from 'date-fns';

const VisitorSessionDurationChart = () => {
    const [chartData, setChartData] = useState({
        series: [],
        options: {
            chart: {
                id: 'area-datetime',
                type: 'area',
                height: 280,
                toolbar: { show: false },
                zoom: { autoScaleYaxis: true },
            },
            stroke: {
                curve: 'smooth',
                width: 2,
            },
            colors: ['#599feb'],
            fill: {
                type: 'gradient',
                gradient: {
                    shadeIntensity: 0.4,
                    opacityFrom: 0.9,
                    opacityTo: 0.1,
                    stops: [0, 90, 100],
                },
            },
            xaxis: {
                type: 'datetime',
                categories: [],
                labels: {
                    style: {
                        fontSize: '13px',
                        fontWeight: 'bold',
                        colors: ['#333'],
                    },
                    format: 'MMM d',
                },
            },
            yaxis: {
                show: true,
                axisBorder: {
                    show: true,
                    color: '#ccc',
                },
                labels: {
                    show: true,
                    formatter: (value) => `${value.toFixed(2)} min`,
                    style: {
                        colors: '#333',
                        fontSize: '12px',
                    },
                },
            },
            grid: { show: false },
            dataLabels: { enabled: false },
        },
    });

    // Fetch API Data
    const fetchSessionDuration = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v2/dashboard/session-duration`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`, // ✅ Include token if required
                },
            });

            if (!res.ok) throw new Error('Failed to fetch session duration data');
            const result = await res.json();

            if (!result.success || !Array.isArray(result.data)) return;

            const dateMap = {};

            result.data.forEach(({ dateHour, averageSessionDuration }) => {
                if (!dateHour || isNaN(averageSessionDuration)) return;
                if (averageSessionDuration < 0) return; // ✅ Ignore invalid negative durations

                const fullDate = parse(dateHour, 'yyyyMMddHH', new Date());
                const date = format(fullDate, 'yyyy-MM-dd');

                if (!dateMap[date]) {
                    dateMap[date] = { total: 0, count: 0 };
                }

                dateMap[date].total += Number(averageSessionDuration);
                dateMap[date].count += 1;
            });

            const sortedDates = Object.keys(dateMap).sort();
            const averagesInMinutes = sortedDates.map((date) =>
                parseFloat((dateMap[date].total / dateMap[date].count / 60).toFixed(2))
            );

            const formattedDates = sortedDates.map((date) => {
                const parsedDate = parse(date, 'yyyy-MM-dd', new Date());
                return parsedDate.toISOString();
            });

            setChartData((prev) => ({
                ...prev,
                series: [
                    {
                        name: 'Avg Session Duration (min)',
                        data: averagesInMinutes,
                    },
                ],
                options: {
                    ...prev.options,
                    xaxis: {
                        ...prev.options.xaxis,
                        categories: formattedDates,
                    },
                },
            }));
        } catch (error) {
            console.error('Error fetching session duration:', error);
        }
    };

    useEffect(() => {
        fetchSessionDuration();
    }, []);

    return (
        <div className="w-full">
            <ReactApexChart
                options={chartData.options}
                series={chartData.series}
                type="area"
                height={280}
            />
        </div>
    );
};

export default VisitorSessionDurationChart;
