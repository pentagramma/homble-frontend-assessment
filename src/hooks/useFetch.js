import { useState, useEffect, useCallback } from 'react';
import { getRequest } from '../axios'; // Ensure getRequest is correctly imported

const useFetch = (url, options) => {
    const [data, setData] = useState(null); // Initialize as null for single object
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const response = await getRequest(url, options);
            setData(response.data);
        } catch (error) {
            setError(error.message || 'Something went wrong!');
            console.error('Fetch error:', error);
        } finally {
            setLoading(false);
        }
    }, [url, options]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { data, loading, error };
};

export default useFetch;