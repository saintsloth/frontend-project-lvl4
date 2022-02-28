/* eslint-disable no-param-reassign */
import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { actions as channelsActions } from './channelsSlice.jsx';
import { fetchData } from './thunks.jsx';

const messagesAdapter = createEntityAdapter();
const initialState = messagesAdapter.getInitialState();

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: messagesAdapter.addOne,
    addMessages: messagesAdapter.addMany,
    removeMessage: messagesAdapter.removeOne,
    updateMessage: messagesAdapter.updateOne,
  },
  extraReducers: {
    [fetchData.fulfilled]: (state, action) => {
      const { messages } = action.payload;
      messagesAdapter.addMany(state, messages);
    },
    [channelsActions.removeChannel]: (state, action) => {
      const channelId = action.payload;
      const restEntities = Object.values(state.entities).filter((en) => en.channelId !== channelId);
      messagesAdapter.setAll(state, restEntities);
    },
  },
});

export const selectors = messagesAdapter.getSelectors((state) => state.messagesStore);
export const { actions } = messagesSlice;
export default messagesSlice.reducer;
