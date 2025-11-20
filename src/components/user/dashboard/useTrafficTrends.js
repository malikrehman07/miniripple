import { useEffect, useState } from "react";
import axios from "axios";
import { getAuth } from "firebase/auth";
import { getIdTokenSafe } from "@/helper/authHelper";

function useTrafficTrends() {
    const [trafficData, setTrafficData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const fetchTrends = async () => {
        try {
            setLoading(true);            
            const token = await getIdTokenSafe();
            const res = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/v${
                    import.meta.env.VITE_API_VERSION
                }/dashboard/traffic/trends`,
                { headers: { Authorization: `Bearer ${token}` } },
            );
            const rawArray = res.data?.data; // <- ✅ This is the actual array

            if (!Array.isArray(rawArray)) {
                throw new Error("Traffic trends data is not an array.");
            }

            const transformed = rawArray.map((item) => {
                return {
                    dateHour: item.dateHour,
                    metric1: item.lastOneDay,
                    metric2: item.lastSevenDays,
                };
            });

            setTrafficData(transformed);
            setError(null); // Clear any previous error
        } catch (err) {
            console.error("❌ Failed to fetch traffic trends:", err);
            setError(err);
            setLoading(false);
            setTrafficData([]); // Ensure data doesn't stay stale
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchTrends();
        const interval = setInterval(() => {
            fetchTrends(); // Re-fetch every 5 minutes
        }, 0.5 * 60 * 1000); // 5 minutes in milliseconds
        return () => clearInterval(interval); // Cleanup on unmount
    }, []);

    return { trafficData, loading, error };
}

export default useTrafficTrends;
