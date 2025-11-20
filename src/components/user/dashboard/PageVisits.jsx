import React from "react";
import MostVisitedPagesChart from "./MostVisitedPages";
import useMostVisitedPages from "./useMostVisitedPages";
import DashboardWrapper from "@/components/reusable/DashboardWrapper";
import StatisticsCard from "../StatisticsCard";

function PageVisits() {
    const { data, loading, error } = useMostVisitedPages();

    return (
        <StatisticsCard title={"Most Visited Pages"}>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p className="text-red-500 text-sm">Failed to load pages</p>
            ) : (
                <MostVisitedPagesChart gaData={data} />
            )}
        </StatisticsCard>
    );
}

export default PageVisits;
