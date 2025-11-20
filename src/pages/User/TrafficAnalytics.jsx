import React, { useEffect } from "react";
import TrafficAnalyticsForm from "@/components/user/trafficAnalytics/TrafficAnalyticsForm";

function TrafficAnalytics() {
    useEffect(() => {
        console.log("🟢 Traffic Analytics mounted");
        return () => {
            console.log("🔴 Traffic Analytics unmounted");
        };
    }, []);

    return <TrafficAnalyticsForm />;
}

export default TrafficAnalytics;
