import { Box, Container } from '@mui/joy';
import { HeroCard, VenueCard } from '../cards';
import { MainGrid, StyledDivider } from '../../styles/GlobalStyles';

export default function Home({ data, error, loading }) {
  if (!data || data.length === 0) return <div>Loading...</div>;

  if (error) return <div>Error</div>;

  const promotedVenue = data.filter(
    (venue) => venue.name === 'Remote Forest Cabin'
  );

  console.log(promotedVenue);

  if (data) {
    return (
      <Box component={'main'}>
        {data && <HeroCard venue={promotedVenue[0]} />}
        <StyledDivider />
        <Container>
          <MainGrid maxWidth='lg' sx={{ marginTop: 2 }}>
            {data &&
              data.map((venue) => <VenueCard key={venue.id} venue={venue} />)}
          </MainGrid>
        </Container>
      </Box>
    );
  }
}
