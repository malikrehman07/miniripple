import { useEffect, useState } from "react";
import axios from "axios";
import { getAuth } from "firebase/auth";

function useReferralTraffic() {
    const [summary, setSummary] = useState({
        direct: 0,
        organic: 0,
        social: 0,
    });
    const [sources, setSources] = useState([]); // for ReferralTrafficChart
    const [total, setTotal] = useState([]); // for ReferralTrafficChart
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const fetchReferralTraffic = async () => {
        try {
            setLoading(true);
            const auth = getAuth();
            const currentUser = auth.currentUser;
            if (!currentUser) throw new Error("User not authenticated");
            const token = await currentUser.getIdToken();
            const res = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/v${
                    import.meta.env.VITE_API_VERSION
                }/dashboard/traffic/referrals`,
                { headers: { Authorization: `Bearer ${token}` } },
            );

            const { data } = res;

            if (!data || !data.summary || !Array.isArray(data.sources)) {
                throw new Error("Invalid referral data format");
            }

            setSummary(data.summary);
            setSources(data.sources);
            setTotal(data.total);
        } catch (err) {
            console.error("❌ Failed to fetch referral traffic:", err);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchReferralTraffic();
        const interval = setInterval(() => {
            fetchReferralTraffic(); // Re-fetch every 5 minutes
        }, 0.5 * 60 * 1000); // 5 minutes in milliseconds
        return () => clearInterval(interval); // Cleanup on unmount
    }, []);

    return { summary, sources, total, loading, error };
}

export default useReferralTraffic;
