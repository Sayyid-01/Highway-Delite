import { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE = 'http://localhost:5000/api';  // Changed to localhost for local testing

export const useApi = <T = any>(url: string, method: 'GET' | 'POST' = 'GET', body?: any) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios({
          method,
          url: `${API_BASE}${url}`,
          data: body,
        });
        setData(response.data);
      } catch (err: any) {
        setError(err.message || 'Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, method, body]);

  return { data, loading, error };
};
