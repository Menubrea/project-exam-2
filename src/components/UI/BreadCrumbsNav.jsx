import { Breadcrumbs, Typography } from '@mui/joy';
import { LinkWrapper } from '../../styles/GlobalStyles';
import { useLocation } from 'react-router-dom';

export default function BreadCrumbsNav({ venue, profile }) {
  const location = useLocation();

  return (
    <Breadcrumbs
      sx={{ width: 'fit-content', margin: '0 auto' }}
      separator='-'
      aria-label='breadcrumb'>
      <LinkWrapper to='/'>Home</LinkWrapper>

      {location.pathname.includes('venue') && (
        <LinkWrapper to={`/venue/${venue.id}`}>
          <Typography fontWeight={700}>{venue.name}</Typography>
        </LinkWrapper>
      )}

      {location.pathname.includes('browse') && (
        <LinkWrapper to='/browse'>
          <Typography fontWeight={700}>Browse all venues</Typography>
        </LinkWrapper>
      )}

      {location.pathname.includes('profile') && (
        <LinkWrapper to='/profile'>
          <Typography fontWeight={700}>{profile.name}</Typography>
        </LinkWrapper>
      )}
    </Breadcrumbs>
  );
}
