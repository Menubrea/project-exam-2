import { useState, useEffect } from 'react';

export function useApi(url, options) {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    let allData = [];
    let currentOffset = 0;
    let urlWithOffset = url;
    try {
      while (urlWithOffset) {
        setLoading(true);
        setError(false);
        const res = await fetch(
          `${urlWithOffset}&offset=${currentOffset}`,
          options
        );
        const json = await res.json();
        allData = allData.concat(json);
        currentOffset += json.length;
        urlWithOffset = json.length > 0 ? url : null;
      }
      setData(allData);
    } catch (error) {
      console.log(error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  return { data, error, loading };
}
