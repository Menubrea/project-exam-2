import { Modal, ModalClose, ModalDialog } from '@mui/joy';
import { CreateVenue } from '../forms';

export default function VenueFormModal({ handleClose, open }) {
  return (
    <Modal open={open} onClose={handleClose}>
      <ModalDialog size='lg' sx={{ border: '1px solid white' }}>
        <ModalClose
          variant='solid'
          color='primary'
          onClick={handleClose}
          sx={{
            top: -15,
            right: -15,
            borderRadius: '100%',
            border: '1px solid #fff',
          }}
        />
        <CreateVenue />
      </ModalDialog>
    </Modal>
  );
}
