import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import MetricCard from "../MetricCard";
import MetricCardSection from "../MetricCardSection";
import { getIdTokenSafe } from "@/helper/authHelper";

const metricConfigs = {
    totalBlocked: {
        title: "Total Blocked",
        icon: "/admin/dashboard/metrics-card-1.svg",
        changeType: "negative",
        bgColor: "bg-red-100 border-red-200 border-2",
    },
    manualBlocked: {
        title: "Manual Blocked",
        icon: "/admin/dashboard/metrics-card-5.svg",
        changeType: "warning",
        bgColor: "bg-yellow-100 border-yellow-200 border-2",
    },
    autoBlocked: {
        title: "Auto Blocked",
        icon: "/admin/dashboard/metrics-card-3.svg",
        changeType: "neutral",
        bgColor: "bg-blue-100 border-blue-200 border-2",
    },
    flaggedVisitors: {
        title: "Flagged Visitors",
        icon: "/admin/dashboard/metrics-card-2.svg",
        changeType: "purple",
        bgColor: "bg-violet-100 border-violet-200 border-2",
    },
    repeatOffenders: {
        title: "Repeat Offenders",
        icon: "/admin/dashboard/metrics-card-4.svg",
        changeType: "negative",
        bgColor: "bg-red-100 border-red-200 border-2",
    },
};

function MetricsCards() {
    const [metrics, setMetrics] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMetrics = async () => {
            try {
                const token = await getIdTokenSafe();
                const response = await fetch(
                    `${import.meta.env.VITE_API_URL}/api/v${import.meta.env.VITE_API_VERSION}/blocked-suspicious-activity/metrics`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (!response.ok) {
                    throw new Error(`Error ${response.status}: ${response.statusText}`);
                }

                const data = await response.json();
                // Map metrics object to array for MetricCard, using configs
                const metricsObj = data?.metrics || {};
                const mappedMetrics = Object.entries(metricConfigs).map(([key, config]) => ({
                    ...config,
                    value: metricsObj[key] ?? "—",
                    change: metricsObj[key + "Change"] ?? "—", // If change data available
                }));
                setMetrics(mappedMetrics);
            } catch (error) {
                console.error("Failed to fetch metrics:", error);
                setError("Unable to load metrics at the moment.");
            } finally {
                setLoading(false);
            }
        };

        fetchMetrics();
    }, []);

    // Prepare fallback metrics for loading/error states
    const fallbackMetrics = Object.entries(metricConfigs).map(([key, config]) => ({
        ...config,
        value: "—",
        change: "—",
    }));

    return (
        <MetricCardSection metrics={metrics || fallbackMetrics}/>
    );
}

export default MetricsCards;
