import { Modal, ModalDialog, ModalClose, styled, Box, Input } from '@mui/joy';
import { MainThemeInput } from '../../styles/GlobalStyles';
import { Filters } from '../venueData';
import { SearchCard } from '../cards';
import SearchIcon from '@mui/icons-material/Search';

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
  return (
    <Modal open={open}>
      <StyledModalDialog
        layout='center'
        variant='outlined'
        sx={{ width: '100%', height: '100%', padding: { xs: 0.5, sm: 2 } }}>
        <Box
          sx={{
            margin: '0 auto',
            paddingX: 2,
            width: '100%',
            minWidth: '230px',
            maxWidth: '600px',
            borderRadius: '100px',
          }}>
          <Input
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
            <Box sx={{ textAlign: 'center' }}>No Results found.</Box>
          )}
        </StyledGrid>
        <ModalClose
          getAriaLabel={() => 'Close Search'}
          size='sm'
          variant='solid'
          color='primary'
          sx={{
            border: '1px solid #fff',
          }}
          onClick={handleClose}
        />
      </StyledModalDialog>
    </Modal>
  );
}
