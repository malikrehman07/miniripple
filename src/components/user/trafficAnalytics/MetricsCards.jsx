import React, { useEffect, useState } from "react";
import MetricCard from "../MetricCard";
import axios from "axios";
import { getAuth } from "firebase/auth";
import MetricCardSection from "../MetricCardSection";
import { getIdTokenSafe } from "@/helper/authHelper";

function MetricsCards() {
    const [metrics, setMetrics] = useState([]);

    useEffect(() => {
        const fetchMetrics = async () => {
            try {
                const token = await getIdTokenSafe();
                const res = await axios.get(
                    `${import.meta.env.VITE_API_URL}/api/v${
                        import.meta.env.VITE_API_VERSION
                    }/traffic-analytics/traffic/metrics`,
                    { headers: { Authorization: `Bearer ${token}` } },
                );
                const data = res?.data;

                const parsedMetrics = [
                    {
                        title: "Total Visits",
                        icon: "/page/trafficAnalytics/metric-card-1.svg",
                        value: data?.totalVisits.toString(),
                        change: "0%",
                        changeIcon:
                            "https://cdn.builder.io/api/v1/image/assets/TEMP/5eb5445822137878684c08f042e074bc096e9d0d?placeholderIfAbsent=true&apiKey=a02d722199b0461aa7ba98c60ba9c66b",
                        changeType: "purple",
                        bgColor: "bg-purple-100 border-purple-200 border-2",
                    },
                    {
                        title: "Unique Visitors",
                        icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/121a526b80ba049c37517dd6e5bbe6f080bb2de7?placeholderIfAbsent=true&apiKey=a02d722199b0461aa7ba98c60ba9c66b",
                        value: data?.uniqueVisitors.toString(),
                        change: "0%",
                        changeIcon:
                            "https://cdn.builder.io/api/v1/image/assets/TEMP/b01e29215068376159551b30e0856479a40a75a0?placeholderIfAbsent=true&apiKey=a02d722199b0461aa7ba98c60ba9c66b",
                        changeType: "neutral",
                        bgColor: "bg-blue-100 border-blue-200 border-2",
                    },
                ];
                setMetrics(parsedMetrics);
            } catch (err) {
                setMetrics([
                    {
                        title: "Total Visits",
                        icon: "/page/trafficAnalytics/metric-card-1.svg",
                        value: "0",
                        change: "0%",
                        changeIcon:
                            "https://cdn.builder.io/api/v1/image/assets/TEMP/5eb5445822137878684c08f042e074bc096e9d0d?placeholderIfAbsent=true&apiKey=a02d722199b0461aa7ba98c60ba9c66b",
                        changeType: "purple",
                        bgColor: "bg-purple-100 border-purple-200 border-2",
                    },
                    {
                        title: "Unique Visitors",
                        icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/121a526b80ba049c37517dd6e5bbe6f080bb2de7?placeholderIfAbsent=true&apiKey=a02d722199b0461aa7ba98c60ba9c66b",
                        value: "0",
                        change: "0%",
                        changeIcon:
                            "https://cdn.builder.io/api/v1/image/assets/TEMP/b01e29215068376159551b30e0856479a40a75a0?placeholderIfAbsent=true&apiKey=a02d722199b0461aa7ba98c60ba9c66b",
                        changeType: "neutral",
                        bgColor: "bg-blue-100 border-blue-200 border-2",
                    },
                ]);
                console.error("Failed to fetch traffic analytics metrics", err);
            }
        };

        fetchMetrics();
    }, []);

    return (
        <MetricCardSection  metrics={metrics}/>
    );
}

export default MetricsCards;
