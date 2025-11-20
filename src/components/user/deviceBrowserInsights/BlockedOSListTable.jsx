import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getAuth } from 'firebase/auth';

const ALLOWED_OS = [
    "windows",
    "macos",
    "linux",
    "android",
    "ios",
    "chromeos",
    "ubuntu",
    "fedora",
    "debian",
    "redhat",
    "freebsd",
    "openbsd",
    "unix"
];

const BlockedOSListTable = ({ refreshKey, blockedOS = [] }) => {
    const [alerts, setAlerts] = useState([]);
    const [osToBlock, setOsToBlock] = useState("");
    const [blockReason, setBlockReason] = useState("");
    const [loading, setLoading] = useState(false);

    const fetchOSBlocks = async () => {
        try {
            const auth = getAuth();
            const currentUser = auth.currentUser;
            if (!currentUser) throw new Error("User not authenticated");
            const token = await currentUser.getIdToken();
            const res = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/v${import.meta.env.VITE_API_VERSION}/os-block/all`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            const blocks = res.data?.blocks ?? [];
            
            const suspicious = blocks.map((entry) => {
                let reason = entry.reason || 'Suspicious Activity';
                return {
                    os: entry.osName || 'Unknown',
                    reason,
                    date: entry.blockedAt || 'Unknown',
                    status: 'Blocked'
                };
            });

            const filteredAlerts =
                blockedOS.length === 0
                    ? suspicious
                    : suspicious.filter((a) =>
                          blockedOS.includes(a.os.charAt(0).toUpperCase() + a.os.slice(1))
                      );

            setAlerts(filteredAlerts);
        } catch (error) {
            console.error("Failed to fetch OS block list", error);
        }
    };

    // Add OS block
    const handleBlockOS = async (e) => {
        e.preventDefault();
        if (!osToBlock) return;
        setLoading(true);
        try {
            const auth = getAuth();
            const currentUser = auth.currentUser;
            if (!currentUser) throw new Error("User not authenticated");
            const token = await currentUser.getIdToken();
            await axios.post(
                `${import.meta.env.VITE_API_URL}/api/v${import.meta.env.VITE_API_VERSION}/os-block/block`,
                {
                    osName: osToBlock,
                    reason: blockReason
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setOsToBlock("");
            setBlockReason("");
            fetchOSBlocks();
        } catch (err) {
            console.error("Failed to block OS", err);
        }
        setLoading(false);
    };

    // Unblock OS
    const handleUnblockOS = async (os) => {
        setLoading(true);
        try {
            const auth = getAuth();
            const currentUser = auth.currentUser;
            if (!currentUser) throw new Error("User not authenticated");
            const token = await currentUser.getIdToken();
            await axios.post(
                `${import.meta.env.VITE_API_URL}/api/v${import.meta.env.VITE_API_VERSION}/os-block/unblock`,
                {
                    osName: os
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            fetchOSBlocks();
        } catch (err) {
            console.error("Failed to unblock OS", err);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchOSBlocks();
    }, [refreshKey, JSON.stringify(blockedOS)]);

    return (
        <div className='w-full relative'>
            <div className='h-[320px] overflow-auto relative'>
                <table className='w-full text-left border-collapse'>
                    <thead className='sticky top-0 z-10 bg-red-100'>
                        <tr className='text-gray-700 text-sm'>
                            <th className='p-3 px-6'>Operating System</th>
                            <th className='p-3'>Reason for Blocking</th>
                        </tr>
                    </thead>
                    <tbody>
                        {alerts.length > 0 ? (
                            alerts.map((item, idx) => (
                                <tr key={idx} className='border-b hover:bg-gray-50 text-sm'>
                                    <td className='p-3 px-6'>{item.os.charAt(0).toUpperCase() + item.os.slice(1)}</td>
                                    <td className='p-3'>{item.reason}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={2} className='text-center p-6 text-gray-500'>
                                    No suspicious activity detected.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BlockedOSListTable;
