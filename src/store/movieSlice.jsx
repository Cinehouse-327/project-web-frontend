import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const fetchMovies = createAsyncThunk('movies/fetchMovies', async () => {
  try {
    const response = await axios.get('http://localhost:3000/movielist/show'); 
    return response.data.data; 
  } catch (error) {
    throw new Error(error.message);
  }
});

const initialState = {
  movies: [],
  filteredMovies: [],
  loading: false,
  error: null,
};

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    filterMovies: (state, action) => {
      state.filteredMovies = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload;
        state.filteredMovies = action.payload; 
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { filterMovies } = movieSlice.actions;
export default movieSlice.reducer;
