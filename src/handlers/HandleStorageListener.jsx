import { useEffect, useState } from 'react';

export default function HandleStorageListener() {
  const [token, setToken] = useState('');
  const [profile, setProfile] = useState({ name: '' });

  useEffect(() => {
    const handleStorageChange = () => {
      const newProfile = localStorage.getItem('profile');
      const newToken = localStorage.getItem('token');
      setProfile(JSON.parse(newProfile));
      setToken(JSON.parse(newToken));
      if (!newProfile || !newToken) {
        setProfile({ name: '' });
        setToken('');
      }
    };
    window.addEventListener('storage', handleStorageChange);
    document.addEventListener('logout', handleStorageChange);
    document.addEventListener('login', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      document.removeEventListener('logout', handleStorageChange);
      document.removeEventListener('login', handleStorageChange);
    };
  }, [localStorage]);

  return { token, profile };
}
