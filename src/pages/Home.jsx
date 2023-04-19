import { Container } from '@mui/joy';
import { VenueCard } from '../components/Cards/VenueCard';
import { MainGrid } from '../styles/GlobalStyles';

export function Home({ data }) {
  console.log(data);

  return (
    <Container maxWidth='lg'>
      <MainGrid>
        {data &&
          data.map((venue) => <VenueCard key={venue.id} venue={venue} />)}
      </MainGrid>
    </Container>
  );
}
