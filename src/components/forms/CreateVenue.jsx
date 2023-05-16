import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';

import { Box, Typography, Checkbox, styled, Option } from '@mui/joy';
import {
  MainThemeButton,
  MainThemeInput,
  MainThemeTextArea,
  StyledDivider,
  MainThemeSelect,
} from '../../styles/GlobalStyles';

import CloseIcon from '@mui/icons-material/Close';
import { NorwegianCounties } from '../../constants/counties';

export default function CreateVenue({ token }) {
  const [mediaArray, setMediaArray] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddMedia = (e) => {
    setMediaArray([...mediaArray, inputValue]);
    const input = document.getElementById('addMedia');
    input.value = '';
  };

  const handleRemoveMedia = (index) => {
    setMediaArray(mediaArray.filter((item, i) => i !== index));
  };

  const createForm = useForm({
    resolver: yupResolver(CreateVenueSchema),
    defaultValues: {
      media: [],
      location: {
        country: 'Norway',
        continent: 'Europe',
      },
    },
  });

  useEffect(() => {
    createForm.setValue('media', mediaArray);
  }, [createForm, mediaArray]);

  const allValues = createForm.getValues();
  console.log(allValues);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = createForm;

  const submitEdit = async (data) => {
    try {
      console.log('creating venue');
      setLoading(true);
      const res = await fetch(`https://api.noroff.dev/api/v1/holidaze/venues`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        const result = await res.json();
        setMessage(`${result.name} was successfully created`);
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
          Create a new Venue
        </Typography>
        <Typography>
          Create a new venue by filling out the form below, keep in mind we only
          allow locations currently located in Norway.
        </Typography>
      </Box>
      <StyledDivider />
      <FlexContainer
        sx={{
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
            type='text'
            name='name'
            {...register('name')}
          />
          <Typography level='body3'>{errors.name?.message}</Typography>
        </Box>
        <Box>
          <Typography htmlFor='venuePrice'>Price</Typography>
          <MainThemeInput
            sx={{ maxWidth: '100px' }}
            size='sm'
            id='venuePrice'
            type='number'
            name='price'
            slotProps={{
              input: {
                inputMode: 'numeric',
                pattern: '[0-9]*',
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
            sx={{ maxWidth: '100px' }}
            size='sm'
            id='venueMaxGuests'
            type='number'
            name='maxGuests'
            slotProps={{
              input: {
                inputMode: 'numeric',
                pattern: '[0-9]*',
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
          <Typography>Add images</Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <MainThemeInput
              id='addMedia'
              onChange={handleInputChange}
              size='sm'
              fullWidth
              type='text'
            />
            <MainThemeButton
              type='button'
              size='sm'
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
        <Typography marginBottom={1}>
          Does your venue have access to:
        </Typography>
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
      <Box sx={{ padding: 2 }}>
        <Typography marginBottom={2}>
          Changing your address and region will require customer support to
          change after creation, please ensure you have set the right address
          and region.
        </Typography>
        <Box
          sx={{
            display: 'flex',
            gap: 1,
            justifyContent: 'space-between',
          }}>
          <Box width={'100%'}>
            <Typography htmlFor='venueAddress'>Address</Typography>
            <MainThemeInput
              size='sm'
              id='venueAddress'
              type='text'
              {...register('location.address')}
            />
          </Box>
          <Box width={'100%'}>
            <Typography htmlFor='venueRegion'>Region</Typography>
            <MainThemeSelect size='sm' placeholder={'Select a region'}>
              {NorwegianCounties.map((region) => (
                <Option
                  key={region.name}
                  value={region.name}
                  {...register('location.city')}>
                  {region.name}
                </Option>
              ))}
            </MainThemeSelect>
          </Box>
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
          <MainThemeButton type='button' loading fullWidth />
        ) : (
          <MainThemeButton fullWidth type='submit'>
            Create Venue
          </MainThemeButton>
        )}
      </Box>
    </EditFormContainer>
  );
}

const FlexContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
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

const CreateVenueSchema = yup.object({
  name: yup.string().required().trim(),
  description: yup.string().required().trim(),
  media: yup.array().of(yup.string().required().trim()),

  price: yup.number().required().min(1),
  maxGuests: yup.number().required().min(1).max(100),

  meta: yup.object().shape({
    wifi: yup.boolean(),
    parking: yup.boolean(),
    breakfast: yup.boolean(),
    pets: yup.boolean(),
  }),

  location: yup.object().shape({
    address: yup.string().required().trim(),
    city: yup.string().required().trim(),
    country: yup.string().trim(),
    continent: yup.string().trim(),
  }),
});
