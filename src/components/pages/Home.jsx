import { Box } from '@mui/joy';
import { HeroCard, VenueCard } from '../cards';
import { MainGrid, StyledDivider } from '../../styles/GlobalStyles';

export default function Home({ data }) {
  if (!data || data.length === 0) return <div>Loading...</div>;

  return (
    <Box component={'main'}>
      {data && <HeroCard venue={data[14]} />}
      <StyledDivider />
      <MainGrid maxWidth='lg' sx={{ marginTop: 2 }}>
        {data &&
          data.map((venue) => <VenueCard key={venue.id} venue={venue} />)}
      </MainGrid>
    </Box>
  );
}
