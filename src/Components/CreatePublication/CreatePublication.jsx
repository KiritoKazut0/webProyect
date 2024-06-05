import * as React from 'react';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import Stack from '@mui/joy/Stack';
import Add from '@mui/icons-material/Add';

export default function CreatePublication({ active, close }) {
  return (
    <React.Fragment>
      <Modal open={active} onClose={close}>
        <ModalDialog sx={{ minWidth: 400, minHeight: 300}} >
          <DialogTitle>Crea una nueva publicación</DialogTitle>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              close(); 
            }}
          >
            <Stack spacing={2}>
              <FormControl>
                <FormLabel>Url de la imagen</FormLabel>
                <Input autoFocus required />
              </FormControl>
              <FormControl>
                <FormLabel>Description</FormLabel>
                <Input required />
              </FormControl>
              <Button type="submit">Publicar</Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}
    