import { createSlice } from "@reduxjs/toolkit";
import addedMovieData from "../../utils/addedMovieData";

const initialState = {
  profile: {},
  playlistsMovies: [],
  watchLaterMovies: [],
  likedMovies: [],
  historyMovies: [],
  updatedMovies: [],
  watchMovie: null,
  selectedMovie: {},
  deleteMoviesList: {},
  editedCommentId: "",
};

const userSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setStoredData: (state, { payload }) => {
      return {
        profile: {},
        playlistsMovies: [],
        watchLaterMovies: [],
        likedMovies: [],
        historyMovies: [],
        updatedMovies: [],
        watchMovie: {},
        ...payload,
      };
    },

    setSelectedMovie: (state, { payload }) => {
      const updatedMovie = state.updatedMovies?.find(
        (movie) => movie?.id === payload?.id
      );

      if (updatedMovie) {
        state.selectedMovie = updatedMovie;
      } else {
        state.selectedMovie = {
          ...payload,
          ...addedMovieData(state.playlistsMovies, payload),
        };
      }
    },

    updateSelectedMovie: (state, { payload }) => {
      state.selectedMovie = payload;
    },

    setDeleteMoviesList: (state, { payload }) => {
      state.deleteMoviesList = payload;
    },

    setEditedCommentId: (state, { payload }) => {
      state.editedCommentId = payload.id;
    },
  },
});

export const {
  setStoredData,
  setSelectedMovie,
  updateSelectedMovie,
  setDeleteMoviesList,
  setEditedCommentId,
} = userSlice.actions;
export default userSlice.reducer;
