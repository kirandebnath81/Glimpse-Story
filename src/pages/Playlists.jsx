import { useState } from "react";
import styles from "../styles";

import { icons } from "../constants";

import { useDispatch, useSelector } from "react-redux";
import { setDeleteMoviesList, toggleDeleteModal } from "../features";

import { PlaylistCard, EmptyList } from "../components";

const Playlists = () => {
  const dispatch = useDispatch();
  const { playlistsMovies } = useSelector((state) => state.user);

  const [selectedList, setSelectedList] = useState("all");

  //Delete all playlists
  const handleDelete = () => {
    let allPlaylistMovies = [];

    playlistsMovies?.forEach(
      (list) => (allPlaylistMovies = [...allPlaylistMovies, ...list.movies])
    );

    dispatch(toggleDeleteModal(true));
    dispatch(
      setDeleteMoviesList({
        data: allPlaylistMovies,
        type: "playlistsMovies",
        title: "All Playlists",
      })
    );
  };

  //Playlist Cards
  const getPlaylistCard = () => {
    const result = playlistsMovies?.map((playlist) =>
      (selectedList === "all" || selectedList === playlist?.name) &&
      playlist?.movies ? (
        <PlaylistCard
          key={playlist?.id}
          data={playlist}
          selectedList={selectedList}
        />
      ) : (
        selectedList === playlist?.name && (
          <EmptyList
            key={playlist?.id}
            imgName="playlistsImg"
            message="There are no movies in your playlist ."
          />
        )
      )
    );

    return result;
  };

  //Check Empty
  if (playlistsMovies?.every((list) => !list?.movies)) {
    return (
      <div className={`${styles.mainBody} flex justify-center items-center`}>
        <EmptyList
          imgName="playlistsImg"
          message="You do not have any playlist ."
        />
      </div>
    );
  }

  return (
    <div className={`${styles.mainBody} pt-28 pb-64 sm:pb-48`}>
      <div className="xs:flex justify-between items-center mb-16">
        <div className="mb-10 xs:mb-0">
          <div className="mb-2 xs:mb-3 text-lg sm:text-xl font-medium opacity-95">
            PLAYLISTS MOVIES
          </div>
          <div className=" text-base sm:text-lg text-slate-600 dark:text-slate-300">
            You have total {playlistsMovies.length} playlists
          </div>
        </div>

        <div>
          <div
            className={`flex justify-end items-center mb-3 xs:mb-4  font-semibold text-sm xs:text-[15px] opacity-80 cursor-pointer hover:opacity-100 
            active:opacity-80 transition-opacity duration-300`}
          >
            <div className="mr-[6px] text-base">
              <icons.delete />
            </div>
            <div onClick={handleDelete}>CLEAR ALL PLAYLISTS</div>
          </div>
          <div className="flex justify-end">
            <select
              value={selectedList}
              onChange={(e) => setSelectedList(e.target.value)}
              className=" bg-slate-200 dark:bg-slate-900 w-60 px-2 py-[6px]  rounded-md text-[15px] cursor-pointer"
            >
              <option value="all">Playlists</option>
              {playlistsMovies.map(({ name, title, id }) => (
                <option key={id} value={name}>
                  {title}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="space-y-20">{getPlaylistCard()}</div>
    </div>
  );
};

export default Playlists;
