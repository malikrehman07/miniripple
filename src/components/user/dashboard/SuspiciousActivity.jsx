import React from "react";
import SuspiciousActivityAlertsTable from "./SuspiciousActivityAlertsTable";
import useSuspiciousActivities from "./useSuspiciousActivities";
import DashboardWrapper from "@/components/reusable/DashboardWrapper";
import StatisticsCard from "../StatisticsCard";

function SuspiciousActivity() {
    const { data, loading, error } = useSuspiciousActivities();

    return (
        <StatisticsCard
            title={"Suspicious Activity Alerts"}
            error={error?.message}
            loading={loading}
            isTable>
            <SuspiciousActivityAlertsTable gaData={data} />
        </StatisticsCard>
    );
}

export default SuspiciousActivity;
