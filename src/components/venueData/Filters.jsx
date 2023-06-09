import { useEffect } from 'react';
import { Box, Typography, styled } from '@mui/joy';
import { MainThemeButton } from '../../styles/GlobalStyles';
import CloseIcon from '@mui/icons-material/Close';
import {
  FilterTags,
  FilterSlider,
  FilterGuests,
  FilterRegion,
  FilterSearch,
} from './filterComponents';
import { VenuePill } from '../cards';

/**
 * Component for rendering the filters menu
 * @param {Object} filterState - The filter state.
 * @returns {JSX.Element}
 */
export default function Filters({ filterState }) {
  const {
    venues,
    setFiltered,
    search,
    value,
    setValue,
    lowestPrice,
    setLowestPrice,
    highestPrice,
    setHighestPrice,
    guests,
    setGuests,
    region,
    setRegion,
    handleToggle,
    setSearch,
    filtered,
    ResetFilters,
  } = filterState;

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

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <>
      <StyledHeader>
        <Typography level='body1' component={'h2'}>
          Manage filters
        </Typography>
        <MainThemeButton
          aria-label='Close Menu'
          size='sm'
          onClick={handleToggle}>
          <CloseIcon />
        </MainThemeButton>
      </StyledHeader>
      <ContentBox>
        <Typography level='body2' component={'h3'}>
          Current filter settings:
        </Typography>
        <FilterTags
          search={search}
          region={region}
          guests={guests}
          filtered={filtered}
          value={value}
        />
      </ContentBox>
      <Box sx={{ paddingX: 2, display: 'flex', gap: 2, marginTop: 2 }}>
        <FilterSearch
          search={search}
          setSearch={setSearch}
          handleSearch={handleSearch}
        />
      </Box>
      <Box
        sx={{
          padding: 2,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
          gap: { xs: 1, sm: 2 },
          justifyContent: 'space-between',
        }}>
        <Box>
          <FilterGuests
            guests={guests}
            setGuests={setGuests}
            sortedGuests={sortedGuests}
          />
        </Box>
        <Box>
          <FilterRegion
            region={region}
            setRegion={setRegion}
            regionArray={regionArray}
          />
        </Box>
      </Box>
      <FilterSlider
        value={value}
        handleChange={handleChange}
        lowestPrice={lowestPrice}
        highestPrice={highestPrice}
        valueText={valueText}
      />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: 1,
          paddingX: 2,
          borderBottom: (theme) =>
            `1px solid ${
              theme.palette.mode === 'dark'
                ? theme.palette.common.white
                : theme.palette.primary[700]
            }`,
        }}>
        <MainThemeButton
          startDecorator={<CloseIcon />}
          onClick={ResetFilters}
          size='sm'>
          Clear
        </MainThemeButton>
        <MainThemeButton size='sm' onClick={handleToggle}>
          Show {filtered.length} results
        </MainThemeButton>
      </Box>
      <HiddenDisplay>
        <Typography marginBottom={1} level='body2' component={'h3'}>
          Quick view:
        </Typography>
        <VenuePillBox>
          {filtered.length > 0 &&
            filtered.map((venue, i) => (
              <VenuePill key={venue.id} venue={venue} />
            ))}
        </VenuePillBox>
      </HiddenDisplay>
    </>
  );
}

const ContentBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2, 2, 0, 2),
  borderBottom:
    theme.palette.mode === 'dark'
      ? `1px solid ${theme.palette.common.white}`
      : `1px solid ${theme.palette.primary[700]}`,
}));

const HiddenDisplay = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
}));

const VenuePillBox = styled(Box)(() => ({
  overflow: 'auto',
  marginTop: 0,
  display: 'flex',
  flexWrap: 'wrap',
}));

const StyledHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '8px 16px',
  backgroundColor: 'rgba(0, 0, 0, .05)',
  borderBottom:
    theme.palette.mode === 'dark'
      ? `1px solid ${theme.palette.common.white}`
      : `1px solid ${theme.palette.primary[700]}`,
}));
