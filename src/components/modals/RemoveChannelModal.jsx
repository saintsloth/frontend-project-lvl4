import { Modal, Button } from 'react-bootstrap';
import React from 'react';
import { locale } from '../../locales/index.js';
import { removeChannel } from '../socket.jsx';

function RemoveChannelModal(props) {
  const { id, show, handleClose } = props;

  const submitHandler = (e) => {
    e.preventDefault();
    removeChannel(id);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{locale.t('removeChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {locale.t('sure')}
        ?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          {locale.t('close')}
        </Button>
        <Button variant="danger" onClick={submitHandler}>
          {locale.t('delete')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default RemoveChannelModal;
