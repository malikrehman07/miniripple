import React from "react";
import DeviceBrowserInsightsForm from "@/components/user/deviceBrowserInsights/DeviceBrowserInsightsForm";
import { DeviceFilterProvider } from "@/components/user/deviceBrowserInsights/DeviceFilterProvider";

function DeviceBrowserInsights() {
    return (
        <DeviceFilterProvider>
            <DeviceBrowserInsightsForm />
        </DeviceFilterProvider>
    );
}

export default DeviceBrowserInsights;