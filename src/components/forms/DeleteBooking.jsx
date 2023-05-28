import { Box, Checkbox, Typography } from '@mui/joy';
import { MainThemeButton } from '../../styles/GlobalStyles';
import { useState } from 'react';

/**
 * Function for deleting a venue
 * @param {object} venue - venue object
 * @param {string} token - token for authentication
 * @param {function} setProfileVenues - function for updating profile venues
 * @param {function} handleCloseSlideOut - function for closing slideout
 * @returns {JSX.Element}
 */
export default function DeleteBooking({
  venue,
  token,
  setProfileVenues,
  handleCloseSlideOut,
  setFilteredVenues,
}) {
  const [confirm, setConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');

  const handleConfirm = (e) => {
    setConfirm(e.target.checked);
  };

  const handleDelete = async () => {
    const url = `https://api.noroff.dev/api/v1/holidaze/venues/${venue.id}`;
    const options = {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      setLoading(true);
      const res = await fetch(url, options);

      if (res.ok) {
        setMessage(`${venue.name} has been deleted`);
        setProfileVenues((prev) => prev.filter((v) => v.id !== venue.id));
        setFilteredVenues((prev) => prev.filter((v) => v.id !== venue.id));
        setConfirm(false);
        setTimeout(() => {
          setMessage('');
          handleCloseSlideOut();
        }, 1000);
      } else {
        setMessage('Something went wrong processing your request');
        throw new Error('Something went wrong');
      }
    } catch (error) {
      setError(true);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        padding: 2,
        border: (theme) =>
          theme.palette.mode === 'dark'
            ? `1px solid ${theme.palette.common.white}`
            : `1px solid ${theme.palette.primary[700]}`,
        marginTop: 2,
        borderRadius: 3,
      }}>
      <Typography level='h6' component={'h3'}>
        Deleting the Venue
      </Typography>
      <Typography>
        You can delete your venue by confirming and clicking the delete button
        below, keep in mind this is a permanent action and cannot be undone.
      </Typography>
      <Box sx={{ width: 'fit-content', margin: '1em auto' }}>
        <Checkbox
          checked={confirm}
          onChange={handleConfirm}
          label='Are you sure you wish to delete this venue?'
        />
      </Box>
      {message && (
        <Typography
          sx={{
            backgroundColor: 'rgba(0,0,0,.05)',
            padding: 1,
            borderRadius: 3,
            marginY: 2,
          }}
          textAlign={'center'}>
          {message}
        </Typography>
      )}
      {loading && (
        <MainThemeButton fullWidth loading>
          Processing
        </MainThemeButton>
      )}
      {!loading && (
        <Box>
          {confirm ? (
            <MainThemeButton fullWidth onClick={handleDelete}>
              Delete
            </MainThemeButton>
          ) : (
            <Typography
              textAlign={'center'}
              sx={{
                backgroundColor: 'rgba(0,0,0,.05)',
                padding: 1,
                borderRadius: 3,
              }}>
              Confirm before proceeding
            </Typography>
          )}
        </Box>
      )}
    </Box>
  );
}
