import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getAuth } from 'firebase/auth';
import { getIdTokenSafe } from '@/helper/authHelper';

const BlockedDeviceListTable = ({ refreshKey }) => {
    const [alerts, setAlerts] = useState([]);

    const fetchDeviceBlocks = async () => {
        try {
            const auth = getAuth();
            const currentUser = auth.currentUser;
            if (!currentUser) throw new Error("User not authenticated");
            const token = await currentUser.getIdToken();
            const res = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/v${import.meta.env.VITE_API_VERSION}/device-block/all`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            const blocks = res.data?.blocks ?? [];

            const suspicious = blocks.map((entry) => {
                let reason = entry.reason || 'Suspicious Activity';
                return {
                    device: entry.deviceType.charAt(0).toUpperCase() + entry.deviceType.slice(1) || 'Unknown',
                    reason,
                    date: entry.blockedAt || 'Unknown',
                    status: 'Blocked'
                };
            });

            setAlerts(suspicious);
        } catch (error) {
            console.error("Failed to fetch device block list", error);
        }
    };

    useEffect(() => {
        fetchDeviceBlocks();
    }, [refreshKey]);

    return (
        <div className='w-full relative'>
            <div className='h-[320px] overflow-auto relative'>
                <table className='w-full text-left border-collapse'>
                    <thead className='sticky top-0 z-10 bg-red-100'>
                        <tr className='text-gray-700 text-sm'>
                            <th className='p-3 px-6'>Device</th>
                            <th className='p-3'>Reason for Blocking</th>
                        </tr>
                    </thead>
                    <tbody>
                        {alerts.length > 0 ? (
                            alerts.map((item, idx) => (
                                <tr key={idx} className='border-b hover:bg-gray-50 text-sm'>
                                    <td className='p-3 px-6'>{item.device}</td>
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

export default BlockedDeviceListTable;
