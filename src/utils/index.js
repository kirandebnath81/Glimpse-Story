//fetch Data
export {
  fetchMoviesInfo,
  fetchGenres,
  fetchMovieVideo,
  fetchSimilarMovies,
  fetchMovieDetails,
  fetchSearchedMovies,
  fetchDataFromDb,
} from "./fetchData";

//Add data to db
export {
  setLikedMovies,
  setWatchLaterMovies,
  setPlaylistNames,
  setPlaylistsMovies,
  setHistoryMovies,
  updateMovie,
  updateMoviesList,
  setWatchMovie,
  updateWatchMovie,
} from "./addToDatabase";

//delete data from db
export {
  deleteData,
  deleteFromPlaylist,
  deleteFromHistory,
  deleteAll,
} from "./deleteFromDatabase";

export { default as getTrailer } from "./getTrailer";
export { default as getPlaylists } from "./getPlaylists";
export { default as addedMovieData } from "./addedMovieData";
export { default as standardName } from "./standardName";
export { getToday, getReleventDate } from "./getDate";
export { default as scrollToTop } from "./scrollToTop";
export { default as shareLink } from "./shareLink";
