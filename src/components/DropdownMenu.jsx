import PropTypes from "prop-types";
import styles from "../styles";
import { icons } from "../constants";

import { useLocation, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { setSelectedMovie, toggleSaveModal } from "../features";

import { useOutsideClick, useWatchLater } from "../custom-hooks";

import {
  updateMovie,
  deleteData,
  deleteFromPlaylist,
  deleteFromHistory,
  shareLink,
} from "../utils";

const DropdownMenu = ({ type, movieData, date, handleDropdown }) => {
  const navigate = useNavigate();
  const { pathname, search } = useLocation();

  const dispatch = useDispatch();

  const {
    profile,
    watchLaterMovies,
    likedMovies,
    updatedMovies,
    playlistsMovies,
    historyMovies,
  } = useSelector((state) => state.user);

  //close dropdown
  const elementRef = useOutsideClick(() => handleDropdown());

  //managing the watchLater movies through custom hook
  const handleWatchLater = useWatchLater(movieData);

  //open modal for saving
  const handleModal = () => {
    handleDropdown();
    if (!profile.uid) {
      navigate("/signin/?message=You must sign in first", {
        state: pathname + search,
      });
      return;
    }
    dispatch(setSelectedMovie(movieData));

    dispatch(toggleSaveModal());
  };

  const watchLaterHandler = () => {
    handleDropdown();

    if (!profile.uid) {
      navigate("/signin/?message=You must sign in first", {
        state: pathname + search,
      });
      return;
    }

    handleWatchLater();
  };

  //handle share
  const shareHandler = () => {
    shareLink(movieData.id);
    handleDropdown();
  };

  const removeHandler = () => {
    let deleteMovie;

    if (type === "likedMovies") {
      deleteMovie = {
        ...movieData,
        isLiked: false,
        vote_count: movieData.vote_count - 1,
      };
      deleteData(likedMovies, movieData, profile.uid, type);
    } else if (type === "historyMovies") {
      deleteFromHistory(historyMovies, movieData, profile.uid, date);
    } else {
      //for playlist movies
      deleteMovie = {
        ...movieData,
        playlists: { ...movieData.playlists, [type]: false },
      };

      deleteFromPlaylist(playlistsMovies, movieData, profile.uid, type);
    }

    type !== "historyMovies" &&
      updateMovie(updatedMovies, deleteMovie, profile.uid);
  };

  //specific button
  const movieButton = (handler, givenType) => (
    <div className={`${styles.dropdownBtn}`} onClick={handler}>
      <div className="mr-2 text-lg">
        <icons.delete />
      </div>
      <div className="text-sm font-medium ">Remove from {givenType}</div>
    </div>
  );

  //get specific movie type btn
  const getReleventButton = () => {
    if (type === "likedMovies") {
      return movieButton(removeHandler, "Liked");
    } else if (type === "historyMovies") {
      return movieButton(removeHandler, "History");
    } else if (playlistsMovies.find((list) => list.name === type)) {
      //for each playlist movie
      const newType = type?.replace(/([A-Z])/g, " $1").toLowerCase();
      return movieButton(removeHandler, newType);
    }
  };

  //get add or remove watchlater btn
  const handleWatchLaterBtn = () => {
    const isWatchLaterExist = watchLaterMovies.find(
      (movie) => movie.id === movieData.id
    );

    if (isWatchLaterExist) {
      return movieButton(watchLaterHandler, "watch later");
    } else {
      return (
        <div className={`${styles.dropdownBtn}`} onClick={watchLaterHandler}>
          <div className="mr-2 text-lg">
            <icons.watchLater />
          </div>
          <div className="text-sm font-medium">Save to watch later</div>
        </div>
      );
    }
  };

  return (
    <div ref={elementRef} className="w-full h-full">
      <div onClick={() => handleDropdown()} className={styles.dropdownMenu}>
        <icons.dotMenu />
      </div>

      <div
        className={`absolute top-9 right-0 z-[5] bg-slate-200 dark:bg-slate-700 rounded-lg overflow-hidden ${styles.colorsTransition} dropdown`}
      >
        {/*get add or remove btn specific to different movie types*/}
        {getReleventButton()}

        {/*get add or remove watchlater btn*/}
        {handleWatchLaterBtn()}

        <div onClick={handleModal} className={`${styles.dropdownBtn}`}>
          <div className="mr-2 text-xl">
            <icons.playlist />
          </div>
          <div className="text-sm font-medium">Save to playlist</div>
        </div>

        <div className={`${styles.dropdownBtn}`} onClick={shareHandler}>
          <div className="mr-2 text-lg">
            <icons.share />
          </div>
          <div className="text-sm font-medium">Share</div>
        </div>
      </div>
    </div>
  );
};

DropdownMenu.propTypes = {
  type: PropTypes.string.isRequired,
  movieData: PropTypes.object.isRequired,
  date: PropTypes.string,
  handleDropdown: PropTypes.func.isRequired,
};

export default DropdownMenu;
