import React from 'react';
import { useSelector } from 'react-redux';
import { selectors as channelsSelectors } from '../slices/channelsSlice.jsx';
import { selectors as messagesSelectors } from '../slices/messagesSlice.jsx';
import { locale } from '../locales/index.js';
import Message from './Message.jsx';

function Messages() {
  const currentChannelId = useSelector((state) => state.channelsStore.currentChannelId);
  const channels = useSelector(channelsSelectors.selectAll);
  const currentChannel = channels.find(({ id }) => id === currentChannelId);
  const currentChannelName = currentChannel ? currentChannel.name : '';
  const messages = useSelector(messagesSelectors.selectAll)
    .filter(({ channelId }) => channelId === currentChannelId);
  const messagesCount = messages.length;

  return (
    <>
      <div className="bg-light mb-4 p-3 shadow-sm small">
        <p className="m-0">
          <b>
            {`# ${currentChannelName}`}
          </b>
        </p>
        <span className="text-muted">
          {locale.t('message', { count: messagesCount })}
        </span>
      </div>

      <div id="messages-box" className="chat-messages overflow-auto px-5 ">
        {messages.map(({ id, username, message }) => (
          <Message
            key={id}
            id={id}
            username={username}
            message={message}
          />
        ))}
      </div>
    </>
  );
}

export default Messages;
