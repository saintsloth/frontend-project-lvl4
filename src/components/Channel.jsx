import React from 'react';
import cn from 'classnames';
import store from '../slices/index.jsx';
import { actions as channelsActions } from '../slices/channelsSlice.jsx';
import ChannelDropdownMenu from './ChannelDropdownMenu.jsx';

function Channel(props) {
  const {
    id, name, selected, removable,
  } = props;
  const btnSecondary = selected ? 'btn-secondary' : '';
  const classBoxChannelName = cn('w-100 rounded-0 text-start btn', btnSecondary);
  const classBoxMenuButton = cn('flex-grow-0 dropdown-toggle dropdown-toggle-split btn', btnSecondary);
  // eslint-disable-next-line max-len
  const changeChannelId = (nextChanelId) => () => store.dispatch(channelsActions.setCurrentChannelId(nextChanelId));

  return (
    <li className="nav-item w-100">
      <div role="group" className="d-flex dropdown btn-group">
        <button onClick={changeChannelId(id)} type="button" className={classBoxChannelName}>
          <span className="me-1">#</span>
          {name}
        </button>
        {removable && selected ? (
          <ChannelDropdownMenu
            id={id}
            classBox={classBoxMenuButton}
            currentName={name}
          />
        ) : null}
      </div>
    </li>
  );
}

export default Channel;
