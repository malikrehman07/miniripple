import React from "react";
import BlockedDeviceListTable from "./BlockedDeviceListTable";
import { useDeviceFilter } from "./DeviceFilterProvider";
import StatisticsCard from "../StatisticsCard";

function BlockedDeviceList(refreshKey) {
    const { blockedDevices } = useDeviceFilter();

    return (
        <StatisticsCard title={"List of Blocked Devices"} isTable>
            <BlockedDeviceListTable refreshKey={refreshKey} />
        </StatisticsCard>
    );
}

export default BlockedDeviceList;
