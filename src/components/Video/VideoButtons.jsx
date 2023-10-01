import PropTypes from "prop-types";
import styles from "../../styles";
import { icons } from "../../constants";

import { toast } from "react-toastify";

import { useDispatch, useSelector } from "react-redux";
import { setSelectedMovie, toggleSaveModal } from "../../features";

import { useLocation, useNavigate } from "react-router-dom";

import {
  setLikedMovies,
  setWatchLaterMovies,
  updateMovie,
  deleteData,
  updateWatchMovie,
  shareLink,
} from "../../utils";

const VideoButtons = ({ movieData }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const dispatch = useDispatch();

  const { profile, likedMovies, watchLaterMovies, updatedMovies } = useSelector(
    (state) => state.user
  );

  //manage liked movies
  const likeHandler = () => {
    if (!profile.uid) {
      navigate("/signin/?message=You must sign in first", {
        state: pathname,
      });
      return;
    }

    const isLiked = likedMovies.find((movie) => movie.id === movieData.id);

    let movie;

    if (isLiked) {
      movie = {
        ...movieData,
        vote_count: movieData.vote_count - 1,
        isLiked: false,
      };
      deleteData(likedMovies, movie, profile.uid, "likedMovies");
    } else {
      movie = {
        ...movieData,
        vote_count: movieData.vote_count + 1,
        isLiked: true,
      };
      setLikedMovies(likedMovies, movie, profile.uid);
    }
    //update the watch movie
    updateWatchMovie(movie, profile.uid);
    //update the movie in db
    updateMovie(updatedMovies, movie, profile.uid);
  };

  //manage watchLater movies
  const handleWatchLater = () => {
    if (!profile.uid) {
      navigate("/signin/?message=You must sign in first", {
        state: pathname,
      });
      return;
    }

    const isMovieExist = watchLaterMovies.find(
      (movie) => movie.id === movieData.id
    );

    let movie;

    if (isMovieExist) {
      movie = {
        ...movieData,
        playlists: { ...movieData.playlists, watchLater: false },
      };

      deleteData(watchLaterMovies, movieData, profile.uid, "watchLaterMovies");
      toast.info("Removed from watch later");
    } else {
      movie = {
        ...movieData,
        playlists: { ...movieData.playlists, watchLater: true },
      };
      //add to watchlater
      setWatchLaterMovies(watchLaterMovies, movie, profile.uid);
      toast.info("Added to watch later");
    }

    //update the watch movie
    updateWatchMovie(movie, profile.uid);
    //update the movie in db
    updateMovie(updatedMovies, movie, profile.uid);
  };

  //save movies
  const saveHandler = () => {
    if (!profile.uid) {
      navigate("/signin/?message=You must sign in first", {
        state: pathname,
      });
      return;
    }
    dispatch(setSelectedMovie(movieData));
    dispatch(toggleSaveModal(true));
  };

  const isWatchLater = movieData?.playlists?.watchLater;

  return (
    <div className="flex justify-end items-center space-x-[6px] xs:space-x-3">
      <div
        className={`${styles.videoButton} ${
          movieData.isLiked
            ? "text-sky-600 dark:text-sky-400"
            : "text-slate-800 dark:text-slate-100"
        }`}
        onClick={likeHandler}
      >
        <div className="mr-1 ss:mr-2 text-xs ss:text-sm sm:text-lg">
          {profile.uid ? (
            movieData.isLiked ? (
              <icons.likeFill />
            ) : (
              <icons.like />
            )
          ) : (
            <icons.like />
          )}
        </div>

        <div className="text-[10px] ss:text-xs sm:text-[15px]">
          {movieData?.vote_count}
        </div>
      </div>

      <div
        className={`${styles.videoButton} ${
          isWatchLater
            ? "text-sky-600 dark:text-sky-400"
            : "text-slate-800 dark:text-slate-100"
        }`}
        onClick={handleWatchLater}
      >
        <div className="mr-1 ss:mr-[6px] text-xs ss:text-sm sm:text-lg">
          {isWatchLater ? <icons.watchLaterFill /> : <icons.watchLater />}
        </div>
        <div className="text-[10px] ss:text-xs sm:text-[15px] whitespace-nowrap">
          Watch later
        </div>
      </div>

      <div className={`${styles.videoButton}`} onClick={saveHandler}>
        <div className="mr-1 ss:mr-[6px] text-xs ss:text-sm sm:text-lg">
          <icons.playlist />
        </div>
        <div className="text-[10px] ss:text-xs sm:text-[15px]">Save</div>
      </div>

      <div
        className={`${styles.videoButton}`}
        onClick={() => shareLink(movieData.id)}
      >
        <div className="mr-1 ss:mr-[6px] text-xs ss:text-sm sm:text-lg">
          <icons.share />
        </div>
        <div className="text-[10px] ss:text-xs sm:text-[15px]">Share</div>
      </div>
    </div>
  );
};

VideoButtons.propTypes = {
  movieData: PropTypes.object.isRequired,
};

export default VideoButtons;
