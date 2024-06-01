import * as React from 'react';
import List from '@mui/joy/List';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import ModalDialog from '@mui/joy/ModalDialog';
import ModalOverflow from '@mui/joy/ModalOverflow';
import '../ModalComment/ModalComment.css'
import Comments from '../Comments/Comments';

export default function ModalDialogOverflow({activeModal}) {
  const [layout, setLayout] = React.useState('center');
  const [scroll, setScroll] = React.useState(true);

  return (
    <React.Fragment>
      
      <Modal
        open={!!layout}
       sx={{ opacity: "100%"}}
        onClose={() => {
          setLayout(undefined);
        }}
        
      >
        <ModalOverflow sx={{ background: "black", border: "none" }}>
          <ModalDialog aria-labelledby="modal-dialog-overflow" layout={layout} sx={{
            background: "#000",
            border: "none"
          }}>
            <ModalClose />

            {scroll && (
              <List sx={{
                height: "85vh",
                minWidth: 1000,
                display: "flex",
                flexDirection: "row-reverse",
                background: "black",
               
              }}>
                <div className='Comments-modals'>
                    <Comments></Comments>
                </div>
                <img src="https://i.pinimg.com/originals/f1/78/03/f1780333f2bea131ebd60c4862a7e781.jpg"
                  width={"45%"} alt="" />
              </List>
            )}
          </ModalDialog>
        </ModalOverflow>
      </Modal>
    </React.Fragment>
  );
}
