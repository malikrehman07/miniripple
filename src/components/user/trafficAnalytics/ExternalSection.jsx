import React, { useEffect, useMemo, useState } from "react";
import RealTimeVsReturningUsersChart from "./RealTimeVsReturningUsersChart";
import ReferralDomainsExternalTrafficTable from "./ReferralDomainsExternalTrafficTable";
import { getAuth } from "firebase/auth";
import StatisticsCard from "../StatisticsCard";
import { getIdTokenSafe } from "@/helper/authHelper";

function ExternalSection() {
    const [referralData, setReferralData] = useState([]);

    useEffect(() => {
        let isMounted = true;
        
        const fetchData = async () => {
            try {
                const token = await getIdTokenSafe();
                const res = await fetch(
                    `${import.meta.env.VITE_API_URL}/api/v${
                        import.meta.env.VITE_API_VERSION
                    }/traffic-analytics/traffic/referral-domains`,
                    { headers: { Authorization: `Bearer ${token}` } },
                );
                const json = await res.json();
                if (isMounted && json.success && Array.isArray(json.data)) {
                    setReferralData(json.data);
                }
            } catch (err) {
                if (isMounted) {
                    console.error(err);
                }
            }
        };
        fetchData();
        
        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start mt-5 mr-6 ml-6 text-sm tracking-tight leading-none hehehe">
            <RealTimeVsReturningUsers />
            <StatisticsCard title="Referral Traffic Table" isTable>
                <ReferralDomainsExternalTrafficTable data={referralData} />
            </StatisticsCard>
        </section>
    );
}
function RealTimeVsReturningUsers() {
    const [realTimeUsers, setRealTimeUsers] = useState(0);
    const [realTimePercentage, setRealTimePercentage] = useState("0%");
    const [returningUsers, setReturningUsers] = useState(0);
    const [returningPercentage, setReturningPercentage] = useState("0%");

    useEffect(() => {
        let isMounted = true;
        
        const fetchData = async () => {
            try {
                const token = await getIdTokenSafe();
                const res = await fetch(
                    `${import.meta.env.VITE_API_URL}/api/v${
                        import.meta.env.VITE_API_VERSION
                    }/traffic-analytics/traffic/user-types`,
                    { headers: { Authorization: `Bearer ${token}` } },
                );
                const json = await res.json();
                if (isMounted && json.success) {
                    setRealTimeUsers(json.realTimeUsers);
                    setRealTimePercentage(json.realTimePercentage);
                    setReturningUsers(json.returningUsers);
                    setReturningPercentage(json.returningPercentage);
                }
            } catch (err) {
                if (isMounted) {
                    console.error(err);
                }
            }
        };
        fetchData();
        
        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <StatisticsCard title={"Real-Time vs. Returning Users"}>
            <div className="flex flex-col px-5 py-4">
                <RealTimeVsReturningUsersChart
                    realTimeUsers={realTimeUsers}
                    returningUsers={returningUsers}
                />
                <div className="grid grid-cols-2 gap-6 mt-4 text-sm">
                    <div>
                        <p className="text-zinc-600">Real-Time</p>
                        <div className="flex items-center gap-2 mt-1 font-bold text-gray-900">
                            <span className="w-2.5 h-2.5 rounded-xl bg-[#e29400]" />
                            <span>{realTimePercentage}</span>
                        </div>
                    </div>
                    <div>
                        <p className="text-zinc-600">Returning Users</p>
                        <div className="flex items-center gap-2 mt-1 font-bold text-gray-900">
                            <span className="w-2.5 h-2.5 rounded-xl bg-[#059669]" />
                            <span>{returningPercentage}</span>
                        </div>
                    </div>
                </div>
            </div>
        </StatisticsCard>
    );
}

// function ReferralDomainsExternalTrafficTableWrapper() {
//     const [referralData, setReferralData] = useState([]);

//     useEffect(() => {
//         fetch(`${import.meta.env.VITE_API_URL}/api/v${import.meta.env.VITE_API_VERSION}/traffic-analytics/traffic/referral-domains`)
//             .then(res => res.json())
//             .then(json => {
//                 if (json.success && Array.isArray(json.data)) {
//                     setReferralData(json.data);
//                 }
//             })
//             .catch(console.error);
//     }, []);

//     return <ReferralDomainsExternalTrafficTable data={referralData} />;
// }

export default ExternalSection;
