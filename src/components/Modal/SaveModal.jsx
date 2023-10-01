import { useState } from "react";
import styles from "../../styles";
import { icons } from "../../constants";

import { toast } from "react-toastify";

import useOutsideClick from "../../custom-hooks/OutsideClickHook";

import { useDispatch, useSelector } from "react-redux";
import { toggleSaveModal, updateSelectedMovie } from "../../features";

import {
  setPlaylistNames,
  setWatchLaterMovies,
  setPlaylistsMovies,
  updateMovie,
  standardName,
  deleteData,
  deleteFromPlaylist,
} from "../../utils";

const SaveModal = () => {
  const dispatch = useDispatch();

  const {
    profile,
    selectedMovie,
    playlistsMovies,
    watchLaterMovies,
    updatedMovies,
  } = useSelector((state) => state.user);

  const [isCreatePlaylist, setIsCreatePlaylist] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const elementRef = useOutsideClick(() => dispatch(toggleSaveModal()));

  //create playlist func
  const submitHandler = (e) => {
    e.preventDefault();
    if (!inputValue) {
      return;
    }

    //update the movies playlists with new playlist
    setPlaylistNames(playlistsMovies, inputValue, profile.uid);

    //Add the new playlist in the selected movie
    const movie = {
      ...selectedMovie,
      playlists: {
        ...selectedMovie.playlists,
        [standardName(inputValue)]: false,
      },
    };
    //update the selected movie playlists
    dispatch(updateSelectedMovie(movie));
    setInputValue("");
  };

  const changeHandler = (element, playlistTitle) => {
    const { name, checked } = element.target;

    const movie = {
      ...selectedMovie,
      playlists: { ...selectedMovie.playlists, [name]: checked },
    };

    if (name === "watchLater") {
      if (checked) {
        setWatchLaterMovies(watchLaterMovies, movie, profile.uid);
        toast.info(`Added to watch later`);
      } else {
        deleteData(watchLaterMovies, movie, profile.uid, "watchLater");
        toast.info(`Removed from watch later`);
      }
    } else {
      if (checked) {
        setPlaylistsMovies(playlistsMovies, movie, name, profile.uid);
        toast.info(`Added to ${playlistTitle}`);
      } else {
        deleteFromPlaylist(playlistsMovies, movie, profile.uid, name);
        toast.info(`Removed from ${playlistTitle}`);
      }
    }

    //update the movie in db
    updateMovie(updatedMovies, movie, profile.uid);
    //update the selected movie
    dispatch(updateSelectedMovie(movie));
  };

  return (
    <div className="fixed z-50 w-full h-screen bg-slate-950/90 dark:bg-slate-800/80  flex items-center justify-center ">
      <div
        className="w-72 bg-slate-50 dark:bg-slate-950 rounded-lg font-poppins flex flex-col justify-between dark:text-slate-50"
        ref={elementRef}
      >
        <div className="flex justify-between items-center w-full h-[60px] text-lg px-6">
          <div>Save to ...</div>
          <div
            onClick={() => dispatch(toggleSaveModal())}
            className="text-xl bg-slate-100 dark:bg-slate-900  p-[6px] rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 
            hover:text-2xl transition-all duration-300 cursor-pointer active:bg-slate-300 dark:active:bg-slate-700"
          >
            <icons.cross />
          </div>
        </div>
        <div className="w-full h-[2px] bg-slate-200 dark:bg-slate-900"></div>

        <div className="py-4 px-6 max-h-[300px] overflow-auto">
          <div className="flex items-center text-lg text-slate-800 dark:text-slate-50 mb-[10px] ">
            <input
              type="checkbox"
              id="watchLater"
              checked={selectedMovie?.playlists?.watchLater}
              name="watchLater"
              onChange={(e) => changeHandler(e)}
              className="mr-3 w-[18px] h-[18px] cursor-pointer"
            />
            <label htmlFor="watchLater" className="cursor-pointer">
              Watch Later
            </label>
          </div>
          {playlistsMovies?.map(({ name, title, id }) => (
            <div
              key={id}
              className="flex items-center text-lg text-slate-800 dark:text-slate-50 mb-[10px] "
            >
              <input
                type="checkbox"
                id={id}
                name={name}
                checked={selectedMovie?.playlists[name]}
                onChange={(e) => changeHandler(e, title)}
                className="mr-3 w-[18px] h-[18px] cursor-pointer"
              />
              <label htmlFor={id} className="cursor-pointer">
                {title}
              </label>
            </div>
          ))}
        </div>

        <div className="w-full h-[2px] bg-slate-200 dark:bg-slate-900"></div>
        {isCreatePlaylist ? (
          <form onSubmit={submitHandler} className="flex flex-col p-6">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Playlist name"
              autoFocus
              className="w-full h-9 bg-transparent border-solid border-b-[1px] focus:border-b-2
            border-slate-500 dark:border-slate-300 outline-none select-none transition-all 
            ease-in duration-150 mb-5 indent-1"
            />

            {inputValue ? (
              <button
                onClick={submitHandler}
                className={`w-full bg-cyan-500 rounded-md py-[5px] text-white hover:bg-cyan-600 active:bg-cyan-700 ${styles.colorsTransition}`}
              >
                Create
              </button>
            ) : (
              <button
                disabled
                className={`w-full bg-cyan-500 rounded-md py-[5px] text-white cursor-not-allowed disabled:opacity-50 ${styles.colorsTransition}`}
              >
                Create
              </button>
            )}
          </form>
        ) : (
          <div
            onClick={() => setIsCreatePlaylist(true)}
            className="flex justify-center items-center h-14 px-6 hover:text-lg transition-all duration-300 cursor-pointer"
          >
            <div className="mr-2 ">
              <icons.plus />
            </div>
            <div>Create a Playlist</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SaveModal;
