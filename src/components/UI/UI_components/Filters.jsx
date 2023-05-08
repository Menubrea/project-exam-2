import { Slider, Box, Typography } from '@mui/joy';
import { useState, useEffect } from 'react';

export default function Filters({ venues }) {
  const [value, setValue] = useState([0, 0]);
  const [lowestPrice, setLowestPrice] = useState(0);
  const [highestPrice, setHighestPrice] = useState(1);

  !venues ? <div>Loading</div> : null;

  useEffect(() => {
    if (venues) {
      const sortedVenues = venues.sort((a, b) => a.price - b.price);
      if (sortedVenues) {
        const lowestPrice = sortedVenues[0].price;
        const highestPrice = sortedVenues[sortedVenues.length - 1].price;
        setLowestPrice(lowestPrice);
        setHighestPrice(highestPrice);
        setValue([lowestPrice, highestPrice]);
      }
    }
  }, [venues]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function valueText(value) {
    return `${value},-`;
  }

  return (
    <Box>
      <Typography>Price range:</Typography>
      <Slider
        getAriaLabel={() => 'Price Range'}
        value={value}
        onChange={handleChange}
        getAriaValueText={valueText}
        valueLabelDisplay='on'
        step={100}
        marks={[
          { value: lowestPrice, label: `${lowestPrice},-` },
          { value: highestPrice, label: `${highestPrice},-` },
        ]}
        min={lowestPrice}
        max={highestPrice}
      />
    </Box>
  );
}
