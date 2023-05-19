import { Typography, Modal, Box, Button } from '@mui/joy';

export default function ModalAction({ handleClose, open, onClick, ...props }) {
  return (
    <Modal open={open}>
      <Typography level='body1' message={props.message}>
        {props.message}
      </Typography>
      <Box>
        <Button onClick={handleClose}>No</Button>
        <Button onClick={onClick}>Yes</Button>
      </Box>
    </Modal>
  );
}
