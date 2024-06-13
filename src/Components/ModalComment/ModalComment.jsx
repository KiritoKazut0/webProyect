import * as React from 'react';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Comments from '../Comments/Comments';
import Sheet from '@mui/joy/Sheet';
import { List } from '@mui/joy';
import { WebSocketContext } from '../../contexts/SocketContext';
import { useContext, useEffect, useMemo } from 'react';

export default function ModalComments({ imgPublication, open, onClose, publicationId }) {

    const [scroll, setScroll] = React.useState(true);
    const { getComments, comments } = useContext(WebSocketContext);
 

    useEffect(() => {
        getComments(publicationId);
        
    }, [getComments, publicationId]);

  
    const publicationComments = useMemo(() => {
        return comments[publicationId] || [];
    },[comments, publicationId])    


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
                    <ModalClose variant="plain" sx={{
                        m: 1, '&:hover': {
                            backgroundColor: 'initial', color: "white"
                        }
                    }} />
                    {scroll && (
                        <List sx={{
                            height: "85vh",
                            display: "flex",
                            flexDirection: "row-reverse",
                        }}>
                            <div className='Comments-modals'>
                                <Comments comments={publicationComments} publicationId={publicationId} />
                            </div>
                            <img src={imgPublication}
                                width={"45%"} alt=""
                                style={{ border: "solid black", objectFit: "cover" }} />
                        </List>
                    )}
                </Sheet>
            </Modal>
        </React.Fragment>
    );
}
