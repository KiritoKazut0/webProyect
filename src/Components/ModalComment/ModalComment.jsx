import * as React from 'react';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Comments from '../Comments/Comments';
import Sheet from '@mui/joy/Sheet';
import { List } from '@mui/joy';

export default function ModalComments({ imgPublication, open, onClose, comments }) {
    const [scroll, setScroll] = React.useState(true);
    
    return (
        <React.Fragment>
            <Modal
                aria-labelledby="modal-title"
                aria-describedby="modal-desc"
                open={open}
                onClose={onClose}
                sx={{
                     display: "flex",
                    justifyContent: "center",
                    alignContent: "center",
                    alignItems: 'center'
                }}
            >
                <Sheet
                    variant="outlined"
                    sx={{
                        background: "black",
                        border: "solid black",
                        borderRadius: 'md',
                        p: 3,
                        boxShadow: 'lg',
                        paddingRight: "200px"
                    }}
                >
                    <ModalClose variant="plain" sx={{ m: 1, '&:hover': {
                        backgroundColor: 'initial', color: "white"} }} />
                    {scroll && (
                        <List sx={{
                            height: "85vh",
                            display: "flex",
                            flexDirection: "row-reverse",
                        }}>
                            <div className='Comments-modals'>
                                <Comments comments={comments} />
                            </div>
                            <img src={imgPublication}
                                width={"45%"} alt="" 
                                style={{ border: "solid black", objectFit: "cover"}} />
                        </List>
                    )}
                </Sheet>
            </Modal>
        </React.Fragment>
    );
}
