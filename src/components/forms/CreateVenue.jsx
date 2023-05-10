import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';

import { Box, Typography, Checkbox } from '@mui/joy';
import { MainThemeButton, MainThemeInput } from '../../styles/GlobalStyles';

const CreateVenueSchema = yup.object({
  name: yup.string().required().trim(),
  description: yup.string().required().trim(),
  media: yup.string().required().trim(),

  price: yup.number().required().min(0),
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
    lat: yup.number(),
    lng: yup.number(),
  }),
});

export default function CreateVenue() {
  const [mediaInputs, setMediaInputs] = useState([]);

  const handleAddMedia = () => {
    setMediaInputs([...mediaInputs, mediaInputs.length]);
  };

  const handleRemoveMedia = (index) => {
    setMediaInputs(mediaInputs.filter((item) => item !== index));
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(CreateVenueSchema),
    defaultValues: {
      name: '',
      description: '',
      price: 1,
      maxGuests: 1,
      media: [''],
      meta: {
        wifi: false,
        parking: false,
        breakfast: false,
        pets: false,
      },
      location: {
        address: '',
        city: '',
        country: '',
        continent: '',
      },
    },
  });

  const submitCreateVenue = async (data) => {
    data.media = [data.media];
    // Push all entries of media to data.media
    mediaInputs.forEach((index) => {
      data.media.push(data[`media${index}`]);
    });

    try {
      const res = await fetch('https://api.noroff.dev/api/v1/holidaze/venues', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
        },
      });
      const result = await res.json();
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Box component={'form'} onSubmit={handleSubmit(submitCreateVenue)}>
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Box>
          <Typography htmlFor='venueName'>Name</Typography>
          <MainThemeInput id='venueName' type='text' {...register('name')} />
          <Typography level='body3'>{errors.name?.message}</Typography>
        </Box>
        <Box>
          <Typography htmlFor='venuePrice'>Price</Typography>
          <MainThemeInput
            id='venuePrice'
            type='number'
            min={'0'}
            {...register('price')}
          />
          <Typography level='body3'>{errors.price?.message}</Typography>
        </Box>

        <Box>
          <Typography htmlFor='venueMaxGuests'>Max Guests</Typography>
          <MainThemeInput
            id='venueMaxGuests'
            type='number'
            min={'0'}
            max={'100'}
            {...register('maxGuests')}
          />
          <Typography level='body3'>{errors.maxGuests?.message}</Typography>
        </Box>
      </Box>
      <Box
        sx={{
          padding: 2,
          border: '1px solid white',
          marginY: 2,
          borderRadius: 3,
        }}>
        <Box>
          <Typography htmlFor='venueMedia'>Media</Typography>
          <MainThemeInput
            id='venueMedia'
            type='text'
            {...register('media')}
            multiple
          />
          <Typography level='body3'>{errors.media?.message}</Typography>
        </Box>
        <Box sx={{ margin: '.5rem auto', width: 'fit-content' }}>
          <MainThemeButton type='button' onClick={handleAddMedia}>
            Add more images
          </MainThemeButton>
        </Box>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 1,
          }}>
          {mediaInputs.map((inputId) => (
            <Box key={inputId}>
              <Typography htmlFor={`venueMedia${inputId}`}>
                Image(s) {inputId + 1}
              </Typography>
              <Box sx={{ display: 'flex', gap: 0.5 }}>
                <MainThemeInput
                  sx={{ width: '100%' }}
                  id={`venueMedia${inputId}`}
                  type='url'
                  {...register(`media${inputId}`)}
                  multiple
                />
                <MainThemeButton
                  type='button'
                  onClick={() => handleRemoveMedia(inputId)}>
                  X
                </MainThemeButton>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
      <Box>
        <Typography htmlFor='venueDescription'>Description</Typography>
        <MainThemeInput
          id='venueDescription'
          type='text'
          {...register('description')}
        />
      </Box>
      <Box
        sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
        <Checkbox label='wifi' {...register('meta.wifi')} />
        <Checkbox label='parking' {...register('meta.parking')} />
        <Checkbox label='breakfast' {...register('meta.breakfast')} />
        <Checkbox label='pets' {...register('meta.pets')} />
      </Box>
      <Box
        sx={{
          padding: 2,
          border: '1px solid white',
          display: 'flex',
          gap: 1,
          marginTop: 2,
        }}>
        <Box>
          <Typography htmlFor='venueAddress'>Address</Typography>
          <MainThemeInput
            id='venueAddress'
            type='text'
            {...register('location.address')}
          />
        </Box>
        <Box>
          <Typography htmlFor='venueCity'>City</Typography>
          <MainThemeInput
            id='venueCity'
            type='text'
            {...register('location.city')}
          />
        </Box>
        <Box>
          <Typography htmlFor='venueCountry'>Country</Typography>
          <MainThemeInput
            id='venueCountry'
            type='text'
            {...register('location.country')}
          />
        </Box>
        <Box>
          <Typography htmlFor='venueContinent'>Continent</Typography>
          <MainThemeInput
            id='venueContinent'
            type='text'
            {...register('location.continent')}
          />
        </Box>
        <Box>
          <Typography htmlFor='venueLat'>Latitude</Typography>
          <MainThemeInput
            id='venueLat'
            type='coordinate'
            {...register('location.lat')}
          />
        </Box>
        <Box>
          <Typography htmlFor='venueLng'>Longitude</Typography>
          <MainThemeInput
            id='venueLng'
            type='coordinate'
            {...register('location.lng')}
          />
        </Box>
      </Box>
      <Box sx={{ margin: '.5em auto', width: 'fit-content' }}>
        <MainThemeButton type='submit'>Create Venue</MainThemeButton>
      </Box>
    </Box>
  );
}
