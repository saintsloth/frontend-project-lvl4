/* eslint-disable no-param-reassign */
import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

import { fetchData } from './thunks.jsx';

const channelsAdapter = createEntityAdapter();
const initialState = channelsAdapter.getInitialState();

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannel: channelsAdapter.addOne,
    addChannels: channelsAdapter.addMany,
    removeChannel: channelsAdapter.removeOne,
    updateChannel: channelsAdapter.updateOne,
    setCurrentChannelId: (state, { payload }) => {
      state.currentChannelId = payload;
    },
  },
  extraReducers: {
    [fetchData.fulfilled]: (state, action) => {
      const { channels, currentChannelId } = action.payload;
      channelsAdapter.addMany(state, channels);
      // eslint-disable-next-line no-param-reassign
      if (state.currentChannelId === undefined) state.currentChannelId = currentChannelId;
    },
  },
});

export const selectors = channelsAdapter.getSelectors((state) => state.channelsStore);
export const { actions } = channelsSlice;
export default channelsSlice.reducer;
