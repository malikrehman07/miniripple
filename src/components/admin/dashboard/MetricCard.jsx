import React from "react";

function MetricCard({
    title = "Untitled",
    icon = "",
    value = "-",
    change = "",
    changeIcon = "",
    changeType = "positive",
    bgColor = "bg-white",
}) {
    // Dynamic color classes based on change type
    const changeColorClasses = {
        positive: "text-emerald-600 bg-emerald-200",
        neutral: "text-blue-500 bg-blue-200",
        warning: "text-amber-500 bg-yellow-200",
        negative: "text-red-600 bg-red-200",
        purple: "text-violet-600 bg-violet-200",
        gray: "text-gray-600 bg-gray-100",
    };

    const appliedChangeClass = changeColorClasses[changeType] || changeColorClasses["positive"];

    // Dynamic month-year string like "July 2025"
    const currentMonth = new Date().toLocaleString("default", { month: "long", year: "numeric" });

    return (
        <article
            className={`flex flex-col flex-1 shrink self-stretch p-5 my-auto ${bgColor} rounded-lg shadow-sm basis-0 min-w-[220px]`}
        >
            <div className="flex gap-2.5 items-center self-start text-base text-slate-900">
                {icon && (
                    <img
                        src={icon}
                        alt={`${title} icon`}
                        className="object-contain shrink-0 self-stretch my-auto w-5 aspect-square"
                    />
                )}
                <span className="self-stretch my-auto font-['Jost']">{title}</span>
            </div>

            <div className="flex gap-6 items-center mt-5 w-full whitespace-nowrap">
                <span className="flex-1 shrink self-stretch my-auto text-2xl font-semibold leading-none basis-3 text-slate-900 font-['Jost']">
                    {value}
                </span>

                {/* {change && changeIcon && (
                    <div
                        className={`flex gap-1 items-center self-stretch px-1.5 py-1 my-auto text-sm tracking-tight leading-none ${appliedChangeClass} rounded-sm`}
                    >
                        <span className="self-stretch my-auto font-['Amble']">{change}</span>
                        <img
                            src={changeIcon}
                            alt="Change indicator"
                            className="object-contain shrink-0 self-stretch my-auto aspect-square w-[18px]"
                        />
                    </div>
                )} */}
            </div>

            <p className="mt-5 text-sm tracking-tight leading-none text-slate-900 font-['Amble']">
                This month {currentMonth}
            </p>
        </article>
    );
}

export default MetricCard;
