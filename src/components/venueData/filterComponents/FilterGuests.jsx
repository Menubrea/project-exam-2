import { Typography, Box } from '@mui/joy';
import { MainThemeSelect, StyledOption } from '../../../styles/GlobalStyles';

export default function FilterGuests({ guests, setGuests, sortedGuests }) {
  return (
    <Box>
      <Typography component={'label'} level='body3' htmlFor='pickGuests'>
        Guests
      </Typography>
      <MainThemeSelect
        value={guests}
        id='pickGuests'
        variant='solid'
        color='primary'
        aria-label='pick Guests'
        aria-roledescription='pick Guests'
        size='md'
        placeholder='Guests'>
        <StyledOption value={'Any'} onClick={() => setGuests(1)}>
          Any
        </StyledOption>
        {sortedGuests.map((guest) => (
          <StyledOption
            key={guest}
            value={guest}
            onClick={() => setGuests(guest)}>
            {guest}
          </StyledOption>
        ))}
      </MainThemeSelect>
    </Box>
  );
}
