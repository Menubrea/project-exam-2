import { useState, useEffect } from 'react';

export default function StoredProfile() {
  const [token, setToken] = useState('');
  const [profile, setProfile] = useState({ name: '' });

  useEffect(() => {
    const storedProfile = localStorage.getItem('profile');
    const storedToken = localStorage.getItem('token');

    if (storedProfile && storedToken) {
      setProfile(JSON.parse(storedProfile));
      setToken(JSON.parse(storedToken));
    }
  }, []);

  return { token, profile };
}
