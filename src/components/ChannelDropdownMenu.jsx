import React, { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { locale } from '../locales/index.js';
import RenameChannelModal from './modals/RenameChannelModal.jsx';
import RemoveChannelModal from './modals/RemoveChannelModal.jsx';

function ChannelDropdownMenu(props) {
  const { id, classBox, currentName } = props;

  // rename modal
  const [showModalRename, setShowModalRenameModalRename] = useState(false);
  const handleCloseModalRename = () => setShowModalRenameModalRename(false);
  const handleShowModalRename = () => setShowModalRenameModalRename(true);

  // remove modal
  const [showModalRemove, setShowModalRemoveModalRemove] = useState(false);
  const handleCloseModalRemove = () => setShowModalRemoveModalRemove(false);
  const handleShowModalRemove = () => setShowModalRemoveModalRemove(true);

  return (
    <>
      <Dropdown>
        <Dropdown.Toggle className={classBox} id="dropdown-basic" />
        <Dropdown.Menu>
          <Dropdown.Item onClick={handleShowModalRename}>{locale.t('rename')}</Dropdown.Item>
          <Dropdown.Item onClick={handleShowModalRemove}>{locale.t('delete')}</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <RenameChannelModal show={showModalRename} handleClose={handleCloseModalRename} id={id} currentName={currentName} />
      <RemoveChannelModal show={showModalRemove} handleClose={handleCloseModalRemove} id={id} />
    </>
  );
}

export default ChannelDropdownMenu;
