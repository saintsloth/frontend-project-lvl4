import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import Login from '../pages/Login.jsx';
import Chat from '../pages/Chat.jsx';
import store from '../slices/index.jsx';
import socket from './socket.jsx';
import SocketContext from './SocketContext.jsx';
import Code404 from '../pages/Code404.jsx';
import Signup from '../pages/Signup.jsx';

function App() {
  const myStorage = window.localStorage;
  const token = myStorage.getItem('token');

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Chat />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<Code404 />} />
      </Routes>
    </BrowserRouter>
  );
}

// eslint-disable-next-line react/no-render-return-value
const render = () => ReactDOM.render(
  <SocketContext.Provider value={socket}>
    <Provider store={store}>
      <App />
    </Provider>
  </SocketContext.Provider>,
  document.getElementById('chat'),
);

export default render;
