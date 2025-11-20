import React from "react";
import OffendersChart from "./OffendersChart";
import StatisticsCard from "../StatisticsCard";

function BarChart() {
    return (
        <StatisticsCard title={"Flagged Visitors & Repeat Offenders"}>
            <OffendersChart />
        </StatisticsCard>
    );
}

export default BarChart;
