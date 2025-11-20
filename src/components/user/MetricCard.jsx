import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import {
    selectPropertyData,
    selectDomainStatus,
    selectPropertyDomain,
    selectPropertyId,
    fetchPropertyData,
} from "@/redux/slices/propertySlice";

const getCurrentMonthYear = () => {
    const date = new Date();
    return date.toLocaleString("default", { month: "long", year: "numeric" });
};

const MetricCard = ({
    title,
    icon,
    value = "—",
    change,
    changeType = "neutral",
    bgColor = "bg-white",
    trendIcon = null,
    trendColor = "text-gray-600",
    trendPercentage = "",
    dateRange,
    isAdmin = false,
}) => {
    const dispatch = useDispatch();
    const propertyData = useSelector(selectPropertyData);
    const domainStatus = useSelector(selectDomainStatus);
    const domain = useSelector(selectPropertyDomain);
    const propertyId = useSelector(selectPropertyId);

    // 🚀 Fetch property data if missing
    useEffect(() => {
        if (!propertyData) {
            dispatch(fetchPropertyData());
        }
    }, [propertyData, dispatch]);

    // Determine if connected
    const isConnected =
        domainStatus === "active" && Boolean(domain) && Boolean(propertyId);

    console.log("isCOnected", isConnected);

    const getChangeClasses = () => {
        switch (changeType) {
            case "positive":
                return "text-emerald-600 bg-emerald-200";
            case "negative":
                return "text-red-600 bg-red-200";
            case "neutral":
                return "text-blue-500 bg-blue-200";
            case "warning":
                return "text-amber-500 bg-yellow-200";
            default:
                return "text-gray-500 bg-gray-200";
        }
    };

    return (
        <article
            className={`flex flex-col h-[145px] justify-between p-5 ${bgColor} rounded-lg shadow-sm min-w-[230px] flex-1`}>
            {/* Header (icon + title). Reserve height for up to 2 lines to keep cards equal */}
            <div className="flex gap-2 items-start mb-4">
                {icon && typeof icon === "string" ? (
                    <img
                        src={icon}
                        alt={title}
                        className="w-6 h-6 object-contain shrink-0"
                    />
                ) : (
                    <span className="shrink-0">{icon}</span>
                )}
                <h3
                    className="text-[16px] font-semibold text-slate-900 truncate"
                    title={title}>
                    {title}
                </h3>
            </div>

            {/* Metric */}
            <div className="flex items-center gap-3 mt-auto">
                <p
                    title={isAdmin ? value : isConnected ? value : "—"}
                    className={`${
                        isNaN(value)
                            ? "text-md sm:text-xl"
                            : "text-xl sm:text-3xl"
                    } font-semibold text-slate-900 truncate`}>
                    {isAdmin ? value : isConnected ? value : "—"}
                </p>

                {/* If you re-enable change badge:
        {change && (
          <div className={`flex items-center gap-1 px-2 py-1 text-xs sm:text-sm ${getChangeClasses()} rounded-sm`}>
            <span>{change}</span>
            {trendIcon && <img src={trendIcon} alt="Trend" className="w-4 h-4" />}
          </div>
        )} */}
            </div>

            <p className="text-xs sm:text-sm text-slate-700 mt-3">
                {dateRange
                    ? { dateRange }
                    : "This Month " + getCurrentMonthYear()}
            </p>
        </article>
    );
};

MetricCard.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    change: PropTypes.string,
    changeType: PropTypes.oneOf(["positive", "negative", "neutral", "warning"]),
    bgColor: PropTypes.string,
    trendIcon: PropTypes.string,
    trendColor: PropTypes.string,
    trendPercentage: PropTypes.string,
    dateRange: PropTypes.string,
};

export default MetricCard;
