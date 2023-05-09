import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';

import { Box, Typography, Checkbox, styled, Input, Textarea } from '@mui/joy';
import { MainThemeButton, MainThemeInput } from '../../styles/GlobalStyles';

const GridContainer = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
  gap: theme.spacing(2),
  padding: theme.spacing(2),
}));

const EditVenueSchema = yup.object({
  name: yup.string().required().trim(),
  description: yup.string().required().trim(),
  media: yup.string().required().trim(),

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

export default function EditVenue({ venue }) {
  console.log(venue);
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
    resolver: yupResolver(EditVenueSchema),
    defaultValues: {
      name: venue.name,
      description: venue.description,
      price: venue.price,
      maxGuests: venue.maxGuests,
      media: [venue.media],
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

  const submitEdit = async (data) => {
    data.media = [data.media];
    // Push all entries of media to data.media
    mediaInputs.forEach((index) => {
      data.media.push(data[`media${index}`]);
    });

    try {
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
      const result = await res.json();
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Box component={'form'} onSubmit={handleSubmit(submitEdit)}>
      <GridContainer sx={{ borderBottom: '1px solid white' }}>
        <Box>
          <Typography htmlFor='venueName'>Name</Typography>
          <Input size='sm' id='venueName' type='text' {...register('name')} />
          <Typography level='body3'>{errors.name?.message}</Typography>
        </Box>
        <Box>
          <Typography htmlFor='venuePrice'>Price</Typography>
          <Input
            size='sm'
            id='venuePrice'
            type='number'
            min={'0'}
            {...register('price')}
          />
          <Typography level='body3'>{errors.price?.message}</Typography>
        </Box>

        <Box>
          <Typography htmlFor='venueMaxGuests'>Max Guests</Typography>
          <Input
            size='sm'
            id='venueMaxGuests'
            type='number'
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
          borderBottom: '1px solid white',
        }}>
        <Box>
          <Typography htmlFor='venueMedia'>Media</Typography>
          <Input size='sm' id='venueMedia' type='text' {...register('media')} />
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
                <Input
                  size='sm'
                  sx={{ width: '100%' }}
                  id={`venueMedia${inputId}`}
                  type='url'
                  {...register(`media${inputId}`)}
                />
                <MainThemeButton
                  size='sm'
                  type='button'
                  onClick={() => handleRemoveMedia(inputId)}>
                  X
                </MainThemeButton>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
      <Box sx={{ padding: 2, borderBottom: '1px solid white' }}>
        <Typography htmlFor='venueDescription'>Description</Typography>
        <Textarea
          minRows={2}
          id='venueDescription'
          size='lg'
          {...register('description')}
        />
      </Box>
      <Box sx={{ padding: 2, borderBottom: '1px solid white' }}>
        <Typography htmlFor='venueMeta'>
          Does your location have access to:
        </Typography>
        <GridContainer
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}>
          <Checkbox
            variant='outlined'
            label='wifi'
            {...register('meta.wifi')}
          />
          <Checkbox
            variant='outlined'
            label='parking'
            {...register('meta.parking')}
          />
          <Checkbox
            variant='outlined'
            label='breakfast'
            {...register('meta.breakfast')}
          />
          <Checkbox
            variant='outlined'
            label='pets'
            {...register('meta.pets')}
          />
        </GridContainer>
      </Box>
      <Box
        sx={{
          padding: 2,
          display: 'flex',
          gap: 1,
          borderBottom: '1px solid white',
        }}>
        <Box>
          <Typography htmlFor='venueAddress'>Address</Typography>
          <MainThemeInput
            id='venueAddress'
            type='text'
            {...register('location.address')}
            size='sm'
          />
        </Box>
        <Box>
          <Typography htmlFor='venueCity'>City</Typography>
          <MainThemeInput
            id='venueCity'
            type='text'
            {...register('location.city')}
            size='sm'
          />
        </Box>
        <Box>
          <Typography htmlFor='venueCountry'>Country</Typography>
          <MainThemeInput
            id='venueCountry'
            type='text'
            {...register('location.country')}
            disabled
            size='sm'
          />
        </Box>
        <Box>
          <Typography htmlFor='venueContinent'>Continent</Typography>
          <MainThemeInput
            id='venueContinent'
            type='text'
            {...register('location.continent')}
            disabled
            size='sm'
          />
        </Box>
      </Box>
      <Box sx={{ margin: '.5em auto', width: 'fit-content' }}>
        <MainThemeButton type='submit'>Update Venue</MainThemeButton>
      </Box>
    </Box>
  );
}
