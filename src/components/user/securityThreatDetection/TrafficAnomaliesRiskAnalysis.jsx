import React from "react";
import TrafficAnomaliesRiskAnalysisTable from "./TrafficAnomaliesRiskAnalysisTable";
import StatisticsCard from "../StatisticsCard";

function TrafficAnomaliesRiskAnalysis() {
    return (
        <StatisticsCard title="Traffic Anomalies & Risk Analysis Table" isTable>
            <TrafficAnomaliesRiskAnalysisTable />
        </StatisticsCard>
    );
}

export default TrafficAnomaliesRiskAnalysis;
