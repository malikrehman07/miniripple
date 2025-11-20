import React, { useMemo } from "react";
import TrafficTrendsChart from "./TrafficTrendsChart";
import ReferralTrafficChart from "./ReferralTrafficChart";
import useTrafficTrends from "./useTrafficTrends";
import useReferralTraffic from "./useReferralTraffic";
import DashboardWrapper from "@/components/reusable/DashboardWrapper";
import StatisticsCard from "../StatisticsCard";
function TrafficSection() {
    // const { trafficData, loading, error } = useTrafficTrends();
    const { trafficData, loading, error } = useTrafficTrends();

    return (
        // <section className="flex flex-wrap gap-6 items-start mt-5 mr-6 ml-6 text-sm tracking-tight leading-none hehehe">
        //     <TrafficTrends
        //         data={formattedTrendData}
        //         isLoading={loading}
        //         error={error}
        //     />
        //     <ReferralTraffic data={dashboardData?.referralTraffic || []} />
        // </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start mt-5 mr-6 ml-6 text-sm tracking-tight leading-none hehehe">
            <TrafficTrends
                data={trafficData}
                isLoading={loading}
                error={error}
            />
            <ReferralTraffic/>
        </section>
    );
}

export function TrafficTrends({ data, isLoading, error }) {
    return (
        <StatisticsCard
            title="Traffic Trends"
            loading={isLoading}>
            <TrafficTrendsChart
                gaData={data}
                metricKeys={["metric1", "metric2"]}
                metricLabels={["Last 24 hrs", "Last 7 Days"]}
            />
        </StatisticsCard>
    );
}

function ReferralTraffic() {
    const { summary, sources, total, loading, error } =
        useReferralTraffic();

    return (
        <StatisticsCard
            title={
                <>
                    Referral Traffic{" "}
                    <span className="font-normal text-[rgba(77,81,88,1)]">
                        (Sources of Traffic)
                    </span>
                </>
            }>
            <>
                <ReferralTrafficChart gaData={sources} total={total} />
                <div className="flex gap-10 justify-between items-center mt-10 w-full whitespace-nowrap">
                    <div className="self-stretch my-auto">
                        <p className="text-zinc-600">Direct</p>
                        <div className="flex gap-2 items-center mt-1 font-bold text-gray-900">
                            <span className="w-2.5 h-2.5 rounded-xl bg-slate-900" />
                            <span>{summary.direct}</span>
                        </div>
                    </div>
                    <div className="flex flex-col self-stretch my-auto">
                        <p className="text-zinc-600">Organic</p>
                        <div className="flex gap-2 items-center mt-1 font-bold text-gray-900">
                            <span className="w-2.5 h-2.5 bg-amber-600 rounded-xl" />
                            <span>{summary.organic}</span>
                        </div>
                    </div>
                    <div className="self-stretch my-auto">
                        <p className="text-zinc-600">Social</p>
                        <div className="flex gap-2 items-center mt-1 font-bold text-gray-900">
                            <span className="w-2.5 h-2.5 bg-blue-500 rounded-xl" />
                            <span>{summary.social}</span>
                        </div>
                    </div>
                </div>
            </>
        </StatisticsCard>
    );
}

export default TrafficSection;
