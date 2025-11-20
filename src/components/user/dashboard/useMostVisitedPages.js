// useMostVisitedPages.js
import { useEffect, useState } from "react";
import axios from "axios";
import { getAuth } from "firebase/auth";

export default function useMostVisitedPages() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const fetchPages = async () => {
        try {
            const auth = getAuth();
            const currentUser = auth.currentUser;
            if (!currentUser) throw new Error("User not authenticated");
            const token = await currentUser.getIdToken();
            const res = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/v${
                    import.meta.env.VITE_API_VERSION
                }/dashboard/pages/most-visited`,
                { headers: { Authorization: `Bearer ${token}` } },
            );

            if (!res.data || !Array.isArray(res.data.pages)) {
                throw new Error("Invalid format");
            }

            setData(res.data.pages);
        } catch (err) {
            console.error("Fetch failed:", err);            
            setData([])
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchPages();
        const interval = setInterval(() => {
            fetchPages(); // Re-fetch every 5 minutes
        }, 0.5 * 60 * 1000); // 5 minutes in milliseconds
        return () => clearInterval(interval); // Cleanup on unmount
    }, []);

    return { data, loading, error };
}
