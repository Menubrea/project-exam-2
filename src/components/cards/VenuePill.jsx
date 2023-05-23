import { Typography } from '@mui/joy';
import { LinkWrapper } from '../../styles/GlobalStyles';

export default function VenuePill({ venue }) {
  return (
    <LinkWrapper to={`/venue/${venue.id}`}>
      <Typography
        sx={{
          paddingY: 1,
          paddingX: 2,
          backgroundColor: 'rgba(0, 0, 0, .05)',
          flex: 1,
          width: 'max-content',
          borderRadius: 100,
          marginBottom: 1,
          marginRight: 1,
          ':hover': {
            backgroundColor: 'rgba(0, 0, 0, .1)',
          },
        }}
        level='body3'>
        {venue.name}
      </Typography>
    </LinkWrapper>
  );
}
