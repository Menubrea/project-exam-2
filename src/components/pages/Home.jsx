import { Box, Container, Typography } from '@mui/joy';
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

  const newestVenues = sortByNewest.slice(0, 5);

  const sortedByRegionArray = Object.entries(sortedByRegion);
  sortedByRegionArray.sort((a, b) => a[0].localeCompare(b[0]));

  if (data) {
    return (
      <Box component={'main'}>
        {data && <HeroCard venue={promotedVenue[0]} />}
        <StyledDivider />
        <Container>
          <Typography level='h5' component={'h2'}>
            Latest entries
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
                <Typography level='h5' component={'h2'}>
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
