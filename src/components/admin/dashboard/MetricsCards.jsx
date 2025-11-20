import React, { useEffect, useState } from "react";
import axios from "axios";
import MetricCard from "@/components/user/MetricCard";

function MetricsCards() {
    const [metrics, setMetrics] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/v2/admin/dashboard-stats`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });

                const data = res.data || {};
                console.log(res)

                setMetrics([
                    {
                        title: "Total Users",
                        icon: "/admin/dashboard/metrics-card-1.svg",
                        value: data.totalUsers || 0,
                        change: "0%", // placeholder
                        changeIcon: "/admin/dashboard/metrics-card-5.svg",
                        changeType: "neutral",
                        bgColor: "bg-blue-100 border-blue-200 border-2",
                    },
                    {
                        title: "Total Properties",
                        icon: "/admin/dashboard/metrics-card-2.svg",
                        value: data.totalProperties || 0,
                        change: "0%",
                        changeIcon: "/admin/dashboard/metrics-card-5.svg",
                        changeType: "positive",
                        bgColor: "bg-teal-100 border-teal-200 border-2",
                    },
                    {
                        title: "Total Subscriptions",
                        icon: "/admin/dashboard/metrics-card-3.svg",
                        value: data.totalSubscriptions || 0,
                        change: "0%",
                        changeIcon: "/admin/dashboard/metrics-card-5.svg",
                        changeType: "warning",
                        bgColor: "bg-yellow-100 border-yellow-200 border-2",
                    },
                    {
                        title: "Active Subscriptions",
                        icon: "/admin/dashboard/metrics-card-4.svg",
                        value: data.activeSubscriptions || 0,
                        change: "0%",
                        changeIcon: "/admin/dashboard/metrics-card-5.svg",
                        changeType: "gray",
                        bgColor: "bg-gray-100 border-gray-200 border-2",
                    },
                ]);
            } catch (err) {
                console.error("Error fetching dashboard stats:", err);
                setError("Failed to load metrics.");
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (loading) {
        return (
            <div className="mt-6 mx-6 text-sm text-gray-500 font-medium">Loading metrics...</div>
        );
    }

    if (error) {
        return (
            <div className="mt-6 mx-6 text-sm text-red-500 font-medium">{error}</div>
        );
    }

    return (
        <section className="flex flex-wrap gap-6 items-center mt-6 mr-6 ml-6 hehehe">
            {metrics.map((metric, index) => (
                <MetricCard key={index} {...metric} isAdmin={true} />
            ))}
        </section>
    );
}

export default MetricsCards;
