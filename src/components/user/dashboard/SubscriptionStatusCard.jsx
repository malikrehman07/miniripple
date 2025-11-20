import React from "react";

const statusStyles = {
    warning: {
        bg: "bg-yellow-50",
        border: "border-yellow-300",
        text: "text-yellow-800",
        icon: "⚠️"
    },
    danger: {
        bg: "bg-red-50",
        border: "border-red-300",
        text: "text-red-800",
        icon: "🚫"
    },
    info: {
        bg: "bg-blue-50",
        border: "border-blue-300",
        text: "text-blue-800",
        icon: "ℹ️"
    }
};

const SubscriptionStatusCard = ({ message, type = "info" }) => {
    const style = statusStyles[type] || statusStyles.info;

    return (
        <div
            className={`flex justify-between items-center px-6 py-4 my-4 rounded-lg shadow-sm font-['Jost'] ${style.bg} ${style.border} border`}
        >
            <div className={`text-base font-medium flex items-center gap-2 ${style.text}`}>
                {/* <span className="text-xl">{style.icon}</span> */}
                {message}
            </div>
            {/* Optional upgrade button */}
            {/* <button className="px-4 py-2 text-sm font-semibold text-white bg-slate-900 rounded-md hover:bg-slate-800">
                Upgrade Plan
            </button> */}
        </div>
    );
};

export default SubscriptionStatusCard;
