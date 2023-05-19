import { useState, useEffect } from 'react';

export default function fetchProfile(url, options) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [profileData, setProfileData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(false);
        const res = await fetch(url, options);
        const json = await res.json();
        setProfileData(json);
        setLoading(false);
      } catch (err) {
        setError(true);
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url, options]);

  if (profileData) {
    return { loading, error, profileData };
  }
}
