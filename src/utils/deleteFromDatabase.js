import { ref, set } from "firebase/database";
import { db } from "../constants";

// delete liked and watch later movies
export const deleteData = async (movies, deleteMovie, uid, type) => {
  const databaseRef = ref(db, `${uid}/${type}`);
  const newMovies = movies.filter((video) => video.id !== deleteMovie.id);
  try {
    await set(databaseRef, newMovies);
  } catch (err) {
    console.log(err);
  }
};

//Delete movie from playlist
export const deleteFromPlaylist = async (movies, deleteMovie, uid, name) => {
  let newMoviesList = movies.map((list) =>
    list.name === name
      ? {
          ...list,
          movies: list.movies?.filter((movie) => movie.id !== deleteMovie.id),
        }
      : list
  );

  const databaseRef = ref(db, `${uid}/playlistsMovies`);

  try {
    await set(databaseRef, newMoviesList);
  } catch (error) {
    console.log(error);
  }
};

//Delete movie from history
export const deleteFromHistory = async (movies, deleteMovie, uid, date) => {
  let newMoviesList = movies.map((list) =>
    list.date === date
      ? list.movies.length === 1
        ? null
        : {
            ...list,
            movies: list.movies?.filter((movie) => movie.id !== deleteMovie.id),
          }
      : list
  );

  const databaseRef = ref(db, `${uid}/historyMovies`);

  try {
    await set(databaseRef, newMoviesList);
  } catch (error) {
    console.log(error);
  }
};

//Delete complete list from the database
export const deleteAll = async (type, uid, playlistsMovies) => {
  if (playlistsMovies) {
    //for deleting single playlists
    const newVideos = playlistsMovies.filter((list) => list.name !== type);

    const databaseRef = ref(db, `${uid}/playlistsMovies`);
    try {
      set(databaseRef, newVideos);
    } catch (err) {
      console.log(err);
    }
  } else {
    //for deleting entire lists
    const databaseRef = ref(db, `${uid}/${type}`);
    try {
      set(databaseRef, []);
    } catch (err) {
      console.log(err);
    }
  }
};
