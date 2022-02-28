// thunk
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes.js';

export const fetchData = createAsyncThunk(
  'fetchData',
  async () => {
    const token = window.localStorage.getItem('token');
    const data = await axios.get(routes.dataPath(), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return JSON.parse(data.request.response);
  },
);

export const sendMessage = createAsyncThunk(
  'sendMessage',
  async (message) => {
    const token = window.localStorage.getItem('token');
    const data = await axios.post(routes.newMessagePath(), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      message,
    });
    return JSON.parse(data.request.response);
  },
);
