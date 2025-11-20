import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { getIdTokenSafe } from "@/helper/authHelper";
import Pagination from "../../reusable/Pagination";

const TrafficAnomaliesRiskAnalysisTable = () => {
    const [alerts, setAlerts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalItems: 0,
        itemsPerPage: 10
    });

    const propertyId = localStorage.getItem("propertyID");

    const fetchAnomalies = async (page = 1) => {
        setLoading(true);
        try {
            const url = `${import.meta.env.VITE_API_URL}/api/v${import.meta.env.VITE_API_VERSION}/security-threat/anomalies?propertyId=${propertyId}&page=${page}&limit=${pagination.itemsPerPage}`;
            const token = await getIdTokenSafe();
            const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
            const json = await res.json();

            if (json?.success && Array.isArray(json.anomalies)) {
                setAlerts(json.anomalies);
                if (json.pagination) {
                    setPagination(json.pagination);
                }
            } else {
                setAlerts([]);
            }
        } catch (err) {
            console.error("Anomaly fetch error:", err);
            setError("Failed to load traffic anomalies.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAnomalies();
    }, [propertyId]);

    const handlePrevPage = () => {
        if (pagination.currentPage > 1) {
            fetchAnomalies(pagination.currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (pagination.currentPage < pagination.totalPages) {
            fetchAnomalies(pagination.currentPage + 1);
        }
    };

    return (
        <div className="w-full relative">
            <div className="h-[320px] overflow-auto relative">
                <table className="w-full text-left border-collapse">
                    <thead className="sticky top-0 z-10 bg-blue-200">
                        <tr className="text-gray-700 text-sm">
                            <th className="p-3 px-6">IP Address</th>
                            <th className="p-3">Anomaly Type</th>
                            <th className="p-3">Date & Time</th>
                            <th className="p-3">Risk Score</th>
                            <th className="p-3">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan={4} className="text-center p-6 text-gray-500">
                                    Loading anomalies...
                                </td>
                            </tr>
                        ) : error ? (
                            <tr>
                                <td colSpan={4} className="text-center p-6 text-red-500">
                                    {error}
                                </td>
                            </tr>
                        ) : alerts.length > 0 ? (
                            alerts.map((item, idx) => (
                                <tr key={idx} className="border-b hover:bg-gray-50 text-sm">
                                    <td className="p-3 px-6 font-mono">{item.ip || "—"}</td>
                                    <td className="p-3 font-medium">{item.type}</td>
                                    <td className="p-3">{new Date(item.datetime).toLocaleString()}</td>
                                    <td className="p-3">{item.riskScore}</td>
                                    <td className={`p-3 font-semibold ${item.status === "Flagged" ? "text-red-500" : "text-green-600"}`}>
                                        {item.status}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={4} className="text-center p-6 text-gray-500">
                                    No anomalies detected.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <Pagination
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
                onPrevPage={handlePrevPage}
                onNextPage={handleNextPage}
                itemsPerPage={pagination.itemsPerPage}
                totalItems={pagination.totalItems}
                loading={loading}
            />
        </div>
    );
};

export default TrafficAnomaliesRiskAnalysisTable;
