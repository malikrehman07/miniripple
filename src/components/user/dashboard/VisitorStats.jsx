import React from "react";
import VisitorSessionDurationChart from "./VisitorSessionDuration";
import DeviceUsageStatisticsChart from "./DeviceUsageStatisticsChart";
import DashboardWrapper from "@/components/reusable/DashboardWrapper";
import StatisticsCard from "../StatisticsCard";

function VisitorStats() {
    return (
        <section className="grid grid-cols-1 lg:grid-cols-2 flex-1 justify-center gap-5 items-end mx-6 mt-3 hehehe">
            <VisitorSession />
            <DeviceUsage />
        </section>
    );
}

function VisitorSession() {
    return (
        <StatisticsCard title="Visitor Session Duration">
            <VisitorSessionDurationChart />
        </StatisticsCard>
    );
}

function DeviceUsage() {
    return (
        <StatisticsCard title="Device Usage Statistics">
            <DeviceUsageStatisticsChart />
        </StatisticsCard>
    );
}

export default VisitorStats;
