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
import useField from "../../hooks/useField"
import { addPublications } from '../../Services/addPublication';
export default function CreatePublication({ active, close }) {

  const imageUrl = useField({ type: "sendText" });
  const description = useField({ type: "sendText" })

  


  const fetchSendNewPublication = async (data) => {
    try {
        const send = await addPublications(data);
        alert("se agrego correctamente");
        close(); 
    } catch (error) {
      console.log( error);
    }
 }
  return (
    <React.Fragment>
      <Modal open={active} onClose={close}>
        <ModalDialog sx={{ minWidth: 400, minHeight: 300 }} >
          <DialogTitle>Crea una nueva publicación</DialogTitle>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              const data = {
                content: description.value,
                image: imageUrl.value,
                userId: localStorage.getItem('userId')
              }

              fetchSendNewPublication(data);

          close(); 
            }}
          >
          <Stack spacing={2}>
            <FormControl>
              <FormLabel>Url de la imagen</FormLabel>
              <Input autoFocus onBlur={imageUrl.onblur} onChange={imageUrl.onchange} required />
            </FormControl>
            <FormControl>
              <FormLabel>Description</FormLabel>
              <Input autoFocus onBlur={description.onblur} onChange={description.onchange} required />
            </FormControl>
            <Button type="submit">Publicar</Button>
          </Stack>
        </form>
      </ModalDialog>
    </Modal>
    </React.Fragment >
  );
}
