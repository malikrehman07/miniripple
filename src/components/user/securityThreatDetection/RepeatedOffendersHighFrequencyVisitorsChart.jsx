import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const RepeatedVisitorsChart = ({ data }) => {
  const FULL = [
    'Repeated Offenders',
    'Frequent Visitors',
    'Repeat Visitors',
    'Loyal Users',
  ];
  const SHORT = ['Repeated', 'Frequent', 'Repeat', 'Loyal'];

  const [chartData, setChartData] = useState({
    series: [],
    options: {
      chart: {
        height: 320,
        type: 'bar',
        toolbar: { show: false },
        parentHeightOffset: 0,
        redrawOnWindowResize: true,
      },
      grid: {
        padding: { left: 6, right: 6, bottom: 84 }, // plenty of space for angled labels
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
        offsetY: -18,
        style: { fontSize: '11px', fontWeight: 'bold', colors: ['#cfdaf2'] },
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
        categories: FULL,
        tickPlacement: 'between',
        labels: {
          rotate: -28,            // angle to make room horizontally
          rotateAlways: true,
          trim: false,            // <-- DO NOT TRIM (prevents …)
          hideOverlappingLabels: false,
          offsetY: 10,
          maxHeight: 90,          // allow tall label block
          style: {
            fontSize: '12px',
            fontWeight: 'bold',
            colors: ['#333'],
          },
          formatter: (val) => String(val), // no wrapping, keep full text
        },
      },
      tooltip: { x: { show: true } },
      responsive: [
        {
          breakpoint: 1024, // tablet
          options: {
            grid: { padding: { bottom: 90 } },
            plotOptions: { bar: { columnWidth: '28px' } },
            xaxis: {
              labels: {
                rotate: -30,
                trim: false,
                hideOverlappingLabels: false,
                style: { fontSize: '11px' },
              },
            },
          },
        },
        {
          breakpoint: 640, // phones
          options: {
            chart: { height: 340 },
            grid: { padding: { bottom: 80 } },
            plotOptions: { bar: { columnWidth: '24px' } },
            xaxis: {
              // swap to short labels on tight screens
              categories: SHORT,
              labels: {
                rotate: -30,
                rotateAlways: true,
                trim: false,
                hideOverlappingLabels: false,
                style: { fontSize: '11px' },
              },
            },
          },
        },
      ],
    },
  });

  useEffect(() => {
    if (!data || typeof data !== 'object') return;

    const seriesData = [
      { x: FULL[0], y: data.repeatedOffenders ?? 0 },
      { x: FULL[1], y: data.frequentVisitors ?? 0 },
      { x: FULL[2], y: data.repeatVisitors ?? 0 },
      { x: FULL[3], y: data.loyalUsers ?? 0 },
    ];

    setChartData((prev) => ({
      ...prev,
      series: [{ name: 'User Counts', data: seriesData }],
      options: {
        ...prev.options,
        xaxis: { ...prev.options.xaxis, categories: FULL },
      },
    }));
  }, [data]);

  return (
    <div className="w-full">
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type="bar"
        height={320}
      />
    </div>
  );
};

export default RepeatedVisitorsChart;
