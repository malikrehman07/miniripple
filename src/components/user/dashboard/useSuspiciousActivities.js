import { useEffect, useState } from "react";
import axios from "axios";
import { getAuth } from "firebase/auth";

function useSuspiciousActivities() {
    const [data, setData] = useState([]); // API alerts array
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const fetchSuspicious = async () => {
        try {
            const auth = getAuth();
            const currentUser = auth.currentUser;
            if (!currentUser) throw new Error("User not authenticated");
            const token = await currentUser.getIdToken();
            const res = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/v${
                    import.meta.env.VITE_API_VERSION
                }/dashboard/security/suspicious-activities`,
                { headers: { Authorization: `Bearer ${token}` } },
            );
            if (!res.data || !Array.isArray(res.data.alerts)) {
                throw new Error(
                    "Invalid suspicious activities response format",
                );
            }

            setData(res.data.alerts);
        } catch (err) {
            console.error("❌ Failed to fetch suspicious activities:", err);
            setData([])
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchSuspicious();
        const interval = setInterval(() => {
            fetchSuspicious(); // Re-fetch every 5 minutes
        }, 0.5 * 60 * 1000); // 5 minutes in milliseconds
        return () => clearInterval(interval); // Cleanup on unmount
    }, []);

    return { data, loading, error };
}

export default useSuspiciousActivities;
