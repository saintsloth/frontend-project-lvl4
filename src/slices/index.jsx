import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from './channelsSlice.jsx';
import messagesReducer from './messagesSlice.jsx';

const store = configureStore({
  reducer: {
    channelsStore: channelsReducer,
    messagesStore: messagesReducer,
  },
});

export default store;
