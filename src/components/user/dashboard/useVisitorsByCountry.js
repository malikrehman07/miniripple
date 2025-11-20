import { useEffect, useState } from "react";
import axios from "axios";
import { getAuth } from "firebase/auth";

function useVisitorsByCountry() {
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const fetchCountryData = async () => {
        try {
            const auth = getAuth();
            const currentUser = auth.currentUser;
            if (!currentUser) throw new Error("User not authenticated");
            const token = await currentUser.getIdToken();
            const res = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/v${
                    import.meta.env.VITE_API_VERSION
                }/dashboard/visitors/countries`,
                { headers: { Authorization: `Bearer ${token}` } },
            );

            if (!res?.data?.countries || !Array.isArray(res.data.countries)) {
                throw new Error("Invalid visitors by country format");
            }
            setCountries(res.data?.countries || []);
        } catch (err) {
            console.error("❌ Failed to fetch visitor countries:", err);
            setCountries([])
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchCountryData();
        const interval = setInterval(() => {
            fetchCountryData(); // Re-fetch every 5 minutes
        }, 0.5 * 60 * 1000); // 5 minutes in milliseconds
        return () => clearInterval(interval); // Cleanup on unmount
    }, []);

    return { countries, loading, error };
}

export default useVisitorsByCountry;
