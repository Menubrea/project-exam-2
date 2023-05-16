import { Box, Container } from '@mui/joy';
import { HeroCard, VenueCard } from '../cards';
import { MainGrid, StyledDivider } from '../../styles/GlobalStyles';
import Loading from '../Loading';

export default function Home({ data, error, loading }) {
  if (!data || data.length === 0 || loading)
    return <Loading>Loading...</Loading>;

  if (error) return <div>Error</div>;

  const promotedVenue = data.filter(
    (venue) => venue.name === `Nature Lover's Paradise`
  );

  if (data) {
    return (
      <Box component={'main'}>
        {data && <HeroCard venue={promotedVenue[0]} />}
        <StyledDivider />
        <Container>
          <MainGrid maxWidth='lg'>
            {data &&
              data.map((venue) => <VenueCard key={venue.id} venue={venue} />)}
          </MainGrid>
        </Container>
      </Box>
    );
  }
}
