import { Breadcrumbs, Typography } from '@mui/joy';
import { LinkWrapper } from '../../styles/GlobalStyles';
import { useLocation } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';

/**
 * Component for displaying the breadcrumbs navigation.
 * @param {Object} venue - The venue object.
 * @param {Object} profile - The profile object.
 * @returns {JSX.Element}
 */
export default function BreadCrumbsNav({ venue, profile }) {
  const location = useLocation();

  return (
    <Breadcrumbs
      sx={{ width: 'fit-content', margin: '0 auto' }}
      separator='|'
      aria-label='breadcrumb'>
      <LinkWrapper to='/'>
        <Typography startDecorator={<HomeIcon />}>Home</Typography>
      </LinkWrapper>

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
