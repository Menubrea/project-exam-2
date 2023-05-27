import PetsIcon from '@mui/icons-material/Pets';
import WifiIcon from '@mui/icons-material/Wifi';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import FreeBreakfastIcon from '@mui/icons-material/FreeBreakfast';
import GroupsIcon from '@mui/icons-material/Groups';
import { Box, styled, Tooltip, Typography } from '@mui/joy';

const AltMetaStyle = styled(Box)(({ theme, ...props }) => ({
  display: 'flex',
  gap: 2,
  justifyContent: 'space-evenly',
  alignItems: 'center',
  width: 'fit-content',
  height: props.height || 'fit-content',
}));

const StyledIconBox = styled(Box)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? theme.palette.primary[600]
      : theme.palette.neutral[300],
  borderRadius: '2px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(0.5, 1),
  svg: {
    fontSize: 16,
  },
  p: {
    fontSize: 14,
  },
}));

/**
 * Component for displaying the alternative meta data.
 * @param {Object} venue - venue object
 * @returns {JSX.Element} AltMeta component
 */
export default function AltMeta({ venue }) {
  const { meta, maxGuests } = venue;

  return (
    <AltMetaStyle>
      <StyledIconBox>
        <Typography startDecorator={<GroupsIcon />} level='body3'>
          {maxGuests}
        </Typography>
      </StyledIconBox>
      <StyledIconBox>
        {meta.pets ? <PetsIcon /> : <PetsIcon sx={{ opacity: 0.2 }} />}
      </StyledIconBox>
      <StyledIconBox>
        {meta.wifi ? <WifiIcon /> : <WifiIcon sx={{ opacity: 0.2 }} />}
      </StyledIconBox>
      <StyledIconBox>
        {meta.parking ? (
          <LocalParkingIcon />
        ) : (
          <LocalParkingIcon sx={{ opacity: 0.2 }} />
        )}
      </StyledIconBox>
      <StyledIconBox>
        {meta.breakfast ? (
          <FreeBreakfastIcon />
        ) : (
          <FreeBreakfastIcon sx={{ opacity: 0.2 }} />
        )}
      </StyledIconBox>
    </AltMetaStyle>
  );
}
