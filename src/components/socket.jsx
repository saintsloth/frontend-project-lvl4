import { io } from 'socket.io-client';
import _ from 'lodash';
import { actions as messagesActions } from '../slices/messagesSlice.jsx';
import { actions as channelsActions } from '../slices/channelsSlice.jsx';
import store from '../slices/index.jsx';

const socket = io();

// подписка на события сервера
socket.on('connect', () => console.log('socket: connected'));
socket.on('disconnect', () => console.log('socket: disconnected'));
socket.on('newMessage', (message) => {
  store.dispatch(messagesActions.addMessage(message));
});
socket.on('newChannel', (channel) => {
  store.dispatch(channelsActions.addChannel(channel));
});
socket.on('removeChannel', ({ id }) => {
  store.dispatch(channelsActions.removeChannel(id));
  if (store.getState().channelsStore.currentChannelId === id) {
    store.dispatch(channelsActions.setCurrentChannelId(1));
  }
});
socket.on('renameChannel', ({ id, name }) => {
  store.dispatch(channelsActions.updateChannel({ id, changes: { name } }));
});

export const sendMessage = (message, username, channelId) => socket.emit('newMessage', { message, username, channelId }, (response) => {
  if (response.status !== 'ok') {
    console.log('Send message fail. New try.');
    setTimeout(sendMessage(message, username, channelId), 1000);
  }
});

export const createChannel = (name) => socket.emit('newChannel', { name }, (response) => {
  if (response.status !== 'ok') {
    console.log('Create channel fail. New try.');
    setTimeout(createChannel(name), 1000);
  } else {
    store.dispatch(channelsActions.setCurrentChannelId(response.data.id));
  }
});

export const renameChannel = (id, name) => socket.emit('renameChannel', { id, name }, (response) => {
  if (response.status !== 'ok') {
    console.log('Rename channel fail. New try.');
    setTimeout(renameChannel(id, name), 1000);
  }
});

export const removeChannel = (id) => socket.emit('removeChannel', { id }, (response) => {
  if (response.status !== 'ok') {
    console.log('Delete channel fail. New try.');
    setTimeout(removeChannel(id), 1000);
  }
});

export default socket;
