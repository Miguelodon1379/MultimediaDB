import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { FiFilter } from 'react-icons/fi'

function ModalButton() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="dark" onClick={handleShow} style={{ margin: 10}} >
        <FiFilter style={{ cursor: 'pointer' }} />
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Titulo de la Modal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Contenido de la Modal...
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          {/* Aquí puedes agregar más botones si es necesario */}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalButton;
