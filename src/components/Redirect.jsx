import { Box, Typography } from '@mui/joy';
import { MainThemeButton, LinkWrapper } from '../styles/GlobalStyles';

/**
 * Component for redirecting to a new page
 * @param {string} link - link to redirect to
 * @param {string} text - text to display on button
 * @returns {JSX.Element}
 */
export default function Redirect({ link, text }) {
  return (
    <Box sx={{ width: 'fit-content', margin: '0 auto' }}>
      <Typography level='h4' component={'h2'}>
        You've reached the bottom
      </Typography>
      <Box sx={{ width: 'fit-content', margin: '1em auto' }}>
        <LinkWrapper to={link}>
          <MainThemeButton to='/browse'>{text}</MainThemeButton>
        </LinkWrapper>
      </Box>
    </Box>
  );
}
