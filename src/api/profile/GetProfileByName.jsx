import { useState, useEffect } from 'react';

const profileUrl = 'https://api.noroff.dev/api/v1/holidaze';
const action = '/profiles/';
const flags = '?_bookings=true&_venues=true';
const venueFlags = '/venues?_bookings=true';

export default function fetchProfile() {
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [profileError, setProfileError] = useState(false);
  const [profileData, setProfileData] = useState([]);

  const fetchData = async () => {
    try {
      setLoadingProfile(true);
      setProfileError(false);
      const storedProfile = localStorage.getItem('profile');
      const storedToken = localStorage.getItem('token');
      const options = {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      };
      const res = await fetch(
        profileUrl + action + storedProfile.name + flags,
        options
      );
      const json = await res.json();
      setProfileData(json);
    } catch (err) {
      setProfileError(true);
      console.log(err);
    } finally {
      setLoadingProfile(false);
    }
  };

  useEffect(() => {
    const storedProfile = localStorage.getItem('profile');
    const storedToken = localStorage.getItem('token');

    if (storedToken && storedProfile) {
      fetchData();
    }
  }, [storedProfile.name]);

  return { loadingProfile, profileError, profileData };
}
