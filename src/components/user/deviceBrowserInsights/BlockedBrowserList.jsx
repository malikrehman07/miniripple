import React from "react";
import BlockedBrowserListTable from "./BlockedBrowserListTable";
import StatisticsCard from "../StatisticsCard";

function BlockedBrowserList({ refreshKey, blockedBrowsers = [] }) {
    return (
        <StatisticsCard title={"List of Blocked Browsers"} isTable>
            <BlockedBrowserListTable
                refreshKey={refreshKey}
                blockedBrowsers={blockedBrowsers}
            />
        </StatisticsCard>
    );
}

export default BlockedBrowserList;
