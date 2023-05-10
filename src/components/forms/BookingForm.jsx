import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Input, Typography, styled } from '@mui/joy';
import { MainThemeButton } from '../../styles/GlobalStyles';
import { useMemo, useState } from 'react';

const bookingUrl = 'https://api.noroff.dev/api/v1/holidaze/bookings';

export default function BookingForm({ venue }) {
  const [errorMessage, setErrorMessage] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const token = localStorage.getItem('token');
  const BookingSchema = useMemo(() =>
    yup.object({
      dateFrom: yup.date().required(),
      dateTo: yup.date().required(),
      guests: yup.number().required(),
      venueId: yup.string().required(),
    })
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(BookingSchema) });

  if (!venue) return <div>Loading...</div>;

  const submitBooking = async (data) => {
    try {
      const res = await fetch(bookingUrl, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${JSON.parse(token)}`,
        },
      });

      switch (res.status) {
        case 201:
          const result = await res.json();
          break;
        default:
          setErrorMessage('Something went wrong, please try again');
          throw new Error('Something went wrong, please try again');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <BookingFormStyle onSubmit={handleSubmit(submitBooking)} component={'form'}>
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Box sx={{ width: '100%' }}>
          <Typography level='body1' component={'label'} htmlFor='dateFrom'>
            From
          </Typography>

          <Input
            sx={{ padding: 1 }}
            id='dateFrom'
            type='date'
            defaultValue={new Date().toISOString().slice(0, 10)}
            min={new Date()}
            {...register('dateFrom')}
          />
        </Box>

        <Box sx={{ width: '100%' }}>
          <Typography level='body1' component={'label'} htmlFor='dateTo'>
            To
          </Typography>
          <Input
            sx={{ padding: 1 }}
            id='dateTo'
            type='date'
            defaultValue={new Date(Date.now() + 86400000)
              .toISOString()
              .slice(0, 10)}
            min={new Date(Date.now() + 86400000)}
            {...register('dateTo')}
          />
        </Box>
      </Box>
      <Typography level='body1' component={'label'} htmlFor='guests'>
        Guests
      </Typography>
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Input
          id='guests'
          type='number'
          {...register('guests')}
          defaultValue={1}
        />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
          }}>
          <Typography level='body1'>Price</Typography>
          <Typography level='body1'>{venue.price},-</Typography>
        </Box>
      </Box>
      <input type='hidden' {...register('venueId')} value={venue.id} />
      <Typography
        level='body1'
        sx={{
          backgroundColor: 'darkred',
          textAlign: 'center',
          borderRadius: '.2rem',
          marginTop: 2,
        }}>
        {errorMessage}
      </Typography>
      <MainThemeButton fullWidth sx={{ marginTop: 2 }} type='submit'>
        Book now!
      </MainThemeButton>
    </BookingFormStyle>
  );
}

const BookingFormStyle = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
  padding: theme.spacing(2),
  color: theme.palette.common.white,
  backgroundColor:
    theme.palette.mode === 'dark'
      ? theme.palette.primary[800]
      : theme.palette.neutral[50],
  border:
    theme.palette.mode === 'dark'
      ? `1px solid ${theme.palette.common.white}`
      : `1px solid ${theme.palette.primary[700]}`,
  borderRadius: 3,
}));
