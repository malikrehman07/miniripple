import React from "react";
import DashboardWrapper from "../reusable/DashboardWrapper";

const StatisticsCard = ({ title, children, loading = false, error = null, isTable = false }) => {
  return (
    <article
      className={`relative ${!isTable && "p-5"} rounded-lg border-2 border-gray-200 bg-white h-full w-full overflow-hidden`}
    >
      <h3 className={`${isTable && "px-5 pt-5"} text-sm font-bold tracking-tight leading-none text-slate-900`}>
        {title}
      </h3>
      <DashboardWrapper>
        <div className="flex flex-col mt-5 w-full">
          {loading ? (
            <p className="text-sm text-gray-500 px-6 pb-4">Loading...</p>
          ) : error ? (
            <p className="text-sm text-red-500 px-6 pb-4">{JSON.stringify(error)}</p>
          ) : (
            children
          )}
        </div>
      </DashboardWrapper>
    </article>
  );
};

export default StatisticsCard;
