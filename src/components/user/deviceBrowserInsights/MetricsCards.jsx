import React, { useEffect, useState } from "react";
import MetricCard from "../MetricCard";
import { getAuth } from "firebase/auth";
import axios from "axios";
import MetricCardSection from "../MetricCardSection";
import { getIdTokenSafe } from "@/helper/authHelper";

function MetricsCards() {
    const [metrics, setMetrics] = useState([]);

    useEffect(() => {
        const fetchDeviceMetrics = async () => {
            try {
                const token = await getIdTokenSafe();
                const res = await axios.get(
                    `${import.meta.env.VITE_API_URL}/api/v${import.meta.env.VITE_API_VERSION}/device-browser-insights/device-usage-metrics`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                const data = res?.data;

                if (Array.isArray(data)) {
                    const parsedMetrics = data.map((item, index) => {
                        let config = {
                            Desktop: {
                                icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/1ea8ba2ca9e9b7c7715cc1668859ba5bcba214ba?placeholderIfAbsent=true&apiKey=a02d722199b0461aa7ba98c60ba9c66b",
                                bgColor: "bg-yellow-100 border-yellow-200 border-2",
                            },
                            Mobile: {
                                icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/1ea8ba2ca9e9b7c7715cc1668859ba5bcba214ba?placeholderIfAbsent=true&apiKey=a02d722199b0461aa7ba98c60ba9c66b",
                                bgColor: "bg-teal-100 border-teal-200 border-2",
                            },
                            Tablet: {
                                icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/1ea8ba2ca9e9b7c7715cc1668859ba5bcba214ba?placeholderIfAbsent=true&apiKey=a02d722199b0461aa7ba98c60ba9c66b",
                                bgColor: "bg-blue-100 border-blue-200 border-2",
                            },
                        }[item.title] || {
                            icon: "/icons/default.svg",
                            bgColor: "bg-gray-100 border-gray-200 border-2",
                        };

                        return {
                            title: item.title,
                            icon: config.icon,
                            value: item.value,
                            change: "0%",
                            changeIcon: "https://cdn.builder.io/api/v1/image/assets/TEMP/47c10d3a3e9efb825935c5d5ef59bb93e7eef5f9?placeholderIfAbsent=true&apiKey=a02d722199b0461aa7ba98c60ba9c66b",
                            changeType: "neutral",
                            bgColor: config.bgColor,
                        };
                    });
                    setMetrics(parsedMetrics);
                }
            } catch (err) {
                console.error("Failed to fetch device usage metrics", err);
            }
        };

        fetchDeviceMetrics();
    }, []);

    return (
        <MetricCardSection metrics={metrics} />
    );
}

export default MetricsCards;




// https://cdn.builder.io/api/v1/image/assets/TEMP/47c10d3a3e9efb825935c5d5ef59bb93e7eef5f9?placeholderIfAbsent=true&apiKey=a02d722199b0461aa7ba98c60ba9c66b
// https://cdn.builder.io/api/v1/image/assets/TEMP/b01e29215068376159551b30e0856479a40a75a0?placeholderIfAbsent=true&apiKey=a02d722199b0461aa7ba98c60ba9c66b