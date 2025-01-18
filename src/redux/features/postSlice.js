import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../services/api';

export const fetchAllPosts = createAsyncThunk(
  'posts/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      return await api.fetchPosts();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addPost = createAsyncThunk(
  'posts/add',
  async (post, { rejectWithValue }) => {
    try {
      return await api.createPost(post);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const removePost = createAsyncThunk(
  'posts/delete',
  async (nombre, { rejectWithValue }) => {
    try {
      await api.deletePost(nombre);
      return nombre;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const postSlice = createSlice({
  name: 'posts',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchAllPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.items.push(action.payload.post);
      })
      .addCase(removePost.fulfilled, (state, action) => {
        state.items = state.items.filter(post => post.nombre !== action.payload);
      });
  },
});
export default postSlice.reducer;