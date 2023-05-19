import { Modal, ModalDialog, styled, Box, Typography, Button } from '@mui/joy';
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
  padding: theme.spacing(1),
  paddingX: theme.spacing(4),
}));

const StyledModalDialog = styled(ModalDialog)(({ theme }) => ({
  borderRadius: 5,
  border: 'none',
}));

export default function SearchModal({
  handleChange,
  open,
  venues,
  search,
  setFiltered,
  filtered,
  handleClose,
  setSearch,
}) {
  const [isShown, setIsShown] = useState(true);

  const handleToggle = () => {
    isShown ? setIsShown(false) : setIsShown(true);
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <StyledModalDialog
        layout='center'
        variant='outlined'
        sx={{
          width: '100%',
          height: '100%',
          padding: 0,
          position: 'relative',
        }}>
        <Box
          sx={{
            padding: 1,
            display: 'flex',
            justifyContent: 'space-between',
            borderBottom: (theme) =>
              theme.palette.mode === 'dark'
                ? `1px solid ${theme.palette.neutral[50]}`
                : `1px solid ${theme.palette.primary[500]}`,

            backgroundColor: (theme) =>
              theme.palette.mode === 'dark'
                ? theme.palette.primary[500]
                : theme.palette.neutral[100],
          }}>
          <MainThemeButton
            startDecorator={<TuneIcon fontSize='sm' />}
            onClick={handleToggle}
            size='sm'>
            {isShown ? 'Hide Filters' : 'Show Filters'}
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
            Close Menu
          </MainThemeButton>
        </Box>
        {isShown && (
          <Box
            sx={{
              backgroundColor: 'rgba(0, 0, 0, .1)',
              paddingX: 2,
              paddingTop: 1,
              borderBottom: (theme) =>
                theme.palette.mode === 'dark'
                  ? `1px solid ${theme.palette.neutral[50]}`
                  : `1px solid ${theme.palette.primary[500]}`,
            }}>
            <Box
              sx={{
                margin: '0 auto',
                width: '100%',
                minWidth: '230px',
                maxWidth: '500px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 1,
              }}>
              <MainThemeInput
                endDecorator={<SearchIcon />}
                fullWidth
                id='search-input'
                onChange={handleChange}
                size='sm'
                placeholder={'Search'}
              />
              {search.length > 0 && (
                <MainThemeButton
                  onClick={() => {
                    setSearch('');
                    document.getElementById('search-input').value = '';
                  }}
                  size='sm'
                  variant='plain'>
                  Clear
                </MainThemeButton>
              )}
            </Box>
            <Filters
              venues={venues}
              search={search}
              setFiltered={setFiltered}
              setSearch={setSearch}
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
                gridColumnStart: '-1',
                gridColumnEnd: '1',
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
