import { Modal, Button } from 'react-bootstrap';
import React, { useEffect, useRef, useState } from 'react';
import * as yup from 'yup';
import _ from 'lodash';
import { useFormik } from 'formik';
import { locale } from '../../locales/index.js';
import { renameChannel } from '../socket.jsx';
import store from '../../slices/index.jsx';

const schema = yup.object().shape({
  channelName: yup.string().trim().required(),
});

const checkUnique = (channelName) => {
  const channels = store.getState().channelsStore.entities;
  const find = _.find(channels, (ch) => ch.name === channelName);
  return !find;
};

function RenameChannelModal(props) {
  const { id, show, handleClose, currentName } = props;
  const input = useRef('');
  const [channelName, setChannelName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (show) input.current.select();
  });

  const submitHandler = async (fields) => {
    const yupCheck = schema.isValidSync(fields);
    const uniqueCheck = checkUnique(fields.channelName);
    if (yupCheck && uniqueCheck) {
      renameChannel(id, fields.channelName);
      setChannelName('');
      handleClose();
    } else {
      if (!yupCheck) {
        schema.validate(channelName).catch(() => setErrorMessage(locale.t('mustBeNotEmpty')));
      }
      if (!uniqueCheck) {
        setErrorMessage(locale.t('mustBeUnique'));
      }
    }
  };

  const formik = useFormik({
    initialValues: {
      channelName: currentName,
    },
    onSubmit: submitHandler,
  });

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{locale.t('renameChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={formik.handleSubmit} className="py-1 border rounded-2">
          <div className="input-group has-validation">
            <input
              type="channelName"
              name="channelName"
              className="form-control my-2"
              aria-label={locale.t('chanelName')}
              placeholder={`${locale.t('enterChannelName')}...`}
              ref={input}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.channelName}
            />
          </div>
        </form>
        <div className="form-text">
          {errorMessage}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          {locale.t('close')}
        </Button>
        <Button variant="primary" onClick={formik.handleSubmit}>
          {locale.t('send')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default RenameChannelModal;
