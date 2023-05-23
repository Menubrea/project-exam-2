import { Box, Slider, Typography } from '@mui/joy';

export default function FilterSlider({
  value,
  handleChange,
  lowestPrice,
  highestPrice,
  valueText,
}) {
  return (
    <Box
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === 'dark'
            ? theme.palette.primary[500]
            : theme.palette.neutral[50],
        paddingX: 4,
        paddingY: 2,
        borderBlock: (theme) =>
          theme.palette.mode === 'dark'
            ? `1px solid ${theme.palette.common.white}`
            : `1px solid ${theme.palette.primary[900]}`,
      }}>
      <Typography
        level='body3'
        htmlFor='priceRange'
        textAlign={'center'}
        component={'label'}>
        Price range:
      </Typography>
      <Slider
        id='priceRange'
        aria-label='price range'
        value={value}
        onChange={handleChange}
        getAriaValueText={valueText}
        min={lowestPrice}
        max={highestPrice}
        valueLabelDisplay='on'
        step={100}
        marks={[
          { value: lowestPrice, label: `${lowestPrice},-` },
          { value: highestPrice, label: `${highestPrice},-` },
        ]}
        aria-roledescription='price range'
      />
    </Box>
  );
}
