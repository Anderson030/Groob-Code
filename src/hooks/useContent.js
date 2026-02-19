import { useState, useEffect, useCallback } from 'react';
import { contentService } from '../services/content.service';

/**
 * Generic hook for fetching data from a service method
 */
const useFetch = (fetchMethod) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const result = await fetchMethod();
            setData(result);
        } catch (err) {
            setError(err.message || 'Error fetching data');
        } finally {
            setLoading(false);
        }
    }, [fetchMethod]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { data, loading, error, refetch: fetchData };
};

export const useServices = () => useFetch(contentService.getServices);
export const usePlans = () => useFetch(contentService.getPlans);
export const usePromotions = () => useFetch(contentService.getPromotions);
export const useBlogPosts = () => useFetch(contentService.getBlogPosts);
