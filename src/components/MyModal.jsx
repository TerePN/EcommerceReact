import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const MyModal = () => {

    const [show, setShow] = useState(true);

    const handleClose = () => setShow(false);

    return (
        <Modal show={show} onHide={handleClose} animation={false}  >
            <Modal.Header closeButton>
                <Modal.Title>successful process</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{
                display: "flex",
                height: "90px",
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden"}} >
                <img src="https://i.gifer.com/7efs.gif" alt="" width={"60%"}/>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="dark" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default MyModal;