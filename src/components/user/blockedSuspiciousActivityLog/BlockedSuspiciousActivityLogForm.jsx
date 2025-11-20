import React from "react";
import MetricsCards from "./MetricsCards";
import SearchForm from "./SearchForm";
import BlockedIpsList from "./BlockedIpsList";
import BarChart from "./BarChart";

function BlockedSuspiciousActivityLogForm() {
    return (
        <>
            <MetricsCards />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start mt-6 mr-6 ml-7 mb-8 hehehe">
                <BlockedIpsList />
                <BarChart />
            </div>
        </>
    );
}

export default BlockedSuspiciousActivityLogForm;
