import { useState, useEffect, useCallback } from 'react';
import { useAuth } from './useAuth';
import toast from 'react-hot-toast';

const useFetch = (url, options = {}, autoFetch = true) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(autoFetch);
  const [error, setError] = useState(null);
  const { token, logout } = useAuth();

  const fetchData = useCallback(async (customUrl = null, customOptions = {}) => {
    const fetchUrl = customUrl || url;
    const fetchOptions = { ...options, ...customOptions };
    
    if (!fetchUrl) return;

    setLoading(true);
    setError(null);

    try {
      const headers = {
        'Content-Type': 'application/json',
        ...fetchOptions.headers,
      };

      // Add auth token if available
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const response = await fetch(`http://localhost:5000/api${fetchUrl}`, {
        ...fetchOptions,
        headers,
      });

      const result = await response.json();

      if (!response.ok) {
        // Handle unauthorized
        if (response.status === 401) {
          logout();
          throw new Error('Session expired. Please login again.');
        }
        
        // Handle forbidden
        if (response.status === 403) {
          throw new Error('Access denied. You do not have permission.');
        }
        
        throw new Error(result.message || 'Something went wrong');
      }

      if (!result.success) {
        throw new Error(result.message || 'Request failed');
      }

      setData(result.data || result);
      return result;
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [url, options, token, logout]);

  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
  }, [fetchData, autoFetch]);

  const refetch = (customUrl, customOptions) => {
    return fetchData(customUrl, customOptions);
  };

  return { data, loading, error, refetch, fetchData };
};

export default useFetch;