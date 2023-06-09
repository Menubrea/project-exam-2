import { Typography, Box } from '@mui/joy';
import { MainThemeSelect, StyledOption } from '../../../styles/GlobalStyles';

/**
 * Component for filtering the region.
 * @param {String} region - The region state.
 * @param {Function} setRegion - The setRegion state.
 * @param {Array} regionArray - The regionArray state.
 * @returns {JSX.Element}
 */
export default function FilterRegion({ region, setRegion, regionArray }) {
  return (
    <Box>
      <Typography component={'label'} level='body3' htmlFor='setRegion'>
        Decide region
      </Typography>
      <MainThemeSelect
        value={region}
        id='setRegion'
        size='md'
        aria-label='Choose Region'
        aria-roledescription='Choose Region'
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
    </Box>
  );
}
