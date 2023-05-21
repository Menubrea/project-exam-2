import { Box, Container, Typography } from '@mui/joy';
import { HeroCard, VenueCard } from '../cards';
import { MainGrid, StyledDivider } from '../../styles/GlobalStyles';
import Loading from '../Loading';
import AppMeta from '../AppMeta';

export default function Home({ data, error, loading }) {
  if (!data || data.length === 0 || loading)
    return <Loading>Loading...</Loading>;

  if (error) return <div>Error</div>;

  const sortedByRegion = data.reduce((acc, venue) => {
    const region = venue.location.city;
    if (!acc[region]) {
      acc[region] = [];
    }
    acc[region].push(venue);
    return acc;
  }, []);

  const sortByNewest = data.sort((a, b) => {
    return new Date(b.created) - new Date(a.created);
  });

  const promotedVenue = sortByNewest.slice(0, 1);
  const newestVenues = sortByNewest.slice(1, 6);

  const sortedByRegionArray = Object.entries(sortedByRegion);
  sortedByRegionArray.sort((a, b) => a[0].localeCompare(b[0]));

  if (data) {
    return (
      <Box component={'main'}>
        <AppMeta
          title='Holidaze | Home'
          description='Find a place to rent for holiday or business trips, or rent out your own venue.'
          tags='rent, venue, online, place to rent, holidaze.com, vacation, booking'
        />
        {data && <HeroCard venue={promotedVenue[0]} />}
        <StyledDivider />
        <Container>
          <Typography
            level='h4'
            component={'h2'}
            sx={{ marginTop: { xs: 4, sm: 10 } }}>
            ...and other new Venues
          </Typography>
          <MainGrid>
            {newestVenues &&
              newestVenues.map((venue) => (
                <VenueCard key={venue.id} venue={venue} />
              ))}
          </MainGrid>
          <StyledDivider />
        </Container>
        <Container>
          {sortedByRegionArray &&
            sortedByRegionArray.map((region) => (
              <Box
                key={region[0]}
                sx={{
                  marginBottom: 4,
                }}>
                <Typography level='h4' component={'h2'}>
                  {region[0]}
                </Typography>
                <MainGrid>
                  {region[1].map((venue) => (
                    <VenueCard key={venue.id} venue={venue} />
                  ))}
                </MainGrid>
                <StyledDivider />
              </Box>
            ))}
        </Container>
      </Box>
    );
  }
}
