import { ModalDialog, Modal, Box, Typography, styled } from '@mui/joy';
import {
  MainThemeInput,
  MainThemeButton,
  LinkWrapper,
} from '../../styles/GlobalStyles';
import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { AltMeta } from '../venueData';
import CloseIcon from '@mui/icons-material/Close';

export default function SearchVenueModal({ open, handleClose, venues }) {
  const [search, setSearch] = useState('');
  const [filtered, setFiltered] = useState([]);
  const inputRef = useRef(null);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleClear = (e) => {
    const input = e.target.previousSibling.firstElementChild;
    input.value = '';
    setSearch('');
    inputRef.current.focus();
  };

  useEffect(() => {
    setSearch('');
  }, [open]);

  useLayoutEffect(() => {
    setTimeout(() => {
      if (inputRef.current) inputRef.current.focus();
    }, 100);
  }, [inputRef, open]);

  useEffect(() => {
    const filteredVenues = venues.filter((venue) => {
      if (
        venue.name.toLowerCase().includes(search.toLowerCase()) ||
        venue.location.city.toLowerCase().includes(search.toLowerCase()) ||
        venue.maxGuests >= parseInt(search)
      ) {
        return true;
      }
      return false;
    });
    setFiltered(filteredVenues);
  }, [search, venues]);

  return (
    <Modal open={open} onClose={handleClose}>
      <ModalDialog
        sx={{
          margin: 0,
          padding: 0,
          borderRadius: 0,
          border: 0,
          width: 'clamp(300px, 90vw, 100vw)',
          height: 'clamp(50vh, 90vh, 100vh)',
          overflow: 'auto',
        }}>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 2,
            paddingBottom: 0,
          }}>
          <Typography component={'label'} level='h6'>
            Search Holidaze
          </Typography>
          <MainThemeButton
            endDecorator={<CloseIcon />}
            aria-label='Close Menu'
            size='sm'
            onClick={handleClose}>
            Close
          </MainThemeButton>
        </Box>
        <Box sx={{ display: 'flex', gap: 1, paddingX: 2, paddingTop: 2 }}>
          <MainThemeInput
            aria-label='Search for venues by name or region'
            slotProps={{
              input: {
                id: 'search-input',
                ref: inputRef,
              },
            }}
            onChange={handleSearch}
            fullWidth
            placeholder='Search by name or region'
          />
          {search && (
            <MainThemeButton
              aria-label='Clear input field'
              size='sm'
              onClick={handleClear}>
              Clear
            </MainThemeButton>
          )}
        </Box>
        <Box
          sx={{
            padding: 2,
            paddingY: 1,
            marginY: 2,
            display: { sm: 'block', md: 'flex' },
            justifyContent: 'space-between',
            borderBlock: (theme) =>
              theme.palette.mode === 'dark'
                ? `1px solid ${theme.palette.primary[400]}`
                : `1px solid ${theme.palette.neutral[400]}`,
          }}>
          <Typography sx={{ lineBreak: 'auto' }}>
            {search.length > 0 && 'Searching: ' + search}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              gap: 1,
              width: 'fit-content',
              margin: '0 0 0 auto',
            }}>
            <Typography>
              {search.length > 0 && 'Found: ' + filtered.length}
            </Typography>
            <Typography>Total: {venues.length}</Typography>
          </Box>
        </Box>
        <Box
          sx={{
            paddingX: 2,
            paddingBottom: 2,
            display: 'flex',
            gap: 1,
            flexWrap: 'wrap',
          }}>
          {filtered &&
            filtered.map((venue) => (
              <StyledCard onClick={handleClose} key={venue.id}>
                <LinkWrapper to={`/venue/${venue.id}`}>
                  <Box
                    component={'img'}
                    src={venue.media[0]}
                    alt={`Image of ${venue.name}`}
                  />
                  <Typography fontWeight={600}>{venue.name}</Typography>
                  <AltMeta venue={venue} />
                </LinkWrapper>
              </StyledCard>
            ))}
        </Box>
      </ModalDialog>
    </Modal>
  );
}

const StyledCard = styled(Box)(({ theme }) => ({
  position: 'relative',
  backgroundColor: theme.palette.primary[700],

  border: `1px solid ${theme.palette.primary[400]}`,
  ':hover': {
    backgroundColor: theme.palette.primary[600],
  },
  borderRadius: 5,
  padding: theme.spacing(1),
  minWidth: 220,
  flexGrow: 1,
  cursor: 'pointer',

  '& img': {
    position: 'absolute',
    width: 50,
    height: 50,
    aspectRatio: '1 / 1',
    objectFit: 'cover',
    right: -7,
    top: -7,
    zIndex: 1,
    border:
      theme.palette.mode === 'dark'
        ? `2px solid ${theme.palette.primary[500]}`
        : `2px solid ${theme.palette.neutral[100]}`,
  },

  '& div > *': {
    backgroundColor: theme.palette.primary[500],
  },

  '& p, svg': {
    color: theme.palette.neutral[50],
  },
}));
