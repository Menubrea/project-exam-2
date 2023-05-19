import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/joy';
import {
  MainThemeButton,
  MainThemeSelect,
  StyledOption,
  StyledSlider,
} from '../../styles/GlobalStyles';
import CloseIcon from '@mui/icons-material/Close';

export default function Filters({
  venues,
  setFiltered,
  search,
  filtered,
  setSearch,
}) {
  const [guests, setGuests] = useState(1);
  const [value, setValue] = useState([0, 0]);
  const [lowestPrice, setLowestPrice] = useState(0);
  const [highestPrice, setHighestPrice] = useState(1);
  const [region, setRegion] = useState('All Regions');

  const regionSet = new Set(venues.map((venue) => venue.location.city));
  const guestSet = new Set(venues.map((venue) => venue.maxGuests));
  const guestsArray = [...guestSet];
  const sortedGuests = guestsArray.sort((a, b) => a - b);
  const regionArray = [...regionSet];

  useEffect(() => {
    if (venues) {
      const sortedVenues = venues.sort((a, b) => a.price - b.price);
      if (sortedVenues) {
        const lowestPrice = sortedVenues[0].price;
        const highestPrice = sortedVenues[sortedVenues.length - 1].price;
        setLowestPrice(lowestPrice);
        setHighestPrice(highestPrice);
        setValue([lowestPrice, highestPrice]);
      }
    }
  }, [venues]);

  const ResetFilters = () => {
    setGuests(1);
    setRegion('All Regions');
    setValue([lowestPrice, highestPrice]);
    setFiltered(venues);
    setSearch('');
    const search = document.getElementById('search-input');
    search.value = '';
  };

  useEffect(() => {
    const storedGuests = sessionStorage.getItem('guests');
    const storedRegion = sessionStorage.getItem('region');
    const lowestPrice = sessionStorage.getItem('lowestPrice');
    const highestPrice = sessionStorage.getItem('highestPrice');

    if (storedGuests && storedRegion && lowestPrice && highestPrice) {
      setGuests(JSON.parse(storedGuests));
      setRegion(storedRegion);
      setValue([JSON.parse(lowestPrice), JSON.parse(highestPrice)]);
      setRegion(storedRegion || 'All Regions');
    }
  }, []);

  useEffect(() => {
    const filteredVenues = venues.filter((venue) => {
      if (
        venue.maxGuests >= guests &&
        venue.price >= value[0] &&
        venue.price <= value[1] &&
        (venue.location.city === region || region === 'All Regions') &&
        venue.name.toLowerCase().startsWith(search.toLowerCase())
      ) {
        return true;
      }
      return false;
    });
    setFiltered(filteredVenues);
    sessionStorage.setItem('guests', guests);
    sessionStorage.setItem('region', region);
    sessionStorage.setItem('lowestPrice', JSON.stringify(value[0]));
    sessionStorage.setItem('highestPrice', JSON.stringify(value[1]));
  }, [guests, venues, value, region, search]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function valueText(value) {
    return `${value},-`;
  }

  return (
    <>
      <Box
        sx={{
          paddingY: { xs: 1 },
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
          gap: { xs: 1, sm: 2 },
          justifyContent: 'space-between',
        }}>
        <Box>
          <MainThemeSelect
            value={guests}
            id='pickGuests'
            variant='solid'
            color='primary'
            aria-label='pick Guests'
            aria-roledescription='pick Guests'
            size='sm'
            placeholder='Guests'>
            <StyledOption value={'Any'} onClick={() => setGuests(1)}>
              Any
            </StyledOption>
            {sortedGuests.map((guest) => (
              <StyledOption
                key={guest}
                value={guest}
                onClick={() => setGuests(guest)}>
                {guest}
              </StyledOption>
            ))}
          </MainThemeSelect>
        </Box>
        <Box>
          <MainThemeSelect
            value={region}
            id='setRegion'
            size='sm'
            aria-label='set Region'
            aria-roledescription='set Region'
            placeholder='Choose Region'>
            <StyledOption
              value={'All Regions'}
              onClick={() => setRegion('All Regions')}>
              All Regions
            </StyledOption>
            {regionArray.map((region) => (
              <StyledOption
                id={`region-${region}`}
                key={region}
                value={region}
                onClick={() => setRegion(region)}>
                {region}{' '}
              </StyledOption>
            ))}
          </MainThemeSelect>
        </Box>
      </Box>
      <Box marginBottom={1}>
        <StyledSlider
          sx={{
            '--Slider-thumbSize': 0,
            marginTop: 3,
          }}
          id='priceRange'
          variant='solid'
          size='md'
          value={value}
          onChange={handleChange}
          getAriaValueText={valueText}
          valueLabelDisplay='on'
          step={100}
          min={lowestPrice}
          max={highestPrice}
          marks
        />
        <Typography
          sx={{
            backgroundColor: (theme) => theme.palette.primary[600],
            color: (theme) => theme.palette.common.white,
            width: 'fit-content',
            margin: '0 auto',
            padding: '.1em .5em',
            borderRadius: '0 0 5px 5px',
          }}
          htmlFor='priceRange'
          textAlign={'center'}
          component={'label'}>
          Price range:
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Box
          sx={{
            display: { xs: 'none', sm: 'flex' },
            flexWrap: 'wrap',
            gap: 1,
            width: 'fit-content',
          }}>
          <Typography
            level='body3'
            sx={{
              backgroundColor: 'rgba(0, 0, 0, .05)',
              padding: '.5em',
              borderRadius: '5px 5px 0 0',
            }}>
            Price range: {value[0]} kr - {value[1]} kr
          </Typography>
          <Typography
            level='body3'
            sx={{
              backgroundColor: 'rgba(0, 0, 0, .05)',
              padding: '.5em',
              borderRadius: '5px 5px 0 0',
            }}>
            Region: {region}
          </Typography>
          <Typography
            level='body3'
            sx={{
              backgroundColor: 'rgba(0, 0, 0, .05)',
              padding: '.5em',
              borderRadius: '5px 5px 0 0',
            }}>
            Min guest(s): {guests}
          </Typography>
          {search && (
            <Typography
              level='body3'
              sx={{
                backgroundColor: 'rgba(0, 0, 0, .05)',
                padding: '.5em',
                borderRadius: '5px 5px 0 0',
              }}>
              Searching: {search}
            </Typography>
          )}
        </Box>
        <Box
          sx={{
            width: 'fit-content',
            margin: { xs: '0 auto', sm: '0 0 0 auto' },
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}>
          <Typography
            level='body3'
            sx={{
              backgroundColor: 'rgba(0, 0, 0, .05)',
              padding: '.5em',
              borderRadius: '5px 5px 0 0',
            }}>
            {filtered.length} results found.
          </Typography>
          <MainThemeButton
            endDecorator={<CloseIcon fontSize='sm' />}
            sx={{
              fontSize: '.8rem',
              paddingY: 0,
              paddingX: 1,
              borderRadius: '5px 5px 0 0',
            }}
            size='sm'
            onClick={ResetFilters}>
            Reset Filters
          </MainThemeButton>
        </Box>
      </Box>
    </>
  );
}
