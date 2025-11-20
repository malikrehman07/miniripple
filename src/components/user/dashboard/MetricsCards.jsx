import React, { useEffect, useState } from "react";
import MetricCard from "../MetricCard";
import { getAuth } from "firebase/auth";
import axios from "axios";
import MetricCardSection from "../MetricCardSection";
import { getIdTokenSafe } from "@/helper/authHelper";

const metricConfigs = {
    activeUsers: {
        title: "Active Users",
        icon: "/page/dashboard/metrics-card-1.svg",
        changeIcon: "/page/dashboard/metrics-card-2.svg",
        changeType: "positive",
        bgColor: "bg-teal-100 border-teal-200 border-2",
    },
    vpnUsers: {
        title: "VPN Users",
        icon: "/page/dashboard/metrics-card-3.svg",
        changeIcon: "/page/dashboard/metrics-card-4.svg",
        changeType: "neutral",
        bgColor: "bg-blue-100 border-blue-200 border-2",
    },
    repeatedVisitors: {
        title: "Repeated Visitors",
        icon: "/page/dashboard/metrics-card-5.svg",
        changeIcon: "/page/dashboard/metrics-card-6.svg",
        changeType: "warning",
        bgColor: "bg-yellow-100 border-yellow-200 border-2",
    },
    botsDetected: {
        title: "Bots Detected",
        icon: "/page/dashboard/metrics-card-7.svg",
        changeIcon: "/page/dashboard/metrics-card-8.svg",
        changeType: "negative",
        bgColor: "bg-red-100 border-red-200 border-2",
    },
    mostUsedBrowser: {
        title: "Most Used Browser",
        icon: "/page/dashboard/metrics-card-9.svg",
        changeIcon: "/page/dashboard/metrics-card-10.svg",
        changeType: "purple",
        bgColor: "bg-violet-100 border-violet-200 border-2",
    },
};

function MetricsCards() {
    const [metrics, setMetrics] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMetrics = async () => {
            try {
                const token = await getIdTokenSafe();
                const res = await axios.get(
                    `${import.meta.env.VITE_API_URL}/api/v2/dashboard/metrics`,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    },
                );

                const apiData = res.data;
                const mappedMetrics = Object.entries(apiData)
                    .map(([key, value]) => {
                        const config = metricConfigs[key];
                        if (!config) return null;
                        return {
                            title: config.title,
                            icon: config.icon,
                            changeIcon: config.changeIcon,
                            changeType: config.changeType,
                            bgColor: config.bgColor,
                            value: value?.value ?? "-",
                            change: value?.change ?? "0%",
                        };
                    })
                    .filter(Boolean);

                setMetrics(mappedMetrics);
                setError(null); // Clear any previous error
            } catch (err) {
                console.error("Failed to fetch dashboard metrics:", err);
                setError("Unable to load dashboard metrics.");
            }
        };

        // Initial fetch
        fetchMetrics();
        
        // Set up auto-refresh every 30 seconds
        const interval = setInterval(() => {
            fetchMetrics();
        }, 30 * 1000); // 30 seconds in milliseconds
        
        // Cleanup interval on unmount
        return () => clearInterval(interval);
    }, []);

    // Prepare fallback UI if API call was skipped
    const fallbackMetrics = Object.entries(metricConfigs).map(
        ([key, config]) => ({
            ...config,
            value: "—",
            change: "—",
        }),
    );

    return (
        <MetricCardSection
            metrics={metrics.length ? metrics : fallbackMetrics}
        />
    );
}

export default MetricsCards;
