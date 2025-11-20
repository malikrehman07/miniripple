import React, { useEffect, useState, useMemo } from "react";
import BrowserUsageChart from "./BrowserUsageChart";
import DeviceDetectionChart from "./DeviceDetectionChart";
import axios from "axios";
import { getAuth } from "firebase/auth";
import StatisticsCard from "../StatisticsCard";
import { getIdTokenSafe } from "@/helper/authHelper";

function ChartSection() {
    return (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start mt-5 mr-6 ml-6 text-sm tracking-tight leading-none hehehe">
            <DeviceDetectionSummary />
            <BarChart />
        </section>
    );
}

function BarChart() {
    const [browserUsage, setBrowserUsage] = useState(null);

    useEffect(() => {
        const fetchBrowserUsage = async () => {
            try {
                const token = await getIdTokenSafe();
                const res = await axios.get(
                    `${import.meta.env.VITE_API_URL}/api/v${
                        import.meta.env.VITE_API_VERSION
                    }/device-browser-insights/browser-usage`,
                    { headers: { Authorization: `Bearer ${token}` } },
                );
                setBrowserUsage([{ ...res.data }]);
            } catch (err) {
                console.error("Failed to fetch browser usage", err);
            }
        };

        fetchBrowserUsage();
    }, []);

    return (
        <StatisticsCard title="Browser Usage">
            <BrowserUsageChart gaData={browserUsage} />
        </StatisticsCard>
    );
}

function DeviceDetectionSummary() {
    const [sessionData, setSessionData] = useState({
        mobile: 0,
        desktop: 0,
        tablet: 0,
    });

    useEffect(() => {
        const fetchSessionData = async () => {
            try {
                const token = await getIdTokenSafe();
                const res = await axios.get(
                    `${import.meta.env.VITE_API_URL}/api/v${
                        import.meta.env.VITE_API_VERSION
                    }/device-browser-insights/device-session-summary`,
                    { headers: { Authorization: `Bearer ${token}` } },
                );
                setSessionData(res.data);
            } catch (err) {
                console.error("Failed to fetch session data", err);
            }
        };

        fetchSessionData();
    }, []);

    const { totalMobile, totalDesktop, totalTablet } = useMemo(() => {
        const totalMobile = sessionData.mobile || 0;
        const totalDesktop = sessionData.desktop || 0;
        const totalTablet = sessionData.tablet || 0;
        return { totalMobile, totalDesktop, totalTablet };
    }, [sessionData]);

    return (
        <StatisticsCard
            title={
                <>
                    Device Breakdown
                    <span className="text-slate-600 font-normal">
                        {" "}
                        (Mobile, Desktop, Tablet)
                    </span>
                </>
            }>
            <div className="flex flex-col px-5 py-4">
                <DeviceDetectionChart
                    mobile={totalMobile}
                    desktop={totalDesktop}
                    tablet={totalTablet}
                />
                <div className="grid grid-cols-3 gap-4 mt-4 text-sm">
                    <div>
                        <p className="text-zinc-600">Mobile</p>
                        <div className="flex items-center gap-2 mt-1 font-bold text-gray-900">
                            <span className="w-2.5 h-2.5 rounded-xl bg-[#00976c]" />
                            <span>{totalMobile}</span>
                        </div>
                    </div>
                    <div>
                        <p className="text-zinc-600">Desktop</p>
                        <div className="flex items-center gap-2 mt-1 font-bold text-gray-900">
                            <span className="w-2.5 h-2.5 rounded-xl bg-[#da6925]" />
                            <span>{totalDesktop}</span>
                        </div>
                    </div>
                    <div>
                        <p className="text-zinc-600">Tablet</p>
                        <div className="flex items-center gap-2 mt-1 font-bold text-gray-900">
                            <span className="w-2.5 h-2.5 rounded-xl bg-[#416fd1]" />
                            <span>{totalTablet}</span>
                        </div>
                    </div>
                </div>
            </div>
        </StatisticsCard>
    );
}

export default ChartSection;
