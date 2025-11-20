import React, { useEffect, useState } from 'react';
import { getIdTokenSafe } from "@/helper/authHelper";
import Pagination from "../../reusable/Pagination";

const mockReferralData = [
    {
        domain: 'Google',
        source: 'Organic Search',
        visitors: '50%',
        conversions: '12%',
    },
    {
        domain: 'Facebook',
        source: 'Social Media',
        visitors: '25%',
        conversions: '8%',
    },
    {
        domain: 'Twitter/X',
        source: 'Social Media',
        visitors: '10%',
        conversions: '4%',
    },
    {
        domain: 'LinkedIn',
        source: 'Social Media',
        visitors: '8%',
        conversions: '3%',
    },
    {
        domain: 'Other Websites',
        source: 'Backlinks',
        visitors: '7%',
        conversions: '2%',
    },
];

const ReferralDomainsExternalTrafficTable = ({ data: propData }) => {
    const [data, setData] = useState(propData || mockReferralData);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalItems: 0,
        itemsPerPage: 10
    });

    const fetchReferralData = async (page = 1) => {
        setLoading(true);
        try {
            const token = await getIdTokenSafe();
            const res = await fetch(
                `${import.meta.env.VITE_API_URL}/api/v${import.meta.env.VITE_API_VERSION}/traffic-analytics/traffic/referral-domains?page=${page}&limit=${pagination.itemsPerPage}`,
                { headers: { Authorization: `Bearer ${token}` } },
            );
            const json = await res.json();
            
            if (json.success && Array.isArray(json.data)) {
                setData(json.data);
                if (json.pagination) {
                    setPagination(json.pagination);
                }
            } else {
                setData([]);
            }
        } catch (err) {
            console.error(err);
            setError("Failed to load referral data");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!propData) {
            fetchReferralData();
        }
    }, [propData]);

    const handlePrevPage = () => {
        if (pagination.currentPage > 1) {
            fetchReferralData(pagination.currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (pagination.currentPage < pagination.totalPages) {
            fetchReferralData(pagination.currentPage + 1);
        }
    };

    return (
        <div className='w-full relative'>
            <div className='h-[320px] overflow-auto relative'>
                <table className='w-full text-left border-collapse'>
                    <thead className='sticky top-0 z-10 bg-blue-200'>
                        <tr className='text-gray-700 text-sm'>
                            <th className='p-3 px-6'>Referral Domain</th>
                            <th className='p-3'>Traffic Source</th>
                            <th className='p-3'>Visitors (%)</th>
                            <th className='p-3'>Conversions (%)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan={4} className='text-center p-6 text-gray-500'>
                                    Loading...
                                </td>
                            </tr>
                        ) : error ? (
                            <tr>
                                <td colSpan={4} className='text-center p-6 text-red-500'>
                                    {error}
                                </td>
                            </tr>
                        ) : data.length > 0 ? (
                            data.map((item, idx) => (
                                <tr key={idx} className='border-b hover:bg-gray-50 text-sm'>
                                    <td className='p-3 px-6'>{item.domain}</td>
                                    <td className='p-3'>{item.source}</td>
                                    <td className='p-3'>{item.visitors}</td>
                                    <td className='p-3'>{item.conversions}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={4} className='text-center p-6 text-gray-500'>
                                    No traffic data available.
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

export default ReferralDomainsExternalTrafficTable;
