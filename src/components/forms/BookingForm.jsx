import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Input,
  Typography,
  styled,
  Alert,
  Modal,
  ModalDialog,
  Button,
} from '@mui/joy';
import { LinkWrapper, MainThemeButton } from '../../styles/GlobalStyles';
import { useEffect, useMemo, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const bookingUrl = 'https://api.noroff.dev/api/v1/holidaze/bookings';

export default function BookingForm({ venue }) {
  const [errorMessage, setErrorMessage] = useState('');
  const token = localStorage.getItem('token');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [dateError, setDateError] = useState(
    'Please select an arrival and departure date'
  );
  const [price, setPrice] = useState(venue.price);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [bookedDates, setBookedDates] = useState([]);

  useEffect(() => {
    if (venue.bookings) {
      const unavailableDates = venue.bookings
        .map((booking) => {
          let from = new Date(booking.dateFrom);
          let to = new Date(booking.dateTo);
          let dates = [];
          while (from <= to) {
            dates.push(new Date(from));
            from.setDate(from.getDate() + 1);
          }
          return dates;
        })
        .flat()
        .map((date) => new Date(date));
      setBookedDates(unavailableDates);
    }
  }, [venue.bookings]);

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

  const ResetSelection = () => {
    setStartDate(null);
    setEndDate(null);
    setDateError('Please select an arrival and departure date');
  };

  const resetModal = () => {
    setOpen(false);
    setErrorMessage('');
  };

  const submitBooking = async (data) => {
    try {
      setLoading(true);
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
          setErrorMessage(`Booking for ${venue.name} was successful`);
          ResetSelection();
          setLoading(false);
          const result = await res.json();
          setBookedDates(
            [
              ...bookedDates,
              new Date(result.dateFrom),
              new Date(result.dateTo),
            ].sort((a, b) => a.getTime() - b.getTime())
          );
          break;
        default:
          console.log('error');
          setErrorMessage('Something went wrong, please try again');
          throw new Error('Something went wrong, please try again');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDateRangeChange = (dates) => {
    if (dates.length === 2) {
      const [newStart, newEnd] = dates;

      if (bookedDates.some((d) => d >= newStart && d <= newEnd)) {
        setDateError('One or more dates in the selected range are unavailable');
        setPrice('Unavailable');
        return;
      }

      if (
        newStart &&
        newEnd &&
        newStart.toLocaleDateString() === newEnd.toLocaleDateString()
      ) {
        setDateError('The arrival and departure date cannot be the same');
        setPrice('Unavailable');
        return;
      }

      setStartDate(newStart);
      setEndDate(newEnd);
    } else {
      setStartDate(null);
      setEndDate(null);
    }
  };

  useEffect(() => {
    if (startDate) {
      setDateError(`From: ${startDate.toLocaleDateString('en-GB')} `);
    }
    if (startDate && endDate) {
      let days = Math.floor((endDate - startDate) / 86400000);
      let price = days * venue.price;
      setPrice(price);
      setDateError(
        `Your stay is for ${days} days, starting ${startDate.toLocaleDateString(
          'en-GB'
        )} to ${endDate.toLocaleDateString('en-GB')}`
      );
      register('dateFrom', { value: startDate });
      register('dateTo', { value: endDate });
    } else {
      setPrice(venue.price);
    }
  }, [startDate, endDate]);

  const handleClick = () => {
    const bookingSubmit = document.getElementById('booking-submit');
    const clickEvent = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true,
    });
    bookingSubmit.dispatchEvent(clickEvent);
  };

  return (
    <BookingFormStyle onSubmit={handleSubmit(submitBooking)} component={'form'}>
      <Box sx={{ position: 'relative', width: '100%' }}>
        <Box sx={{ width: 'fit-content', margin: '0 0 .3rem auto' }}>
          <MainThemeButton
            endDecorator={<CloseIcon />}
            size='small'
            onClick={ResetSelection}>
            Clear selection
          </MainThemeButton>
        </Box>
        <DatePicker
          selected={(startDate, endDate)}
          onChange={handleDateRangeChange}
          startDate={startDate}
          endDate={endDate}
          minDate={new Date(new Date().setDate(new Date().getDate() + 1))}
          excludeDates={bookedDates}
          selectsRange
          preventEqualDates={true}
          inline>
          <Box
            sx={{
              width: 'fit-content',
              margin: '0 auto',
              backgroundColor: 'white',
            }}>
            <Alert variant='plain' color='primary'>
              {dateError}
            </Alert>
          </Box>
        </DatePicker>
      </Box>
      <Box marginTop={1}>
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <Typography level='body1' component={'label'} htmlFor='guests'>
            Guests:
          </Typography>
          <Typography level='body3' component={'span'}>
            (Max {venue.maxGuests} guests)
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Input
            id='guests'
            type='number'
            {...register('guests')}
            sx={{ width: '100px', border: '1px solid white' }}
            defaultValue={1}
            slotProps={{
              input: {
                inputMode: 'numeric',
                pattern: '[0-9]*',
                min: 1,
                max: venue.maxGuests,
              },
            }}
          />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
            }}>
            <Typography level='body1'>Price</Typography>
            <Typography level='body1'>{price},-</Typography>
          </Box>
        </Box>
      </Box>
      <input type='hidden' {...register('venueId')} value={venue.id} />
      {startDate && endDate ? (
        <MainThemeButton
          fullWidth
          sx={{ marginTop: 2 }}
          type='button'
          onClick={() => setOpen(true)}>
          Book {venue.name}
        </MainThemeButton>
      ) : (
        <Box
          sx={{
            marginTop: 2,
            textAlign: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.05)',
            borderRadius: '.2rem',
            padding: 2,
            color: (theme) =>
              theme.palette.colorScheme === 'dark'
                ? theme.palette.common.white
                : theme.palette.common.black,
          }}>
          Select an arrival and departure date
        </Box>
      )}
      <Button id='booking-submit' sx={{ display: 'none' }} type='submit'>
        Submit
      </Button>
      <Modal open={open}>
        <ModalDialog sx={{ border: '1px solid white' }}>
          {!errorMessage ? (
            <Box>
              <Typography level='body1' sx={{ textAlign: 'center' }}>
                Confirm booking for:
              </Typography>
              <Typography
                level='h4'
                textAlign={'center'}
                sx={{
                  fontFamily: 'futura-PT-condensed, sans-serif',
                  textTransform: 'uppercase',
                }}>
                {venue.name}
              </Typography>
              {startDate && endDate && (
                <Box
                  sx={{
                    display: 'flex',
                    gap: 1,
                    width: 'fit-content',
                    margin: '0 auto',
                  }}>
                  <Typography>
                    From: {startDate.toLocaleDateString('en-GB')}
                  </Typography>
                  <Typography>
                    To: {endDate.toLocaleDateString('en-GB')}
                  </Typography>
                </Box>
              )}
              <Box sx={{ display: 'flex', gap: 1, marginTop: 2 }}>
                <Button color='error' onClick={() => setOpen(false)} size='sm'>
                  Cancel
                </Button>
                {!loading ? (
                  <MainThemeButton fullWidth size='sm' onClick={handleClick}>
                    Confirm
                  </MainThemeButton>
                ) : (
                  <MainThemeButton
                    loading
                    loadingPosition='start'
                    fullWidth
                    size='sm'
                  />
                )}
              </Box>
            </Box>
          ) : (
            <Box>
              <Alert
                variant='solid'
                color='primary'
                sx={{ marginBottom: 1 }}
                startDecorator={<CheckCircleIcon />}>
                {errorMessage}
              </Alert>
              <Box
                sx={{
                  display: 'flex',
                  gap: 1,
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Button color='error' onClick={resetModal}>
                  Go back
                </Button>
                {errorMessage === 'Something went wrong, please try again' ? (
                  <Button onClick={handleClick}>Confirm</Button>
                ) : (
                  <LinkWrapper to='/profile'>
                    {' '}
                    <MainThemeButton size='sm'>View on Profile</MainThemeButton>
                  </LinkWrapper>
                )}
              </Box>
            </Box>
          )}
        </ModalDialog>
      </Modal>
    </BookingFormStyle>
  );
}

const BookingFormStyle = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
  color: theme.palette.common.white,
}));
