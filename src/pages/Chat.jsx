import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Channels from '../components/Channels.jsx';
import { fetchData } from '../slices/thunks.jsx';
import Messages from '../components/Messages.jsx';
import InputMessage from '../components/InputMessage.jsx';
import Header from './Header.jsx';

function Chat() {
  const myStorage = window.localStorage;
  const token = myStorage.getItem('token');
  const navigate = useNavigate();

  // редирект
  useEffect(() => {
    if (!myStorage.getItem('token')) navigate('/login');
  }, []);

  const dispatch = useDispatch();
  if (token) dispatch(fetchData());

  return (
    <>
      <div className="d-flex flex-column h-100">
        <Header />
        <div className="container h-100 my-4 overflow-hidden rounded shadow">
          <div className="row h-100 bg-white flex-md-row">
            <Channels />
            <div className="col p-0 h-100">
              <div className="d-flex flex-column h-100">
                <Messages />
                <div className="mt-auto px-5 py-3">
                  <InputMessage />
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}

export default Chat;
