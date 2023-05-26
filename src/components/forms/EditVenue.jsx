import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';

import { Box, Typography, Checkbox, styled } from '@mui/joy';
import {
  MainThemeButton,
  MainThemeInput,
  MainThemeTextArea,
  StyledDivider,
  StyledButton,
} from '../../styles/GlobalStyles';

import CloseIcon from '@mui/icons-material/Close';

const defaultValues = {
  name: '',
  description: '',
  price: 0,
  maxGuests: 1,
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
};

export default function EditVenue({
  venue,
  setProfileVenues,
  handleCloseSlideOut,
  setFilteredVenues,
}) {
  const [mediaArray, setMediaArray] = useState([]);
  const [mediaMessage, setMediaMessage] = useState('');
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

  const handleRemoveMedia = (index) => {
    setMediaArray(mediaArray.filter((item, i) => i !== index));
  };

  const handleAddMedia = () => {
    const input = document.getElementById('addMedia');
    input.value = '';

    const regex = /^https?:\/\/.*/;

    if (regex.test(inputValue)) {
      setMediaArray([...mediaArray, inputValue]);
      setFormData({ ...formData, media: [...mediaArray, inputValue] });
      setInputValue('');
    } else {
      setMediaMessage('Please provide a valid image url');
      setTimeout(() => {
        setMediaMessage('');
      }, 3000);
    }
  };

  const editForm = useForm({
    resolver: yupResolver(EditVenueSchema),
    mode: 'onChange',
    defaultValues: {
      name: venue.name,
      description: venue.description,
      price: venue.price,
      maxGuests: venue.maxGuests,
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

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = editForm;

  const handleSwitchChange = (event) => {
    const { name, checked } = event.target;
    setValue(name, checked);
  };

  useEffect(() => {
    reset({
      name: venue.name,
      description: venue.description,
      price: venue.price,
      maxGuests: venue.maxGuests,
      meta: {
        wifi: venue.meta.wifi || defaultValues.meta.wifi,
        parking: venue.meta.parking || defaultValues.meta.parking,
        breakfast: venue.meta.breakfast || defaultValues.meta.breakfast,
        pets: venue.meta.pets || defaultValues.meta.pets,
      },
      location: {
        address: venue.location.address,
        city: venue.location.city,
        country: venue.location.country,
        continent: venue.location.continent,
      },
    });
  }, [venue, editForm, reset]);

  useEffect(() => {
    editForm.setValue('media', mediaArray);
  }, [editForm, mediaArray]);

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
        const editedVenue = await res.json();
        setMessage(`${editedVenue.name} successfully updated`);

        setProfileVenues((prev) => {
          return prev.map((venue) =>
            venue.id === editedVenue.id ? editedVenue : venue
          );
        });

        setFilteredVenues((prev) => {
          return prev.map((venue) =>
            venue.id === editedVenue.id ? editedVenue : venue
          );
        });
        setTimeout(() => {
          handleCloseSlideOut();
        }, 1000);

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

  const handleImageSetMain = (index) => {
    const mainImage = mediaArray[index];
    const newMediaArray = mediaArray.filter((item, i) => i !== index);
    setMediaArray([mainImage, ...newMediaArray]);
  };

  return (
    <EditFormContainer
      id='editVenueForm'
      sx={{ marginTop: 1 }}
      component={'form'}
      onSubmit={handleSubmit(submitEdit)}>
      <Box sx={{ padding: 2 }}>
        <Typography level='h6' component={'h2'}>
          Update your venue
        </Typography>
        <Typography>
          Here you can make adjustments to your venue, you may find that some
          options are not available, and should you find some of those options
          are not accurate you can always contact support to assist.
        </Typography>
      </Box>
      <StyledDivider />
      <FlexContainer
        sx={{
          display: { xs: 'block', sm: 'flex' },
          borderBottom: (theme) =>
            theme.palette.mode === 'dark'
              ? `1px solid ${theme.palette.common.white}`
              : `1px solid ${theme.palette.primary[900]}`,
        }}>
        <Box sx={{ width: '100%' }}>
          <Typography htmlFor='venueName'>Name</Typography>
          <MainThemeInput
            size='sm'
            id='venueName'
            required
            slotProps={{
              input: {
                minLength: 1,
                maxLength: 50,
                pattern: '[a-zA-Z\\s]+',
                title: 'Only letters and spaces are allowed',
              },
            }}
            type='text'
            name='name'
            {...register('name')}
          />
          <Typography level='body3'>{errors.name?.message}</Typography>
        </Box>
        <Box>
          <Typography htmlFor='venuePrice'>Price</Typography>
          <MainThemeInput
            sx={{ maxWidth: { xs: '100%', sm: '100px' } }}
            size='sm'
            id='venuePrice'
            required
            type='number'
            name='price'
            slotProps={{
              input: {
                inputMode: 'numeric',
                pattern: '[1-9]*',
                min: 1,
              },
            }}
            {...register('price')}
          />
          <Typography level='body3'>{errors.price?.message}</Typography>
        </Box>

        <Box>
          <Typography htmlFor='venueMaxGuests'>Guests</Typography>
          <MainThemeInput
            sx={{ maxWidth: { xs: '100%', sm: '100px' } }}
            size='sm'
            id='venueMaxGuests'
            required
            type='number'
            name='maxGuests'
            slotProps={{
              input: {
                inputMode: 'numeric',
                pattern: '[1-9]*',
                defaultValue: 1,
                min: 1,
                max: 100,
              },
            }}
            {...register('maxGuests')}
          />
          <Typography level='body3'>{errors.maxGuests?.message}</Typography>
        </Box>
      </FlexContainer>
      <Box
        sx={{
          padding: 2,
          borderBottom: (theme) =>
            theme.palette.mode === 'dark'
              ? `1px solid ${theme.palette.common.white}`
              : `1px solid ${theme.palette.primary[900]}`,
        }}>
        {mediaArray.length > 1 && (
          <Typography sx={{ textAlign: 'center', marginBottom: 1 }}>
            Click image to set as new main image (image 1).
          </Typography>
        )}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
            gap: 1,
          }}>
          {mediaArray ? (
            mediaArray.map((mediaItem, index) => (
              <Box key={index}>
                <Typography level='body3' htmlFor={`venueMedia${index}`}>
                  Image {index + 1}
                </Typography>
                <Box position={'relative'}>
                  <Box
                    onClick={() => handleImageSetMain(index)}
                    sx={{
                      width: '100%',
                      height: '200px',
                      overflow: 'hidden',
                      objectFit: 'cover',
                      cursor: 'pointer',
                      '&:hover': {
                        opacity: 0.8,
                      },
                    }}
                    component={'img'}
                    aria-label='Remove image'
                    src={mediaItem}
                    alt={`media url ${mediaItem}`}
                  />
                  <StyledButton
                    sx={{
                      position: 'absolute',
                      zIndex: 10,
                      top: '-1px',
                      right: '-1px',
                    }}
                    size='sm'
                    type='button'
                    onClick={() => handleRemoveMedia(index)}>
                    <CloseIcon
                      sx={{ position: 'absolute', top: 15, right: 15 }}
                    />
                  </StyledButton>
                </Box>
              </Box>
            ))
          ) : (
            <Typography>No media</Typography>
          )}
        </Box>
        <Box>
          {mediaMessage && (
            <Typography textAlign={'center'}>{mediaMessage}</Typography>
          )}
        </Box>
        <Box marginTop={1}>
          <Typography>Add images</Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <MainThemeInput
              id='addMedia'
              onChange={handleInputChange}
              name='addMedia'
              placeholder='Add image url'
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
          required
          id='venueDescription'
          name='description'
          size='lg'
          {...register('description')}
        />
        <Typography textAlign={'center'}>
          {errors.description?.message}
        </Typography>
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
            name='meta.wifi'
            label='wifi'
            {...register('meta.wifi')}
            checked={watch('meta.wifi')}
            onChange={handleSwitchChange}
          />
          <Checkbox
            name='meta.parking'
            label='parking'
            {...register('meta.parking')}
            checked={watch('meta.parking')}
            onChange={handleSwitchChange}
          />
          <Checkbox
            name='meta.breakfast'
            label='breakfast'
            {...register('meta.breakfast')}
            checked={watch('meta.breakfast')}
            onChange={handleSwitchChange}
          />
          <Checkbox
            name='meta.pets'
            label='pets'
            {...register('meta.pets')}
            checked={watch('meta.pets')}
            onChange={handleSwitchChange}
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
      {mediaArray.length >= 1 ? (
        <Box padding={1} marginTop={0}>
          {loading ? (
            <MainThemeButton loading loadingPosition='start' fullWidth>
              Updating Venue
            </MainThemeButton>
          ) : (
            <MainThemeButton fullWidth type='submit'>
              Update Venue
            </MainThemeButton>
          )}
        </Box>
      ) : (
        <MainThemeButton disabled textAlign={'center'}>
          Please add at least one image
        </MainThemeButton>
      )}
    </EditFormContainer>
  );
}

const FlexContainer = styled(Box)(({ theme }) => ({
  gap: theme.spacing(1),
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
  name: yup
    .string()
    .required('Name is required')
    .matches(/^[a-zA-Z\s]*$/, 'Must only contain letters and spaces')
    .trim(),
  description: yup
    .string()
    .required('Description is required')
    .min(1, 'Must at least be 1 character')
    .max(480, 'Must be less than 480 characters')
    .trim(),

  media: yup.array().of(yup.string().trim()),

  price: yup
    .number()
    .required('Price is required')
    .typeError('Price must be a number greater than 1')
    .min(1, 'Price must be a number greater than 1'),

  maxGuests: yup
    .number()
    .required('Guests is required')
    .typeError('Guests must be a number between 1-100')
    .min(1)
    .max(100),

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
