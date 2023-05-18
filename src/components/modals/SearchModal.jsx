import { Modal, ModalDialog, styled, Box, Typography } from '@mui/joy';
import { MainThemeInput, MainThemeButton } from '../../styles/GlobalStyles';
import { Filters } from '../venueData';
import { SearchCard } from '../cards';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import TuneIcon from '@mui/icons-material/Tune';

const StyledGrid = styled(Box)(({ theme }) => ({
  position: 'relative',
  overflowY: 'auto',
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
  gap: theme.spacing(1),
}));

const StyledModalDialog = styled(ModalDialog)(({ theme }) => ({
  border:
    theme.palette.mode === 'dark'
      ? '1px solid #fff'
      : `1px solid ${theme.palette.primary[500]}`,
  borderRadius: 5,
}));

export default function SearchModal({
  handleChange,
  open,
  venues,
  search,
  setFiltered,
  filtered,
  handleClose,
}) {
  const [isShown, setIsShown] = useState(true);

  const handleToggle = () => {
    isShown ? setIsShown(false) : setIsShown(true);
  };
  return (
    <Modal open={open}>
      <StyledModalDialog
        layout='fullscreen'
        variant='outlined'
        sx={{ width: '100%', height: '100%', padding: { xs: 0.5, sm: 2 } }}>
        <Box
          sx={{
            marginBottom: 1,
            display: 'flex',
            justifyContent: 'space-between',
          }}>
          <MainThemeButton
            startDecorator={<TuneIcon />}
            onClick={handleToggle}
            size='sm'>
            Filters
          </MainThemeButton>{' '}
          <MainThemeButton
            aria-label='close modal'
            size='sm'
            variant='solid'
            color='primary'
            sx={{
              border: '1px solid #fff',
            }}
            onClick={handleClose}>
            Close
          </MainThemeButton>
        </Box>
        {isShown && (
          <Box>
            <Box
              sx={{
                margin: '0 auto',
                paddingX: 2,
                width: '100%',
                minWidth: '230px',
                maxWidth: '600px',
                borderRadius: '100px',
              }}>
              <MainThemeInput
                variant='outlined'
                endDecorator={<SearchIcon />}
                id='search-input'
                onChange={handleChange}
                size='lg'
                placeholder={'Search'}
              />
            </Box>
            <Filters
              venues={venues}
              search={search}
              setFiltered={setFiltered}
              filtered={filtered}
            />
          </Box>
        )}
        <StyledGrid>
          {filtered.length > 0 ? (
            filtered.map((venue) => (
              <SearchCard
                key={venue.id}
                venue={venue}
                handleClose={handleClose}
              />
            ))
          ) : (
            <Box
              sx={{
                gridColumnStart: '2',
                paddingTop: 10,
              }}>
              <Typography
                sx={{ textAlign: 'center' }}
                level='h5'
                component={'p'}>
                No results found.
              </Typography>
            </Box>
          )}
        </StyledGrid>
      </StyledModalDialog>
    </Modal>
  );
}
