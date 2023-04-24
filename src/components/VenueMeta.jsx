import PetsIcon from '@mui/icons-material/Pets';
import WifiIcon from '@mui/icons-material/Wifi';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import FreeBreakfastIcon from '@mui/icons-material/FreeBreakfast';
import GroupsIcon from '@mui/icons-material/Groups';
import { Box, styled } from '@mui/joy';

const VenueMetaStyle = styled(Box)(({ theme, ...props }) => ({
  position: props.position || 'absolute',
  top: 10,
  left: 10,
  backgroundColor:
    theme.palette.mode === 'dark'
      ? theme.palette.primary[500]
      : theme.palette.neutral[50],
  border:
    theme.palette.mode === 'dark'
      ? `1px solid ${theme.palette.common.white}`
      : `1px solid ${theme.palette.primary[700]}`,
  borderRadius: 100,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-evenly',
  alignItems: 'center',
  width: 'fit-content',
  height: 'fit-content',
}));

const StyledIconBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(0.5),
  svg: {
    fontSize: 16,
  },
  ':first-of-type': {
    paddingTop: theme.spacing(1.5),
    borderBottom:
      theme.palette.mode === 'dark'
        ? `1px solid ${theme.palette.common.white}`
        : `1px solid ${theme.palette.primary[700]}`,
  },
  ':nth-of-type(2)': {
    paddingTop: theme.spacing(1.5),
  },
  ':last-of-type': {
    paddingBottom: theme.spacing(1.5),
  },
}));

export default function VenueMeta({ meta, maxGuests, ...props }) {
  return (
    <VenueMetaStyle position={props.position}>
      <StyledIconBox sx={{}}>
        <GroupsIcon />
        {maxGuests}
      </StyledIconBox>
      <StyledIconBox>
        {meta.pets === true ? (
          <PetsIcon />
        ) : (
          <PetsIcon sx={{ opacity: '20%' }} />
        )}
      </StyledIconBox>
      <StyledIconBox>
        {meta.wifi === true ? (
          <WifiIcon />
        ) : (
          <WifiIcon sx={{ opacity: '20%' }} />
        )}
      </StyledIconBox>
      <StyledIconBox>
        {meta.parking ? (
          <LocalParkingIcon />
        ) : (
          <LocalParkingIcon sx={{ opacity: '20%' }} />
        )}
      </StyledIconBox>
      <StyledIconBox>
        {meta.breakfast ? (
          <FreeBreakfastIcon />
        ) : (
          <FreeBreakfastIcon sx={{ opacity: '20%' }} />
        )}
      </StyledIconBox>
    </VenueMetaStyle>
  );
}
