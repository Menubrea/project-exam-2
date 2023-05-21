import { Box, Container, styled } from '@mui/joy';
import { MainGrid } from '../../styles/GlobalStyles';
import { Filters } from '../venueData';
import { useEffect, useState } from 'react';
import { SearchCard } from '../cards';
import Loading from '../Loading';
import { FilterTags, FilterMenu } from '../venueData/filterComponents';

const Filter = styled(Box)(() => ({
  inset: 0,
  position: 'fixed',
  zIndex: 1,
  backgroundColor: 'rgba(0,0,0,0.5)',
  backdropFilter: 'blur(5px)',
}));

const FilterMenuBox = styled(Box)(({ theme }) => ({
  position: 'fixed',
  zIndex: 1,
  top: 54,
  height: 'calc(100vh - 54px)',
  transform: 'translateX(-100%)',
  transition: 'transform 0.3s ease-in-out',
  overflowY: 'auto',
  borderRight:
    theme.palette.mode === 'dark'
      ? `1px solid ${theme.palette.common.white}`
      : `1px solid ${theme.palette.primary[500]}`,
  backgroundColor:
    theme.palette.mode === 'dark'
      ? theme.palette.primary[700]
      : theme.palette.neutral[100],
}));

export default function Browse({ venues }) {
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [isShown, setIsShown] = useState(false);
  const [guests, setGuests] = useState(1);
  const [value, setValue] = useState([0, 0]);
  const [lowestPrice, setLowestPrice] = useState(0);
  const [highestPrice, setHighestPrice] = useState(1);
  const [region, setRegion] = useState('All Regions');

  const ResetFilters = () => {
    setGuests(1);
    setRegion('All Regions');
    setValue([lowestPrice, highestPrice]);
    setFiltered(venues);
    setSearch('');
    const search = document.getElementById('search-input');
    search.value = '';
  };

  const handleToggle = () => {
    setIsShown((prev) => !prev);
  };

  useEffect(() => {
    const filterMenu = document.getElementById('filter-menu');
    document.body.style.overflowY = isShown ? 'hidden' : 'auto';
    if (filterMenu) {
      isShown
        ? (filterMenu.style.transform = 'translateX(0)')
        : (filterMenu.style.transform = 'translateX(-100%)');
    }

    return () => {
      document.body.style.overflowY = 'auto';
    };
  }, [isShown]);

  if (venues.length === 0) return <Loading />;

  return (
    <Box
      component={'main'}
      sx={{
        paddingTop: '70px',
        position: 'relative',
        minHeight: '80vh',
      }}>
      <Container>
        <FilterMenu ResetFilters={ResetFilters} handleToggle={handleToggle} />
        <FilterTags
          filtered={filtered}
          search={search}
          region={region}
          guests={guests}
          value={value}
        />
        <MainGrid>
          {filtered &&
            filtered.map((venue) => (
              <SearchCard key={venue.id} venue={venue} />
            ))}
        </MainGrid>
      </Container>
      <FilterMenuBox
        sx={{ width: { xs: '100%', sm: '50%', md: '35%', zIndex: 2 } }}
        id='filter-menu'>
        <Filters
          filterState={{
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
            search,
            setSearch,
            venues,
            setFiltered,
            handleToggle,
            filtered,
            ResetFilters,
          }}
        />
      </FilterMenuBox>
      <Filter
        onClick={handleToggle}
        sx={{
          display: isShown ? 'block' : 'none',
        }}
      />
    </Box>
  );
}
