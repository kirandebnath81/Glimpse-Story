import { useSelector } from "react-redux";
import {
  updateMovie,
  setWatchLaterMovies,
  deleteData,
  addedMovieData,
} from "../utils";
import { toast } from "react-toastify";

const useWatchLater = (givenMovie) => {
  const { profile, updatedMovies, watchLaterMovies, playlistsMovies } =
    useSelector((state) => state.user);

  const handleWatchLater = () => {
    const isMovieExist = watchLaterMovies.find(
      (movie) => movie.id === givenMovie.id
    );

    //check whether previously updated or not
    const updatedMovie = updatedMovies.find(
      (movie) => movie.id === givenMovie.id
    );

    let movie = updatedMovie || {
      ...givenMovie,
      ...addedMovieData(playlistsMovies),
    };

    if (isMovieExist) {
      movie = {
        ...movie,
        playlists: { ...movie.playlists, watchLater: false },
      };
      //delete from watchlater
      deleteData(watchLaterMovies, movie, profile.uid, "watchLaterMovies");
      toast.info("Removed from watch later");
    } else {
      movie = {
        ...movie,
        playlists: { ...movie.playlists, watchLater: true },
      };
      //write watchlater data
      setWatchLaterMovies(watchLaterMovies, movie, profile.uid);
      toast.info("Added to watch later");
    }

    //update the movie in db
    updateMovie(updatedMovies, movie, profile.uid);
  };

  return handleWatchLater;
};

export default useWatchLater;
