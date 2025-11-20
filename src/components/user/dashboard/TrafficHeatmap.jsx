import React from "react";
import TrafficByTimeOfDayChart from "./TrafficByTimeOfDayChart";
import StatisticsCard from "../StatisticsCard";

function TrafficHeatmap() {
    return (
        <StatisticsCard title="Traffic by Time of Day">
            <TrafficByTimeOfDayChart />
        </StatisticsCard>
    );
}

export default TrafficHeatmap;
