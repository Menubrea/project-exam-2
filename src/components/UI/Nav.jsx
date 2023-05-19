import { Typography, Box } from '@mui/joy';
import { LinkWrapper } from '../../styles/GlobalStyles';

export function Navigation() {
  return (
    <Box component={'nav'}>
      <Box
        component={'ul'}
        sx={{
          listStyle: 'none',
          margin: 0,
          padding: 0,
          display: 'flex',
          gap: 1,
        }}>
        <Box component={'li'}>
          <LinkWrapper to='/'>
            <Typography level='body1'>Home</Typography>
          </LinkWrapper>
        </Box>
        <Box component={'li'}>
          <LinkWrapper to='venues'>
            <Typography level='body1'>Browse</Typography>
          </LinkWrapper>
        </Box>
      </Box>
    </Box>
  );
}
