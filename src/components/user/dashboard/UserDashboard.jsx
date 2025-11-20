// UserDashboard.jsx
import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import DomainSection from "./DomainSection";
import MetricsCards from "./MetricsCards";
import TrafficSection from "./TrafficsSection";
import CountryVisitors from "./CountryVisitors";
import PageVisits from "./PageVisits";
import SuspiciousActivity from "./SuspiciousActivity";
import VisitorStats from "./VisitorStats";
import TrafficHeatmap from "./TrafficHeatmap";
import { useDomainStatus } from "../../../helper/useDomainStatus";
import axios from "axios";
import { getIdTokenSafe } from "@/helper/authHelper";

function UserDashboard() {
    const [dashboardSummary, setDashboardSummary] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDashboardSummary = async () => {
            try {
                setLoading(true);
                const token = await getIdTokenSafe();
                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/api/v${
                        import.meta.env.VITE_API_VERSION
                    }/dashboard/summary`,
                    { headers: { Authorization: `Bearer ${token}` } },
                );
                setDashboardSummary(response.data);
                setError(null); // Clear any previous error
            } catch (err) {
                setError("Failed to load dashboard data.");
                console.error("Dashboard Summary Error:", err);
            } finally {
                setLoading(false);
            }
        };

        // Initial fetch
        fetchDashboardSummary();
        
        // Set up auto-refresh every 30 seconds
        const interval = setInterval(() => {
            fetchDashboardSummary();
        }, 30 * 1000); // 30 seconds in milliseconds
        
        // Cleanup interval on unmount
        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <DomainSection />

            <MetricsCards />
            <TrafficSection
                data={dashboardSummary?.trafficTrends}
            />
            <CountryVisitors
                data={dashboardSummary?.visitorCountries}
            />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 justify-center items-start mt-6 mr-6 ml-7 hehehe">
                <PageVisits
                    data={dashboardSummary?.mostVisitedPages}
                />
                <SuspiciousActivity
                    data={dashboardSummary?.suspiciousActivities}
                />
            </div>
            <VisitorStats
                data={dashboardSummary?.referralTraffic}
            />
            <div className="flex flex-row gap-5 justify-center items-start mt-6 mr-6 ml-7 hehehe">
                <TrafficHeatmap
                    data={dashboardSummary?.heatmap}
                />
            </div>
        </div>
    );
}

export default UserDashboard;
