import { Box } from '@mui/joy';
import { HeroCard, VenueCard } from '../cards';
import { MainGrid } from '../../styles/GlobalStyles';

export default function Home({ data }) {
  console.log(data[0]);
  if (!data || data.length === 0) return <div>Loading...</div>;

  return (
    <Box component={'main'}>
      {data && <HeroCard venue={data[6]} />}
      <MainGrid maxWidth='lg'>
        {data &&
          data.map((venue) => <VenueCard key={venue.id} venue={venue} />)}
      </MainGrid>
    </Box>
  );
}
