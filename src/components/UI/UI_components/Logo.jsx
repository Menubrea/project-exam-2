import { Box, Typography } from '@mui/joy';
import { LinkWrapper } from '../../../styles/GlobalStyles';

export default function Logo() {
  return (
    <LinkWrapper to='/'>
      <Typography
        level='h4'
        component={'div'}
        sx={{
          fontFamily: 'futura-PT-condensed',
          textTransform: 'uppercase',
          fontWeight: 900,
        }}>
        Holidaze
      </Typography>
    </LinkWrapper>
  );
}
