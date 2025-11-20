import Pagination from "@/components/reusable/Pagination";
import { formatHumanDate } from "@/helper/dateHelper";
import React, { useEffect, useState } from "react";

const SuspiciousActivityAlertsTable = ({ gaData = [] }) => {
    const [alerts, setAlerts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5; // default page size

    useEffect(() => {
        if (!Array.isArray(gaData)) return;
        setAlerts(gaData);
        setCurrentPage(1); // reset to first page when data changes
    }, [gaData]);

    // Calculate pagination
    const totalPages = Math.ceil(alerts.length / pageSize);
    const startIndex = (currentPage - 1) * pageSize;
    const currentData = alerts.slice(startIndex, startIndex + pageSize);

    return (
        <div className="w-full relative">
            <div className="h-[320px] overflow-auto relative">
                <table className="w-full text-left border-collapse">
                    <thead className="sticky top-0 z-10 bg-blue-200">
                        <tr className="text-gray-700 text-sm">
                            <th className="p-3 px-6">IP Address</th>
                            <th className="p-3">Type</th>
                            <th className="p-3">Date</th>
                            <th className="p-3">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentData.length > 0 ? (
                            currentData.map((item, idx) => (
                                <tr
                                    key={idx}
                                    className="border-b hover:bg-gray-50 text-sm">
                                    <td className="p-3 px-6">{item.ip}</td>
                                    <td className="p-3" title={item.type}>
                                        {item.type.length > 15
                                            ? item.type.substring(0, 15) + "..."
                                            : item.type}
                                    </td>

                                    <td className="p-3">
                                        {formatHumanDate(item.date)}
                                    </td>
                                    <td className="p-3 font-semibold text-orange-500">
                                        {item.status}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={4}
                                    className="text-center p-6 text-gray-500">
                                    No suspicious activity detected.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />
        </div>
    );
};

export default SuspiciousActivityAlertsTable;
