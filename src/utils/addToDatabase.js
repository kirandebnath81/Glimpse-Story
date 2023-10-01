import { toast } from "react-toastify";
import { v4 } from "uuid";

import { ref, set } from "firebase/database";
import { db } from "../constants";

import addedMovieData from "./addedMovieData";
import standardName from "./standardName";
import { getToday } from "./getDate";

// write liked movies data
export const setLikedMovies = async (movies, newMovie, uid) => {
  const addMovie = { ...newMovie, isDropdown: false };
  const dbRef = ref(db, `${uid}/likedMovies`);
  try {
    await set(dbRef, [addMovie, ...movies]);
  } catch (error) {
    console.log(error);
  }
};

//write watch later movies data
export const setWatchLaterMovies = async (movies, newMovie, uid) => {
  const dbRef = ref(db, `${uid}/watchLaterMovies`);
  try {
    await set(dbRef, [newMovie, ...movies]);
  } catch (error) {
    console.log(error);
  }
};

//write playlistNames data
export const setPlaylistNames = async (playlistsMovies, newName, uid) => {
  const isExisted = playlistsMovies.find(({ title }) => title === newName);

  if (isExisted) {
    toast.warning("Already existed");
    return;
  }

  const newPlaylist = {
    name: standardName(newName),
    title: newName,
    movies: [],
    id: v4(),
  };

  const newPlaylistsMovies = [...playlistsMovies, newPlaylist];

  const dbRef = ref(db, `${uid}/playlistsMovies`);
  try {
    await set(dbRef, newPlaylistsMovies);
  } catch (error) {
    console.log(error);
  }
};

//Write playlists movie data
export const setPlaylistsMovies = async (moviesList, newMovie, name, uid) => {
  const newMoviesList = moviesList.map((list) =>
    list.name === name
      ? {
          ...list,
          movies: list.movies ? [newMovie, ...list.movies] : [newMovie],
        }
      : list
  );
  const dbRef = ref(db, `${uid}/playlistsMovies`);

  try {
    await set(dbRef, newMoviesList);
  } catch (error) {
    console.log(error);
  }
};

//write history movies data
export const setHistoryMovies = async (historyMovies, newMovie, uid) => {
  let newHistoryMovies = [];
  const today = getToday();

  const moviesList = historyMovies?.find((list) => list.date === today);

  if (moviesList) {
    if (moviesList?.movies.find(({ id }) => id === newMovie.id)) {
      const filteredMovies = historyMovies.map((list) =>
        list.date === today
          ? {
              ...list,
              movies: list.movies.filter((movie) => movie.id !== newMovie.id),
            }
          : list
      );

      newHistoryMovies = filteredMovies.map((list) =>
        list.date === today
          ? { ...list, movies: [newMovie, ...list.movies] }
          : list
      );
    } else {
      newHistoryMovies = historyMovies.map((list) =>
        list.date === today
          ? { ...list, movies: [newMovie, ...list.movies] }
          : list
      );
    }
  } else {
    newHistoryMovies = [
      { date: today, movies: [newMovie], id: v4() },
      ...historyMovies,
    ];
  }
  const dbRef = ref(db, `${uid}/historyMovies`);
  try {
    await set(dbRef, newHistoryMovies);
  } catch (error) {
    console.log(error);
  }
};

// write updated movie data
export const updateMovie = async (updatedMovies, newMovie, uid) => {
  let newUpdatedMovies;

  const isExist = updatedMovies.find((movie) => movie?.id === newMovie?.id);

  if (isExist) {
    newUpdatedMovies = updatedMovies.filter(
      (movie) => movie.id !== newMovie?.id
    );
    newUpdatedMovies = [...newUpdatedMovies, newMovie];
  } else {
    newUpdatedMovies = [...updatedMovies, newMovie];
  }
  const dbRef = ref(db, `${uid}/updatedMovies`);

  try {
    await set(dbRef, newUpdatedMovies);
  } catch (error) {
    console.log(error);
  }
};

//write Updated movies list data
export const updateMoviesList = async (
  updatedMovies,
  moviesList,
  type,
  uid
) => {
  let newUpdatedMovies = [];

  const findMovie = (id) => moviesList.find((movie) => movie.id === id);

  if (type === "watchlater") {
    newUpdatedMovies = updatedMovies.map((updatedMovie) =>
      findMovie(updatedMovie.id)
        ? {
            ...updatedMovie,
            playlists: { ...updatedMovie.playlists, watchLater: false },
          }
        : updatedMovie
    );
  } else if (type === "liked") {
    newUpdatedMovies = updatedMovies.map((updatedMovie) =>
      findMovie(updatedMovie.id)
        ? {
            ...updatedMovie,
            isLiked: false,
            vote_count: updatedMovie.vote_count - 1,
          }
        : updatedMovie
    );
  } else if (type === "playlistsMovies") {
    newUpdatedMovies = updatedMovies.map((updatedMovie) =>
      findMovie(updatedMovie.id)
        ? {
            ...updatedMovie,
            playlists: { watchLater: updatedMovie.playlists.watchLater },
          }
        : updatedMovie
    );
  } else {
    newUpdatedMovies = updatedMovies.map((updatedMovie) =>
      findMovie(updatedMovie.id)
        ? {
            ...updatedMovie,
            playlists: {
              ...updatedMovie.playlists,
              [type]: false,
            },
          }
        : updatedMovie
    );
  }
  const dbRef = ref(db, `${uid}/updatedMovies`);

  try {
    await set(dbRef, newUpdatedMovies);
  } catch (error) {
    console.log(error);
  }
};

//write watch movie data
export const setWatchMovie = async (
  updatedMovies,
  newMovie,
  playlistsMovies,
  uid
) => {
  const movie = updatedMovies?.find((movie) => movie?.id === newMovie?.id);

  let watchMovie;

  if (movie) {
    watchMovie = movie;
  } else {
    watchMovie = {
      ...newMovie,
      ...addedMovieData(playlistsMovies, newMovie),
    };
  }

  const dbRef = ref(db, `${uid}/watchMovie`);

  try {
    await set(dbRef, watchMovie);
  } catch (error) {
    console.log(error);
  }
};

//write updated watch movie data
export const updateWatchMovie = async (movie, uid) => {
  const dbRef = ref(db, `${uid}/watchMovie`);

  try {
    await set(dbRef, movie);
  } catch (error) {
    console.log(error);
  }
};
