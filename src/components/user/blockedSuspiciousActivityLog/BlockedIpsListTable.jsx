import React, { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { getIdTokenSafe } from '@/helper/authHelper';
import SuccessButton from '../../auth/SuccessButton';
import Pagination from '@/components/reusable/Pagination';

const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString('en-GB').replace(/\//g, '-');
};

const BlockedIpsListTable = ({ searchQuery, selectedFilter }) => {
    const [ips, setIps] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [debouncedSearch, setDebouncedSearch] = useState("");

    // Modal state
    const [showConfirm, setShowConfirm] = useState(false);
    const [targetIp, setTargetIp] = useState(null);
    const [unblockLoading, setUnblockLoading] = useState(false);
    const [unblockError, setUnblockError] = useState("");

    // Debounce searchQuery
    useEffect(() => {
        const handler = setTimeout(() => setDebouncedSearch(searchQuery), 400);
        return () => clearTimeout(handler);
    }, [searchQuery]);

    // Fetch blocked IPs
    useEffect(() => {
        const fetchBlockedIps = async () => {
            setLoading(true);
            try {
                const token = await getIdTokenSafe();

                // Map filter
                let filterParam = '';
                if (selectedFilter && selectedFilter !== 'All') {
                    if (selectedFilter === 'Auto Blocked') filterParam = '&blockType=auto';
                    else if (selectedFilter === 'Manual Blocked') filterParam = '&blockType=manual';
                }

                const response = await fetch(
                    `${import.meta.env.VITE_API_URL}/api/v${import.meta.env.VITE_API_VERSION}/blocked-suspicious-activity/blocked-ips?page=${page}&limit=6${debouncedSearch ? `&search=${encodeURIComponent(debouncedSearch)}` : ''}${filterParam}`,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (!response.ok) {
                    let errMsg = `Error ${response.status}: ${response.statusText}`;
                    let errorBody = '';
                    try {
                        errorBody = await response.text();
                        errMsg += `\nResponse body: ${errorBody}`;
                    } catch {}
                    throw new Error(errMsg);
                }

                const result = await response.json();
                setIps(result.ips || []);
                setTotalPages(result.pagination?.totalPages || 1);
            } catch (err) {
                console.error('Error fetching blocked IPs:', err);
                setError('Failed to load blocked IPs.');
            } finally {
                setLoading(false);
            }
        };

        fetchBlockedIps();
    }, [page, debouncedSearch, selectedFilter]);

    // Reset page when filters/search changes
    useEffect(() => {
        setPage(1);
    }, [debouncedSearch, selectedFilter]);

    const handleUnblock = (ip) => {
        setTargetIp(ip);
        setShowConfirm(true);
        setUnblockError("");
    };

    const confirmUnblock = async () => {
        if (!targetIp) return;
        setUnblockLoading(true);
        setUnblockError("");
        try {
            const auth = getAuth();
            const currentUser = auth.currentUser;
            if (!currentUser) throw new Error("User not authenticated");
            const token = await currentUser.getIdToken();

            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v${import.meta.env.VITE_API_VERSION}/blocked-ip/unblock`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ ip: targetIp })
            });

            if (!response.ok) {
                let errMsg = `Error ${response.status}: ${response.statusText}`;
                let errorBody = '';
                try {
                    errorBody = await response.text();
                    errMsg += `\nResponse body: ${errorBody}`;
                } catch {}
                throw new Error(errMsg);
            }

            // Remove IP from UI
            setIps((prev) => prev.filter((item) => item.ip !== targetIp));
            setShowConfirm(false);
            setTargetIp(null);
        } catch (err) {
            setUnblockError(err.message || "Failed to unblock IP.");
        } finally {
            setUnblockLoading(false);
        }
    };

    const cancelUnblock = () => {
        setShowConfirm(false);
        setTargetIp(null);
        setUnblockError("");
    };

    return (
        <div className="w-full relative flex-1">
            {loading && (
                <p className="p-4 text-sm text-gray-500">Loading blocked IPs...</p>
            )}
            {error && (
                <p className="p-4 text-sm text-red-500">{error}</p>
            )}
            {!loading && !error && (
                <>
                    <div className="h-[360px] overflow-auto relative">
                        <table className="w-full text-left border-collapse text-sm">
                            <thead className="sticky top-0 z-10 bg-blue-200 text-gray-700">
                                <tr>
                                    <th className="p-3 px-6">Blocked IP</th>
                                    <th className="p-3">Block Type</th>
                                    <th className="p-3">Reason</th>
                                    <th className="p-3">Date Blocked</th>
                                    <th className="p-3">Status</th>
                                    <th className="p-3">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ips.length > 0 ? (
                                    ips.map((item, idx) => (
                                        <tr key={idx} className="border-b hover:bg-gray-50">
                                            <td className="p-3 px-6 whitespace-nowrap">{item.ip}</td>
                                            <td className="p-3 whitespace-nowrap">{item.blockType}</td>
                                            <td className="p-3 whitespace-nowrap">{item.reason}</td>
                                            <td className="p-3 whitespace-nowrap">{formatDate(item.blockedAt)}</td>
                                            <td className="p-3 whitespace-nowrap">
                                                {item.isActive ? (
                                                    <span className="text-green-600">Active</span>
                                                ) : (
                                                    <span className="text-gray-400">Expired</span>
                                                )}
                                            </td>
                                            <td className="p-3 whitespace-nowrap">
                                                <button
                                                    onClick={() => handleUnblock(item.ip)}
                                                    className="text-xs px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 transition"
                                                >
                                                    Unblock
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={6} className="text-center p-6 text-gray-500">
                                            No blocked IPs found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* ✅ Reusable Pagination */}
                    <Pagination
                        currentPage={page}
                        totalPages={totalPages}
                        onPageChange={setPage}
                    />
                </>
            )}

            {/* Confirmation Modal */}
            {showConfirm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                    <section className="flex flex-col items-center px-8 py-6 rounded shadow-sm bg-neutral-50 w-[370px]">
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/753/753345.png"
                            alt="Warning"
                            className="object-contain max-w-full aspect-square w-[70px]"
                        />
                        <h2 className="my-4 text-lg tracking-tight leading-tight text-red-700 font-semibold text-center">
                            Are you sure you want to unblock this IP?
                        </h2>
                        <div className="text-sm text-slate-700 mb-2">{targetIp}</div>
                        {unblockError && <div className="text-xs text-red-500 mb-2">{unblockError}</div>}
                        <div className="flex gap-4 w-full mt-2">
                            <SuccessButton onClick={cancelUnblock}>
                                Cancel
                            </SuccessButton>
                            <SuccessButton onClick={confirmUnblock}>
                                {unblockLoading ? 'Unblocking...' : 'Unblock'}
                            </SuccessButton>
                        </div>
                    </section>
                </div>
            )}
        </div>
    );
};

export default BlockedIpsListTable;
