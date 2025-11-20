import React from "react";
import MetricsCards from "./MetricsCards";
import ChartSection from "./ChartSection";
import TrafficAnomaliesRiskAnalysis from "./TrafficAnomaliesRiskAnalysis";

function SecurityThreatDetectionForm() {
    return (
        <>
            <MetricsCards />
            <ChartSection />
            <div className="grid grid-cols-1 gap-5 items-start mt-6 mr-6 ml-7">
                <TrafficAnomaliesRiskAnalysis />
            </div>
        </>
    );
}

export default SecurityThreatDetectionForm;
