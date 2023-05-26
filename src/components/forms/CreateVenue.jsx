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
  MainThemeSelect,
  StyledOption,
  StyledButton,
} from '../../styles/GlobalStyles';

import CloseIcon from '@mui/icons-material/Close';
import { NorwegianCounties } from '../../constants/counties';

export default function CreateVenue({
  token,
  setProfileVenues,
  setFilteredVenues,
  handleCloseSlideOut,
}) {
  const [mediaArray, setMediaArray] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [mediaMessage, setMediaMessage] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    location: {
      address: '',
      city: '',
    },
  });

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const validateSubmit = () => {
    if (
      formData.name.length > 0 &&
      formData.description.length > 0 &&
      formData.location.address.length > 0 &&
      formData.location.city.length > 0 &&
      mediaArray.length > 0
    ) {
      return true;
    }
    setMessage('All fields required, including minimum 1 image.');
    setTimeout(() => {
      setMessage('');
    }, 3000);
    return false;
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

  const handleImageSetMain = (index) => {
    const mainImage = mediaArray[index];
    const newMediaArray = mediaArray.filter((item, i) => i !== index);
    setMediaArray([mainImage, ...newMediaArray]);
  };

  const handleRemoveMedia = (index) => {
    setMediaArray(mediaArray.filter((item, i) => i !== index));
  };

  const resetStates = () => {
    setMediaArray([]);
    setInputValue('');
    setMediaMessage('');
    setFormData({
      name: '',
      description: '',
      location: {
        address: '',
        city: '',
      },
    });
  };

  const createForm = useForm({
    resolver: yupResolver(CreateVenueSchema),
    defaultValues: {
      media: [],
      location: {
        city: '',
        country: 'Norway',
        continent: 'Europe',
      },
    },
  });

  useEffect(() => {
    createForm.setValue('media', mediaArray);
  }, [createForm, mediaArray]);

  const { register, handleSubmit } = createForm;

  const submitEdit = async (data) => {
    try {
      setLoading(true);
      const res = await fetch(`https://api.noroff.dev/api/v1/holidaze/venues`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      switch (res.status) {
        case 201:
          const result = await res.json();
          setMessage(`${result.name} was successfully created`);
          setProfileVenues((prev) => [...prev, result]);
          setFilteredVenues((prev) => [...prev, result]);
          resetStates();
          setTimeout(() => {
            handleCloseSlideOut();
          }, 1000);
          break;
        case 400:
          setMessage('Invalid image url provided');
          throw new Error('Something went wrong');
        default:
          setMessage('Something went wrong, please try again');
          throw new Error('Something went wrong');
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
      id='createVenueForm'
      sx={{ marginTop: 1 }}
      component={'form'}
      onSubmit={handleSubmit(submitEdit)}>
      <Box sx={{ padding: 2 }}>
        <Typography level='h6' component={'h3'}>
          Create a new Venue
        </Typography>
        <Typography>
          Create a new venue by filling out the form below. All fields are
          required.
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
            onKeyUp={(e) => {
              setFormData({ ...formData, name: e.target.value });
            }}
            type='text'
            name='name'
            slotProps={{
              input: {
                minLength: 1,
                maxLength: 50,
                pattern: '[a-zA-Z\\s]+',
                title: 'Only letters and spaces are allowed',
              },
            }}
            {...register('name')}
          />
          <Typography padding={0.5} level='body3' textAlign={'right'}>
            {formData.name.length === 0
              ? `Please provide a name`
              : formData.name.length + '/50'}
          </Typography>
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
                pattern: '[0-9]*',
                min: 1,
              },
            }}
            {...register('price')}
          />
        </Box>

        <Box>
          <Typography htmlFor='venueMaxGuests'>Guests</Typography>
          <MainThemeInput
            sx={{ maxWidth: { xs: '100%', sm: '100px' } }}
            size='sm'
            id='venueMaxGuests'
            required
            title='Max guests'
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
          {mediaArray.map((mediaItem, index) => (
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
                  aria-label='Remove image'
                  onClick={() => handleRemoveMedia(index)}>
                  <CloseIcon
                    sx={{ position: 'absolute', top: 15, right: 15 }}
                  />
                </StyledButton>
              </Box>
            </Box>
          ))}
          {mediaArray.length === 0 && (
            <Typography textAlign={'center'} level='body1'>
              Please provide an image url, it should display here as an image if
              the url is valid.
            </Typography>
          )}
        </Box>
        <Box marginTop={1}>
          <Typography aria-label='addMedia' component={'label'}>
            Add images
          </Typography>
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
          <Typography padding={0.5} level='body3' textAlign={'right'}>
            {mediaMessage}
          </Typography>
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
          required
          size='lg'
          onKeyUp={(e) => {
            setFormData({ ...formData, description: e.target.value });
          }}
          slotProps={{
            textarea: {
              minLength: 1,
              maxLength: 480,
            },
          }}
          {...register('description')}
        />
        <Typography padding={0.5} level='body3' textAlign={'right'}>
          {formData.description.length === 0
            ? `Please provide a description`
            : formData.description.length + '/480'}
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
        <Typography marginBottom={1}>
          Does your venue have access to:
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: { xs: 2, sm: 2, md: 1 },
          }}>
          <Checkbox name='meta.wifi' label='wifi' {...register('meta.wifi')} />
          <Checkbox
            name='meta.parking'
            label='parking'
            {...register('meta.parking')}
          />
          <Checkbox
            name='meta.breakfast'
            label='breakfast'
            {...register('meta.breakfast')}
          />
          <Checkbox name='meta.pets' label='pets' {...register('meta.pets')} />
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
            display: { xs: 'block', sm: 'flex' },
            gap: 1,
            justifyContent: 'space-between',
          }}>
          <Box width={'100%'}>
            <Typography htmlFor='venueAddress'>Address</Typography>
            <MainThemeInput
              size='sm'
              required
              onKeyUp={(e) => {
                setFormData({
                  ...formData,
                  location: {
                    ...formData.location,
                    address: e.target.value,
                  },
                });
              }}
              id='venueAddress'
              type='text'
              {...register('location.address')}
            />
            <Typography padding={0.5} level='body3' textAlign={'right'}>
              {formData.location.address === '' && `Please provide an address`}
            </Typography>
          </Box>
          <Box width={'100%'}>
            <Typography htmlFor='venueRegion'>Region</Typography>
            <MainThemeSelect
              size='sm'
              required={true}
              id='venueRegion'
              placeholder={'Select a region'}
              defaultValue={'Select a region'}
              slotProps={{
                select: {
                  title: 'Please select a region',
                },
              }}>
              {NorwegianCounties.map((region) => (
                <StyledOption
                  onClick={(e) => {
                    setFormData({
                      ...formData,
                      location: {
                        ...formData.location,
                        city: e.target.outerText,
                      },
                    });
                    createForm.setValue('location.city', e.target.outerText);
                  }}
                  key={region.name}
                  value={region.name}>
                  {region.name}
                </StyledOption>
              ))}
            </MainThemeSelect>

            <Typography padding={0.5} level='body3' textAlign={'right'}>
              {formData.location.city === '' && `Please select a region`}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box padding={1} marginTop={0}>
        {loading ? (
          <MainThemeButton
            type='button'
            loading
            loadingPosition='start'
            fullWidth>
            Creating Venue
          </MainThemeButton>
        ) : (
          <Box>
            {message ? (
              <MainThemeButton disabled fullWidth>
                {message && message}
              </MainThemeButton>
            ) : (
              <MainThemeButton onClick={validateSubmit} type='submit' fullWidth>
                Create Venue
              </MainThemeButton>
            )}
          </Box>
        )}
      </Box>
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

const CreateVenueSchema = yup.object({
  name: yup.string().required().min(1).max(35).trim(),
  description: yup.string().required().min(1).max(480).trim(),
  media: yup.array().required().min(1).of(yup.string().required().trim()),

  price: yup.number().required().min(1),
  maxGuests: yup.number().required().min(1).max(100),

  meta: yup.object().shape({
    wifi: yup.boolean(),
    parking: yup.boolean(),
    breakfast: yup.boolean(),
    pets: yup.boolean(),
  }),

  location: yup.object().shape({
    address: yup.string().required().min(1).trim(),
    city: yup.string().required().min(1).trim(),
    country: yup.string().trim(),
    continent: yup.string().trim(),
  }),
});
