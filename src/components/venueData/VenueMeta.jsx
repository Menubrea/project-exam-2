import PetsIcon from '@mui/icons-material/Pets';
import WifiIcon from '@mui/icons-material/Wifi';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import FreeBreakfastIcon from '@mui/icons-material/FreeBreakfast';
import GroupsIcon from '@mui/icons-material/Groups';
import { Box, Tooltip, styled } from '@mui/joy';

const VenueMetaStyle = styled(Box)(({ theme, ...props }) => ({
  position: props.position || 'absolute',
  top: 10,
  left: 10,
  backgroundColor: theme.palette.primary[500],
  color: theme.palette.common.white,
  border: props.border || `1px solid ${theme.palette.common.white}`,
  borderRadius: props.borderRadius || 2,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-evenly',
  alignItems: 'center',
  width: 'fit-content',
  height: props.height || 'fit-content',
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
    borderBottom: `1px solid ${theme.palette.common.white}`,
  },
  ':nth-of-type(2)': {
    paddingTop: theme.spacing(1.5),
  },
  ':last-of-type': {
    paddingBottom: theme.spacing(1.5),
  },

  '&:hover': {
    cursor: 'pointer',
    svg: {
      transform: 'scale(1.2)',
    },
  },
}));

export default function VenueMeta({ meta, maxGuests, ...props }) {
  return (
    <VenueMetaStyle
      position={props.position}
      borderRadius={props.borderRadius}
      height={props.height}
      border={props.border}>
      <Tooltip
        color='primary'
        arrow
        placement='right'
        title={`${maxGuests} guests allowed`}>
        <StyledIconBox>
          <GroupsIcon />

          {maxGuests}
        </StyledIconBox>
      </Tooltip>
      <StyledIconBox>
        {meta.pets === true ? (
          <Tooltip color='primary' arrow placement='right' title='Pets Allowed'>
            <PetsIcon />
          </Tooltip>
        ) : (
          <Tooltip
            color='primary'
            arrow
            placement='right'
            title='No Pets Allowed'>
            <PetsIcon sx={{ opacity: '20%' }} />
          </Tooltip>
        )}
      </StyledIconBox>
      <StyledIconBox>
        {meta.wifi === true ? (
          <Tooltip
            color='primary'
            arrow
            placement='right'
            title='Wifi Available'>
            <WifiIcon />
          </Tooltip>
        ) : (
          <Tooltip
            color='primary'
            arrow
            placement='right'
            title='No Wifi Available'>
            <WifiIcon sx={{ opacity: '20%' }} />
          </Tooltip>
        )}
      </StyledIconBox>
      <StyledIconBox>
        {meta.parking ? (
          <Tooltip
            title='Parking available'
            color='primary'
            arrow
            placement='right'>
            <LocalParkingIcon />
          </Tooltip>
        ) : (
          <Tooltip
            title='Parking not available'
            color='primary'
            arrow
            placement='right'>
            <LocalParkingIcon sx={{ opacity: '20%' }} />
          </Tooltip>
        )}
      </StyledIconBox>
      <StyledIconBox>
        {meta.breakfast ? (
          <Tooltip
            title='Breakfast included'
            color='primary'
            arrow
            placement='right'>
            <FreeBreakfastIcon />
          </Tooltip>
        ) : (
          <Tooltip
            title='Breakfast not included'
            color='primary'
            arrow
            placement='right'>
            <FreeBreakfastIcon sx={{ opacity: '20%' }} />
          </Tooltip>
        )}
      </StyledIconBox>
    </VenueMetaStyle>
  );
}
