import React from "react";
import MetricCard from "./MetricCard";

const MetricCardSection = ({ metrics }) => {
    return (
        <section className="flex flex-wrap gap-4 m-6 items-center justify-between">
            {metrics.map((metric, index) => (
                <MetricCard key={index} {...metric} />
            ))}
        </section>
    );
};

export default MetricCardSection;
