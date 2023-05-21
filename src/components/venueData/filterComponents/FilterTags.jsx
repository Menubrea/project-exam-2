import { Box, styled, Typography } from '@mui/joy';

const StyledText = styled(Typography)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? theme.palette.primary[600]
      : theme.palette.neutral[200],
  border:
    theme.palette.mode === 'dark'
      ? `.1px solid ${theme.palette.primary[100]}`
      : `.1px solid ${theme.palette.neutral[900]}`,
  padding: '.5em',
  borderRadius: '5px',
  flexGrow: 1,
}));

const FilterTags = ({ search, region, guests, filtered, value }) => {
  return (
    <Box
      sx={{
        width: 'fit-content',
        margin: '1em 0 1em auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 2,
      }}>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 1,
          width: 'fit-content',
        }}>
        <StyledText level='body3'>
          Price: {value[0]} kr - {value[1]} kr
        </StyledText>
        <StyledText level='body3'>Region: {region}</StyledText>
        <StyledText level='body3'>Min guest(s): {guests}</StyledText>
        {search && <StyledText level='body3'>Searching: {search}</StyledText>}
        <StyledText level='body3'>{filtered.length} results found.</StyledText>
      </Box>
    </Box>
  );
};

export default FilterTags;
