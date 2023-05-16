import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';

import { Box, Typography, Checkbox, styled, Alert } from '@mui/joy';
import {
  MainThemeButton,
  MainThemeInput,
  MainThemeTextArea,
  StyledDivider,
} from '../../styles/GlobalStyles';

import CloseIcon from '@mui/icons-material/Close';
import { set } from 'date-fns';

export default function EditVenue({ venue }) {
  const [mediaArray, setMediaArray] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (venue) {
      setMediaArray(venue.media);
    }
  }, [venue]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddMedia = (e) => {
    setMediaArray([...mediaArray, inputValue]);
    const input = document.getElementById('addMedia');
    console.log(input);
    input.value = '';
  };

  const handleRemoveMedia = (index) => {
    setMediaArray(mediaArray.filter((item, i) => i !== index));
  };

  const editForm = useForm({
    resolver: yupResolver(EditVenueSchema),
    defaultValues: {
      name: venue.name,
      description: venue.description,
      price: venue.price,
      maxGuests: venue.maxGuests,
      media: venue.media,
      meta: {
        wifi: venue.meta.wifi,
        parking: venue.meta.parking,
        breakfast: venue.meta.breakfast,
        pets: venue.meta.pets,
      },
      location: {
        address: venue.location.address,
        city: venue.location.city,
        country: venue.location.country,
        continent: venue.location.continent,
      },
    },
  });

  useEffect(() => {
    editForm.setValue('media', mediaArray);
  }, [editForm, mediaArray]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = editForm;

  const submitEdit = async (data) => {
    try {
      setLoading(true);
      const res = await fetch(
        `https://api.noroff.dev/api/v1/holidaze/venues/${venue.id}`,
        {
          method: 'PUT',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem('token')
            )}`,
          },
        }
      );
      if (res.ok) {
        const result = await res.json();
        setMessage(`${result.name} successfully updated`);
        setLoading(false);
      } else {
        setMessage('Something went wrong, please try again');
      }
    } catch (error) {
      setMessage('Something went wrong, please try again');
      console.log(error);
    } finally {
      setLoading(false);
      setTimeout(() => {
        setMessage('');
      }, 3000);
    }
  };

  return (
    <EditFormContainer
      sx={{ marginTop: 1 }}
      component={'form'}
      onSubmit={handleSubmit(submitEdit)}>
      <Box sx={{ padding: 2 }}>
        <Typography level='h6' component={'h3'}>
          Updating your venue
        </Typography>
        <Typography>
          Here you can make adjustments to your venue, you may find that some
          options are not available, and should you find some of those options
          are not accurate you can always contact support to assist.
        </Typography>
      </Box>
      <StyledDivider />
      <GridContainer
        sx={{
          borderBottom: (theme) =>
            theme.palette.mode === 'dark'
              ? `1px solid ${theme.palette.common.white}`
              : `1px solid ${theme.palette.primary[900]}`,
        }}>
        <Box>
          <Typography htmlFor='venueName'>Name</Typography>
          <MainThemeInput
            size='sm'
            id='venueName'
            type='text'
            name='name'
            {...register('name')}
          />
          <Typography level='body3'>{errors.name?.message}</Typography>
        </Box>
        <Box>
          <Typography htmlFor='venuePrice'>Price</Typography>
          <MainThemeInput
            size='sm'
            id='venuePrice'
            type='number'
            name='price'
            min={'0'}
            {...register('price')}
          />
          <Typography level='body3'>{errors.price?.message}</Typography>
        </Box>

        <Box>
          <Typography htmlFor='venueMaxGuests'>Max Guests</Typography>
          <MainThemeInput
            size='sm'
            id='venueMaxGuests'
            type='number'
            name='maxGuests'
            min={'0'}
            max={'100'}
            {...register('maxGuests')}
          />
          <Typography level='body3'>{errors.maxGuests?.message}</Typography>
        </Box>
      </GridContainer>
      <Box
        sx={{
          padding: 2,
          borderBottom: (theme) =>
            theme.palette.mode === 'dark'
              ? `1px solid ${theme.palette.common.white}`
              : `1px solid ${theme.palette.primary[900]}`,
        }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
            gap: 1,
          }}>
          {mediaArray.map((mediaItem, index) => (
            <Box key={index}>
              <Typography level='body3' htmlFor={`venueMedia${index}`}>
                Image {index + 1}
              </Typography>
              <Box position={'relative'}>
                <Box
                  sx={{
                    width: '100%',
                    height: '200px',
                    overflow: 'hidden',
                    objectFit: 'cover',
                  }}
                  component={'img'}
                  src={mediaItem}
                  alt={`media url ${mediaItem}`}
                />
                <MainThemeButton
                  sx={{ position: 'absolute', zIndex: 10, top: 2, right: 2 }}
                  size='sm'
                  type='button'
                  onClick={() => handleRemoveMedia(index)}>
                  <CloseIcon />
                </MainThemeButton>
              </Box>
              <Typography>{errors.media?.message}</Typography>
            </Box>
          ))}
        </Box>
        <Box marginTop={1}>
          <Typography>Add additional images</Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <MainThemeInput
              id='addMedia'
              onChange={handleInputChange}
              fullWidth
              type='text'
            />
            <MainThemeButton
              onClick={handleAddMedia}
              aria-label='add more images'>
              Add
            </MainThemeButton>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          padding: 2,
          borderBottom: (theme) =>
            theme.palette.mode === 'dark'
              ? `1px solid ${theme.palette.common.white}`
              : `1px solid ${theme.palette.primary[900]}`,
        }}>
        <Typography htmlFor='venueDescription'>Description</Typography>
        <MainThemeTextArea
          minRows={2}
          id='venueDescription'
          name='description'
          size='lg'
          {...register('description')}
        />
      </Box>
      <Box
        sx={{
          paddingX: 2,
          paddingY: 2,
          borderBottom: (theme) =>
            theme.palette.mode === 'dark'
              ? `1px solid ${theme.palette.common.white}`
              : `1px solid ${theme.palette.primary[900]}`,
        }}>
        <Typography htmlFor='venueMeta'>Change access to:</Typography>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 1,
          }}>
          <Checkbox
            variant='solid'
            name='meta.wifi'
            label='wifi'
            {...register('meta.wifi')}
          />
          <Checkbox
            variant='solid'
            name='meta.parking'
            label='parking'
            {...register('meta.parking')}
          />
          <Checkbox
            variant='solid'
            name='meta.breakfast'
            label='breakfast'
            {...register('meta.breakfast')}
          />
          <Checkbox
            variant='solid'
            name='meta.pets'
            label='pets'
            {...register('meta.pets')}
          />
        </Box>
      </Box>
      {message && (
        <Typography
          level='h6'
          sx={{
            marginX: 'auto',
            marginY: 2,
            padding: 2,
            backgroundColor: 'rgba(0, 0, 0, .05)',
            borderRadius: 3,
            width: 'fit-content',
          }}>
          {message}
        </Typography>
      )}
      <Box padding={1} marginTop={0}>
        {loading ? (
          <MainThemeButton loading fullWidth></MainThemeButton>
        ) : (
          <MainThemeButton
            fullWidth
            type='submit'
            onClick={() => console.log('test')}>
            Update Venue
          </MainThemeButton>
        )}
      </Box>
    </EditFormContainer>
  );
}

const GridContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
  gap: theme.spacing(2),
  padding: theme.spacing(2),
  backgroundColor:
    theme.palette.mode === 'dark'
      ? theme.palette.primary[700]
      : theme.palette.neutral[100],
}));

const EditFormContainer = styled(Box)(({ theme }) => ({
  marginY: theme.spacing(2),
  borderRadius: 3,

  border:
    theme.palette.mode === 'dark'
      ? `1px solid ${theme.palette.common.white}`
      : `1px solid ${theme.palette.primary[900]}`,

  backgroundColor:
    theme.palette.mode === 'dark'
      ? theme.palette.primary[700]
      : theme.palette.neutral[200],
}));

const EditVenueSchema = yup.object({
  name: yup.string().required().trim(),
  description: yup.string().required().trim(),
  media: yup.array().of(yup.string().trim()),

  price: yup.number().required().min(1),
  maxGuests: yup.number().required().min(1).max(100),

  meta: yup.object().shape({
    wifi: yup.boolean(),
    parking: yup.boolean(),
    breakfast: yup.boolean(),
    pets: yup.boolean(),
  }),

  location: yup.object().shape({
    address: yup.string().trim(),
    city: yup.string().trim(),
    country: yup.string().trim(),
    continent: yup.string().trim(),
  }),
});
