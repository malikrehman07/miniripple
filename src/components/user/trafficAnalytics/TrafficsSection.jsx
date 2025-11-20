import React, { useEffect, useMemo, useState, useCallback } from "react";
import TrafficTrendsChart from "../dashboard/TrafficTrendsChart";
import RepeatedVisitsFromTheSameIpChart from "./RepeatedVisitsFromTheSameIpChart";
import PeakTrafficHoursChart from "./PeakTrafficHoursChart";
import BounceRateSessionChart from "./BounceRateSessionChart";
import { getAuth } from "firebase/auth";
import StatisticsCard from "../StatisticsCard";
import useTrafficTrends from "../dashboard/useTrafficTrends";
import { getIdTokenSafe } from "@/helper/authHelper";

function TrafficSection() {
    return (
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start mt-5 mr-6 ml-6 text-sm tracking-tight leading-none hehehe">
            <TrafficTrends />
            <StatisticsCard title={"Peak Traffic Hours"}>
                <PeakTrafficHoursChart />
            </StatisticsCard>
            <BarChart />
            <BounceRateSessionDuration />
        </section>
    );
}

function TrafficTrends() {
    const { trafficData, loading } = useTrafficTrends();

    return (
        <StatisticsCard
            title={
                <div className="flex flex-wrap gap-10 justify-between items-center w-full max-md:max-w-full">
                    <h3 className="self-stretch my-auto font-bold text-neutral-950">
                        Traffic Trends
                    </h3>
                    <div className="flex gap-2.5 items-center self-stretch my-auto text-zinc-600">
                        <span className="self-stretch my-auto">This Month</span>
                        <img
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/2db8dd0b04e4cc6108ea3ba89fa8843ffd12ebe3?placeholderIfAbsent=true&apiKey=a02d722199b0461aa7ba98c60ba9c66b"
                            alt="Filter dropdown"
                            className="object-contain shrink-0 self-stretch my-auto w-5 aspect-square"
                        />
                    </div>
                </div>
            }
            loading={loading}>
            <TrafficTrendsChart
                gaData={trafficData}
                metricKeys={["metric1", "metric2"]}
                metricLabels={["Last 24 hrs", "Last 7 Days"]}
            />
        </StatisticsCard>
    );
}

function BarChart() {
    const [repeatedVisits, setRepeatedVisits] = useState([]);

    useEffect(() => {
        let isMounted = true;
        
        const fetchData = async () => {
            try {
                const token = await getIdTokenSafe();
                const res = await fetch(
                    `${import.meta.env.VITE_API_URL}/api/v${
                        import.meta.env.VITE_API_VERSION
                    }/traffic-analytics/traffic/repeated-visits`,
                    { headers: { Authorization: `Bearer ${token}` } },
                );
                const json = await res.json();
                if (isMounted && json.success && Array.isArray(json.data)) {
                    setRepeatedVisits(json.data);
                }
            } catch (err) {
                if (isMounted) {
                    console.error(err);
                }
            }
        };
        fetchData();
        
        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <StatisticsCard title={"Repeated Visits from the Same IP"}>
            <RepeatedVisitsFromTheSameIpChart data={repeatedVisits} />
        </StatisticsCard>
    );
}

function BounceRateSessionDuration() {
    const [bounceRate, setBounceRate] = useState(0);
    const [sessionDuration, setSessionDuration] = useState(0);
    const [chartValues, setChartValues] = useState({
        bouncePercent: '0%',
        engagementPercent: '0%',
        formattedDuration: '0m 0s'
    });

    useEffect(() => {
        let isMounted = true;
        
        const fetchData = async () => {
            try {
                const token = await getIdTokenSafe();
                const res = await fetch(
                    `${import.meta.env.VITE_API_URL}/api/v${
                        import.meta.env.VITE_API_VERSION
                    }/traffic-analytics/traffic/bounce-rate`,
                    { headers: { Authorization: `Bearer ${token}` } },
                );
                const json = await res.json();
                if (isMounted && json.success) {
                    setBounceRate(parseFloat(json.bounceRate));
                    setSessionDuration(json.averageSessionDuration); // maybe 122s = 2min 2s
                }
            } catch (err) {
                if (isMounted) {
                    console.error(err);
                }
            }
        };
        fetchData();
        
        return () => {
            isMounted = false;
        };
    }, []);

    const handleChartValuesUpdate = useCallback((values) => {
        setChartValues(values);
    }, []);

    return (
        <StatisticsCard title={"Bounce Rate | Engagement Rate"}>
            <div className="flex flex-col px-5 py-4">
                <BounceRateSessionChart
                    bounceRate={bounceRate}
                    sessionDuration={sessionDuration}
                    onValuesUpdate={handleChartValuesUpdate}
                />
                <div className="grid grid-cols-2 gap-6 mt-4 text-sm">
                    <div>
                        <p className="text-zinc-600">Bounce Rate</p>
                        <div className="flex items-center gap-2 mt-1 font-bold text-gray-900">
                            <span className="w-2.5 h-2.5 rounded-xl bg-[#dc2626]" />
                            <span>{chartValues.bouncePercent}</span>
                        </div>
                    </div>
                    <div>
                        <p className="text-zinc-600">Engagement Rate</p>
                        <div className="flex items-center gap-2 mt-1 font-bold text-gray-900">
                            <span className="w-2.5 h-2.5 rounded-xl bg-[#16a34a]" />
                            <span>{chartValues.engagementPercent}</span>
                        </div>
                    </div>
                </div>
                <div className="mt-4 text-sm">
                    <p className="text-zinc-600">Average Session Duration</p>
                    <div className="flex items-center gap-2 mt-1 font-bold text-gray-900">
                        <span className="w-2.5 h-2.5 rounded-xl bg-[#3978d7]" />
                        <span>{chartValues.formattedDuration}</span>
                    </div>
                </div>
            </div>
        </StatisticsCard>
    );
}

export default TrafficSection;
