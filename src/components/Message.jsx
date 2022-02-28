import React from 'react';

function Message(props) {
  const { username, message } = props;

  return (
    <div className="text-break mb-2">
      <b>{username}</b>
      {`: ${message}`}
    </div>
  );
}

export default Message;
