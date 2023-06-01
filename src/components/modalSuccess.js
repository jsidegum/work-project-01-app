import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ModalSuccess = ({ mensagem, handleClose }) => {
    return (
        <Modal show={true} onHide={handleClose} className="alert-modal">
            <Modal.Header closeButton>
                <Modal.Title>Sucesso</Modal.Title>
            </Modal.Header>
            <Modal.Body>{mensagem}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Fechar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalSuccess;