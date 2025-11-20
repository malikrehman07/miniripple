import React, { useEffect, useState } from "react";
import MetricCard from "../MetricCard";
import { getAuth } from "firebase/auth";
import MetricCardSection from "../MetricCardSection";
import { getIdTokenSafe } from "@/helper/authHelper";

function MetricsCards() {
    const [metricsData, setMetricsData] = useState(null);

    useEffect(() => {
        const fetchMetrics = async () => {
            try {
                const token = await getIdTokenSafe();
                const res = await fetch(
                    `${import.meta.env.VITE_API_URL}/api/v${
                        import.meta.env.VITE_API_VERSION
                    }/security-threat/metrics`,
                    { headers: { Authorization: `Bearer ${token}` } },
                );
                const json = await res.json();
                if (json.success && json.metrics) {
                    setMetricsData(json.metrics);
                }
            } catch (err) {
                console.error(err);
            }
        };
        fetchMetrics();
    }, []);

    const metrics = [
        {
            title: "Total Bot Detected",
            icon: "/page/securityThreatDetection/metrics-card-1.svg",
            value: metricsData?.bots.thisMonth.toString(),
            change: "4.3%", // Placeholder change
            changeIcon:
                "https://cdn.builder.io/api/v1/image/assets/TEMP/5e234bf25d9196f569daf775dde2b90de8840974?placeholderIfAbsent=true&apiKey=a02d722199b0461aa7ba98c60ba9c66b",
            changeType: "negative",
            bgColor: "bg-red-100 border-red-200 border-2",
        },
        {
            title: "Total VPN Detected",
            icon: "/page/securityThreatDetection/metrics-card-2.svg",
            value: metricsData?.vpns.thisMonth.toString(),
            change: "5.5%",
            changeIcon:
                "https://cdn.builder.io/api/v1/image/assets/TEMP/1ea8ba2ca9e9b7c7715cc1668859ba5bcba214ba?placeholderIfAbsent=true&apiKey=a02d722199b0461aa7ba98c60ba9c66b",
            changeType: "warning",
            bgColor: "bg-yellow-100 border-yellow-200 border-2",
        },
        {
            title: "Abnormal Traffic Detected",
            icon: "/page/securityThreatDetection/metrics-card-3.svg",
            value: metricsData?.abnormalSessions.thisMonth.toString(),
            change: "5.5%",
            changeIcon:
                "https://cdn.builder.io/api/v1/image/assets/TEMP/5eb5445822137878684c08f042e074bc096e9d0d?placeholderIfAbsent=true&apiKey=a02d722199b0461aa7ba98c60ba9c66b",
            changeType: "purple",
            bgColor: "bg-purple-100 border-purple-200 border-2",
        },
    ];

    return (
        <MetricCardSection metrics={metrics}/>
    );
}

export default MetricsCards;
