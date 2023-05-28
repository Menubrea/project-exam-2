import { useState, useEffect } from 'react';

/**
 * Function for getting the token and profile from local storage
 * @returns {object} - token and profile object
 */
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
