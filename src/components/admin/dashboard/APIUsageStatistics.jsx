import React from "react";
import UsersBasedOnCountries from "./UsersBasedOnCountries";
import APIUsageStatisticsCard from "./APIUsageStatisticsCard";

function APIUsageStatistics() {

    return (
        <section className="flex flex-wrap gap-6 items-center mt-6 mx-6 hehehe">
            <APIUsageStatisticsCard />
            <UsersBasedOnCountries />
        </section>
    );
}

export default APIUsageStatistics;
