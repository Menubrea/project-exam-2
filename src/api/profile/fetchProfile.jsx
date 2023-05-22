import { useState, useEffect } from 'react';
import { StoredProfile } from '../../components/hooks';

const profileUrl = 'https://api.noroff.dev/api/v1/holidaze';
const action = '/profiles/';
const flags = '?_bookings=true&_venues=true';
const venueFlags = '/venues?_bookings=true';

export default function FetchProfile() {
  const { token, profile } = StoredProfile();
  const [profileData, setProfileData] = useState([]);
  const [profileVenues, setProfileVenues] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchProfile = async () => {
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      setLoading(true);
      setError(false);
      const resProfile = await fetch(
        profileUrl + action + profile.name + flags,
        options
      );
      const resVenues = await fetch(
        profileUrl + action + profile.name + venueFlags,
        options
      );
      if (resProfile && resVenues) {
        const resultProfile = await resProfile.json();
        const resultVenues = await resVenues.json();
        setProfileData(resultProfile);
        setProfileVenues(resultVenues);
      }
    } catch (error) {
      setError(true);
      console.log(error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 300);
    }
  };
  useEffect(() => {
    if (token && profile.name) {
      fetchProfile();
    }
  }, [token, profile.name]);

  return { profileData, profileVenues, error, loading };
}
