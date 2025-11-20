import { useState, useEffect } from 'react';

const useCountries = () => {
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const res = await fetch("https://restcountries.com/v3.1/all?fields=name,cca2"); 
                // ✅ Return full data, no field limiting
                if (!res.ok) throw new Error("Failed to fetch countries");
                const data = await res.json();

                // Sort by country name but keep full object intact
                const sortedData = data.sort((a, b) => 
                    a.name.common.localeCompare(b.name.common)
                );

                setCountries(sortedData);
            } catch (err) {
                console.error("Failed to load countries", err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchCountries();
    }, []);

    return { countries, loading, error };
};

export default useCountries;
