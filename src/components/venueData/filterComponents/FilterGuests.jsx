import { MainThemeSelect, StyledOption } from '../../../styles/GlobalStyles';

export default function FilterGuests({ guests, setGuests, sortedGuests }) {
  return (
    <MainThemeSelect
      value={guests}
      id='pickGuests'
      variant='solid'
      color='primary'
      aria-label='pick Guests'
      aria-roledescription='pick Guests'
      size='sm'
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
  );
}
