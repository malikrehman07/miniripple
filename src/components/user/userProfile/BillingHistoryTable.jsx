import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { getIdTokenSafe } from "@/helper/authHelper";

function BillingHistoryTable() {
    const [billingHistory, setBillingHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchBillingHistory = async () => {
            try {
                const token = await getIdTokenSafe();
                const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v${import.meta.env.VITE_API_VERSION}/billing/history`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!res.ok) throw new Error("Failed to fetch billing history");

                const data = await res.json();
                setBillingHistory(data.billingHistory || []);
            } catch (err) {
                console.error(err);
                setError("Unable to load billing history.");
            } finally {
                setLoading(false);
            }
        };

        fetchBillingHistory();
    }, []);

    return (
        <div className="overflow-auto mt-4">
            {loading && <p className="text-sm text-gray-500">Loading billing history...</p>}
            {error && <p className="text-sm text-red-600">{error}</p>}
            {!loading && !error && billingHistory.length === 0 && (
                <p className="text-sm text-gray-500">No billing history found.</p>
            )}
            {!loading && billingHistory.length > 0 && (
                <table className="min-w-full border text-sm mt-2">
                    <thead className="bg-slate-200 text-gray-700">
                        <tr>
                            <th className="p-2 text-left">Invoice ID</th>
                            <th className="p-2 text-left">Amount</th>
                            <th className="p-2 text-left">Currency</th>
                            <th className="p-2 text-left">Status</th>
                            <th className="p-2 text-left">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {billingHistory.map((entry, idx) => (
                            <tr key={idx} className="border-b">
                                <td className="p-2">{entry.invoiceId}</td>
                                <td className="p-2">{entry.amount}</td>
                                <td className="p-2">{entry.currency}</td>
                                <td className={`p-2 font-semibold ${entry.status === "Paid" ? "text-green-600" : "text-red-600"}`}>
                                    {entry.status}
                                </td>
                                <td className="p-2">{new Date(entry.billingDate).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default BillingHistoryTable;
