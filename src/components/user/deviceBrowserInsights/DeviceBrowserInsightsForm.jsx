import React, { useState } from "react";
import TopSection from "./TopSection";
import MetricsCards from "./MetricsCards";
import ChartSection from "./ChartSection";
import BlockedDeviceList from "./BlockedDeviceList";
import BlockedBrowserList from "./BlockedBrowserList";
import BlockedOSList from "./BlockedOSList";

function DeviceBrowserInsightsForm() {
    const [refreshDeviceTable, setRefreshDeviceTable] = useState(0);
    const [refreshBrowserTable, setRefreshBrowserTable] = useState(0);
    const [refreshOSTable, setRefreshOSTable] = useState(0);

    return (
        <>
            <TopSection
                onDeviceBlockChange={() => setRefreshDeviceTable(prev => prev + 1)}
                onBrowserBlockChange={() => setRefreshBrowserTable(prev => prev + 1)}
                onOSBlockChange={() => setRefreshOSTable(prev => prev + 1)}
            />
            <MetricsCards />
            <ChartSection />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start mt-6 mr-6 ml-7 mb-8 hehehe">
                <BlockedDeviceList refreshKey={refreshDeviceTable} />
                <BlockedBrowserList refreshKey={refreshBrowserTable} />
            </div>
            <div className="mt-6 mr-6 ml-7 mb-8">
                <BlockedOSList refreshKey={refreshOSTable} />
            </div>
        </>
    );
}

export default DeviceBrowserInsightsForm;
