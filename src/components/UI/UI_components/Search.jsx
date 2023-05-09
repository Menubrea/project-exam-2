import {
  LinkWrapper,
  MainThemeInput,
  MainThemeButton,
} from '../../../styles/GlobalStyles';
import {
  Box,
  Typography,
  Slider,
  Select,
  Option,
  Modal,
  ModalDialog,
  ModalClose,
  styled,
} from '@mui/joy';
import { useEffect, useState } from 'react';
import { VenueMeta, VenuePrice } from '../../venueData';

const StyledGrid = styled(Box)(({ theme }) => ({
  position: 'relative',
  overflowY: 'auto',
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
  gap: theme.spacing(1),
  backgroundColor: 'rgba(0, 0, 0, .1)',
}));

export default function Search({ venues }) {
  const [search, setSearch] = useState('');
  const [filtered, setFiltered] = useState([]);
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    setAnchorEl(document.getElementById('search-input'));
  }, [open]);

  useEffect(() => {
    if (anchorEl) {
      anchorEl.focus();
    }
  }, [anchorEl]);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleOpenSearch = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSearch('');
  };

  return (
    <>
      <MainThemeButton size='sm' onClick={handleOpenSearch}>
        {open ? 'Close' : 'Find your Vacation'}
      </MainThemeButton>

      <Modal open={open}>
        <ModalDialog
          sx={{ width: '100%', height: '100%', padding: { xs: 0.5, sm: 2 } }}>
          <Box sx={{ width: 'fit-content', margin: '0 auto', marginTop: 2 }}>
            <MainThemeInput
              id='search-input'
              onChange={handleChange}
              size='sm'
              placeholder={'Search'}
              sx={{
                paddingX: 2,
                width: '100%',
                minWidth: '230px',
                maxWidth: '600px',
                borderRadius: '100px',
              }}
            />
          </Box>
          <Filters
            venues={venues}
            search={search}
            setFiltered={setFiltered}
            filtered={filtered}
          />
          <StyledGrid>
            {filtered.length > 0 ? (
              filtered.map((venue) => (
                <LinkWrapper
                  key={venue.id}
                  to={`/venue/${venue.id}`}
                  onClick={handleClose}>
                  <Box sx={{ position: 'relative' }}>
                    <Box
                      component={'img'}
                      src={venue.media[0]}
                      alt={`${venue.name} media`}
                      sx={{
                        width: '100%',
                        objectFit: 'cover',
                        height: '190px',
                      }}
                    />
                    <VenueMeta
                      meta={venue.meta}
                      maxGuests={venue.maxGuests}
                      position='absolute'
                    />
                    <VenuePrice venue={venue} />
                    <Typography
                      level='body1'
                      textAlign={'center'}
                      component={'p'}>
                      {venue.name}
                    </Typography>
                  </Box>
                </LinkWrapper>
              ))
            ) : (
              <Box sx={{ textAlign: 'center' }}>No Results found.</Box>
            )}
          </StyledGrid>
          <ModalClose
            getAriaLabel={() => 'Close Search'}
            size='sm'
            variant='solid'
            color='primary'
            sx={{
              top: -10,
              right: -10,
              borderRadius: '100%',
              border: '1px solid #fff',
            }}
            onClick={handleClose}
          />
        </ModalDialog>
      </Modal>
    </>
  );
}

const Filters = ({ venues, setFiltered, search, filtered }) => {
  const [guests, setGuests] = useState(1);
  const [value, setValue] = useState([0, 0]);
  const [lowestPrice, setLowestPrice] = useState(0);
  const [highestPrice, setHighestPrice] = useState(1);
  const [region, setRegion] = useState('All');

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
    const filteredVenues = venues.filter((venue) => {
      if (
        venue.maxGuests >= guests &&
        venue.price >= value[0] &&
        venue.price <= value[1] &&
        (venue.location.city === region || region === 'All') &&
        venue.name.toLowerCase().startsWith(search.toLowerCase())
      ) {
        return true;
      }
      return false;
    });
    setFiltered(filteredVenues);
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
          padding: { xs: 2, md: 4 },
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: { xs: 0, sm: 4 },
          justifyContent: 'space-between',
        }}>
        <Box>
          <Typography>Guests</Typography>
          <Select size='sm' placeholder='How many guests?'>
            <Option value={'Any'} onClick={() => setGuests(1)}>
              Any
            </Option>
            {sortedGuests.map((guest) => (
              <Option
                key={guest}
                value={guest}
                onClick={() => setGuests(guest)}>
                {guest}
              </Option>
            ))}
          </Select>
        </Box>
        <Box>
          <Typography textAlign={'center'}>Price range:</Typography>
          <Slider
            size='sm'
            getAriaLabel={() => 'Price Range'}
            value={value}
            onChange={handleChange}
            getAriaValueText={valueText}
            valueLabelDisplay='on'
            x
            step={100}
            marks={[
              { value: lowestPrice, label: `${lowestPrice},-` },
              { value: highestPrice, label: `${highestPrice},-` },
            ]}
            min={lowestPrice}
            max={highestPrice}
          />
        </Box>
        <Box>
          <Typography>County</Typography>
          <Select size='sm' placeholder='Choose County'>
            <Option value={'All'} onClick={() => setRegion('All')}>
              All
            </Option>
            {regionArray.map((region) => (
              <Option
                key={region}
                value={region}
                onClick={() => setRegion(region)}>
                {region}{' '}
              </Option>
            ))}
          </Select>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Box
          sx={{
            display: { xs: 'none', md: 'flex' },
            flexWrap: 'wrap',
            gap: 1,
            width: 'fit-content',
          }}>
          <Typography
            sx={{
              backgroundColor: 'rgba(0, 0, 0, .1)',
              padding: '0.2em .5em',
              borderRadius: '5px 5px 0 0',
            }}>
            Price range: {value[0]} kr - {value[1]} kr
          </Typography>
          <Typography
            sx={{
              backgroundColor: 'rgba(0, 0, 0, .1)',
              padding: '0.2em .5em',
              borderRadius: '5px 5px 0 0',
            }}>
            Region: {region}
          </Typography>
          <Typography
            sx={{
              backgroundColor: 'rgba(0, 0, 0, .1)',
              padding: '0.2em .5em',
              borderRadius: '5px 5px 0 0',
            }}>
            Min guest(s): {guests}
          </Typography>
          {search && (
            <Typography
              sx={{
                backgroundColor: 'rgba(0, 0, 0, .1)',
                padding: '0.2em .5em',
                borderRadius: '5px 5px 0 0',
              }}>
              Searching: {search}
            </Typography>
          )}
        </Box>
        <Box
          sx={{
            width: 'fit-content',
            margin: { xs: '0 auto', md: '0 0 0 auto' },
          }}>
          <Typography level='body1'>
            {filtered.length} results found for your search.
          </Typography>
        </Box>
      </Box>
    </>
  );
};
