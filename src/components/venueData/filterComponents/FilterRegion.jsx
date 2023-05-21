import { MainThemeSelect, StyledOption } from '../../../styles/GlobalStyles';

export default function FilterRegion({ region, setRegion, regionArray }) {
  return (
    <MainThemeSelect
      value={region}
      id='setRegion'
      size='sm'
      aria-label='set Region'
      aria-roledescription='set Region'
      placeholder='Choose Region'>
      <StyledOption
        value={'All Regions'}
        onClick={() => setRegion('All Regions')}>
        All Regions
      </StyledOption>
      {regionArray.map((region) => (
        <StyledOption
          id={`region-${region}`}
          key={region}
          value={region}
          onClick={() => setRegion(region)}>
          {region}
        </StyledOption>
      ))}
    </MainThemeSelect>
  );
}
