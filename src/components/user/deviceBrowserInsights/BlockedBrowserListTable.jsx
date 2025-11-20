import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getAuth } from 'firebase/auth';
import { getIdTokenSafe } from '@/helper/authHelper';

const BlockedBrowserListTable = ({ refreshKey, blockedBrowsers = [] }) => {
    const [alerts, setAlerts] = useState([]);

    const fetchBrowserBlocks = async () => {
        try {
            const auth = getAuth();
            const currentUser = auth.currentUser;
            if (!currentUser) throw new Error("User not authenticated");
            const token = await currentUser.getIdToken();
            const res = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/v${import.meta.env.VITE_API_VERSION}/browser-block/all`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            const blocks = res.data?.blocks ?? [];
            
            const suspicious = blocks.map((entry) => {
                let reason = entry.reason || 'Suspicious Activity';
                return {
                    browser: entry.browserName || 'Unknown',
                    reason,
                    date: entry.blockedAt || 'Unknown',
                    status: 'Blocked'
                };
            });

            const filteredAlerts =
                blockedBrowsers.length === 0
                    ? suspicious
                    : suspicious.filter((a) =>
                          blockedBrowsers.includes(a.browser.charAt(0).toUpperCase() + a.browser.slice(1))
                      );

            setAlerts(filteredAlerts);
        } catch (error) {
            console.error("Failed to fetch browser block list", error);
        }
    };

    useEffect(() => {
        fetchBrowserBlocks();
    }, [refreshKey, JSON.stringify(blockedBrowsers)]); // triggers refetch on change

    return (
        <div className='w-full relative'>
            <div className='h-[320px] overflow-auto relative'>
                <table className='w-full text-left border-collapse'>
                    <thead className='sticky top-0 z-10 bg-red-100'>
                        <tr className='text-gray-700 text-sm'>
                            <th className='p-3 px-6'>Browser</th>
                            <th className='p-3'>Reason for Blocking</th>
                        </tr>
                    </thead>
                    <tbody>
                        {alerts.length > 0 ? (
                            alerts.map((item, idx) => (
                                <tr key={idx} className='border-b hover:bg-gray-50 text-sm'>
                                    <td className='p-3 px-6'>{item.browser}</td>
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

export default BlockedBrowserListTable;
