import { useState } from 'react';

const profileUrl = 'https://api.noroff.dev/api/v1/holidaze';
const action = '/profiles/';
const flags = '?_bookings=true&_venues=true';
const venueFlags = '/venues?_bookings=true';

export default async function fetchProfile() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [profile, setProfile] = useState(null);
  const [data, setData] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedProfile = localStorage.getItem('profile');
    const storedToken = localStorage.getItem('token');
    if (storedProfile) {
      setProfile(JSON.parse(storedProfile));
      setToken(JSON.parse(storedToken));
    }
  }, []);

  const url = profileUrl + action + profile + venueFlags;
  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    setLoading(true);
    const res = await fetch(url, options);

    switch (res.status) {
      case 200:
        setLoading(false);
        const result = await res.json();
        setData(result);
        break;
      default:
        setError(true);
        throw new Error('Something went wrong, please try again');
    }
  } catch (err) {
    setError(true);
    console.log(err);
  } finally {
    setLoading(false);
  }
  return { loading, error, data };
}
