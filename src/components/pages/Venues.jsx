import { Box, Container } from '@mui/joy';
import { MainGrid } from '../../styles/GlobalStyles';
import { VenueCard } from '../cards';
import { Filters } from '../UI/UI_components';

export default function Venues({ venues }) {
  if (!venues) return <div>Loading</div>;

  return (
    <Container
      sx={{
        paddingTop: '4em',
        display: 'grid',
        gridTemplateColumns: '2fr 6fr',
        gap: 4,
      }}>
      <Box>
        <Filters venues={venues} />
      </Box>
      <MainGrid>
        {venues &&
          venues.map((venue) => <VenueCard key={venue.id} venue={venue} />)}
      </MainGrid>
    </Container>
  );
}
