import React, { useState } from "react";
import BlockedIpsListTable from "./BlockedIpsListTable";
import SearchForm from "./SearchForm";
import StatisticsCard from "../StatisticsCard";

function BlockedIpsList() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedFilter, setSelectedFilter] = useState("All");

    return (
        <StatisticsCard title={"List of Auto-Blocked & Manually Blocked IPs"} isTable>
            <SearchForm
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedFilter={selectedFilter}
                setSelectedFilter={setSelectedFilter}
            />
            <BlockedIpsListTable
                searchQuery={searchQuery}
                selectedFilter={selectedFilter}
            />
        </StatisticsCard>
    );
}

export default BlockedIpsList;
