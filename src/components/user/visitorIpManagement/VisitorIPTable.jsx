"use client";
import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { getIdTokenSafe } from "@/helper/authHelper";
import Pagination from "../../reusable/Pagination";

const VisitorIPTable = ({ refetch }) => {
    const [visitorData, setVisitorData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalItems: 0,
        itemsPerPage: 10
    });

    const fetchVisitorData = async (page = 1) => {
        setLoading(true);
        try {
            const token = await getIdTokenSafe();
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v2/visitor-ip-management/visitors?page=${page}&limit=${pagination.itemsPerPage}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const json = await res.json();
            if (json.success && json.data) {
                setVisitorData(json.data);
                if (json.pagination) {
                    setPagination(json.pagination);
                }
            } else {
                setVisitorData([]);
            }
        } catch (err) {
            setError("Failed to fetch visitor data");
            console.error("Visitor fetch error:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVisitorData();
    }, [refetch]);

    const handlePrevPage = () => {
        if (pagination.currentPage > 1) {
            fetchVisitorData(pagination.currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (pagination.currentPage < pagination.totalPages) {
            fetchVisitorData(pagination.currentPage + 1);
        }
    };

    return (
        <div className="w-full overflow-x-auto max-w-full">
            <div className="relative min-w-[600px]">
                <table className="w-full text-left border-collapse">
                    <thead className="sticky top-0 z-10 bg-blue-200">
                        <tr className="text-gray-700 text-sm">
                            <th className="p-3 px-6">IP Id</th>
                            <th className="p-3">IP Address</th>
                            <th className="p-3">Added On</th>
                            <th className="p-3">Last Activity</th>
                            <th className="p-3">City</th>
                            <th className="p-3">Country</th>
                            <th className="p-3">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan={7} className="text-center p-6 text-gray-500">
                                    Loading...
                                </td>
                            </tr>
                        ) : error ? (
                            <tr>
                                <td colSpan={7} className="text-center p-6 text-red-500">
                                    Failed to load visitor data.
                                </td>
                            </tr>
                        ) : visitorData.length > 0 ? (
                            visitorData.map((item, idx) => (
                                <tr key={idx} className="border-b hover:bg-gray-50 text-sm">
                                    <td className="p-3 px-6">{item.id}</td>
                                    <td className="p-3">{item.ipAddress}</td>
                                    <td className="p-3">{item.addedOn}</td>
                                    <td className="p-3">{item.lastActivity}</td>
                                    <td className="p-3">{item.city}</td>
                                    <td className="p-3">{item.country}</td>
                                    <td className="p-3">
                                        <span className={item.statusColor}>{item.status}</span>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={7} className="text-center p-6 text-gray-500">
                                    No visitor data available.
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

export default VisitorIPTable;
