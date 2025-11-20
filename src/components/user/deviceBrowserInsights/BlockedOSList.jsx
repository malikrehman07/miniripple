import React from "react";
import BlockedOSListTable from "./BlockedOSListTable";
import StatisticsCard from "../StatisticsCard";

function BlockedOSList({ refreshKey, blockedOS = [] }) {
    return (
        <StatisticsCard title={"List of Blocked Operating Systems"} isTable>
            <BlockedOSListTable
                refreshKey={refreshKey}
                blockedOS={blockedOS}
            />
        </StatisticsCard>
    );
}

export default BlockedOSList;
