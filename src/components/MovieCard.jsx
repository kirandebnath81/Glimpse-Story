import { useState } from "react";
import PropTypes from "prop-types";
import styles from "../styles";
import { imgBaseUrl, icons } from "../constants";

import { LazyLoadImage } from "react-lazy-load-image-component";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { setHistoryMovies, setWatchMovie } from "../utils";
import DropdownMenu from "./DropdownMenu";

const MovieCard = ({ data, type, date }) => {
  const navigate = useNavigate();

  const { profile, historyMovies, updatedMovies, playlistsMovies } =
    useSelector((state) => state.user);

  const [isDropdown, setIsDropdown] = useState(false);

  const movieHandler = () => {
    navigate(`/watch/${data.id}`);

    if (!profile?.uid) return;

    //set the watch movie in the db
    setWatchMovie(updatedMovies, data, playlistsMovies, profile?.uid);
    //set history movies
    setHistoryMovies(historyMovies, data, profile.uid);
  };

  return (
    <div className="basis-full xs:basis-[48%] md:basis-64 h-auto flex flex-col justify-between font-poppins select-none">
      <div
        onClick={movieHandler}
        className="w-full h-full overflow-hidden rounded-lg cursor-pointer"
      >
        {data.backdrop_path ? (
          <div
            className="w-full h-full transform-gpu
            hover:scale-[1.35] transition-transform duration-[350ms]"
          >
            <LazyLoadImage
              className="w-full h-full object-cover"
              src={imgBaseUrl + data.backdrop_path}
              alt={data.title}
              threshold={1000}
            />
          </div>
        ) : (
          <div
            className={`flex-1 min-h-[150px] bg-slate-200 dark:bg-slate-700 rounded-xl flex justify-center items-center cursor-pointer`}
          >
            Poster Not Available
          </div>
        )}
      </div>

      <div className="flex justify-between items-center space-x-4 text-[13px] font-medium text-slate-700 dark:text-slate-200 h-10 mt-3">
        <div
          className={`flex-1 flex items-center h-full hover:text-white cursor-pointer ${styles.colorsTransition}`}
          onClick={movieHandler}
        >
          {data.title}
        </div>

        <div className="basis-6 h-7 relative">
          {isDropdown ? (
            <DropdownMenu
              type={type}
              movieData={data}
              date={date}
              handleDropdown={() => setIsDropdown(false)}
            />
          ) : (
            <div
              onClick={() => setIsDropdown(true)}
              className={styles.dropdownMenu}
            >
              <icons.dotMenu />
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-between items-center  text-xs mt-2">
        <div className="flex-1 text-slate-700 dark:text-slate-300">
          {data.release_date}
        </div>
        <div className="font-medium basis-5 flex justify-center">
          {data.vote_average?.toFixed(1)}
        </div>
      </div>
    </div>
  );
};

MovieCard.propTypes = {
  data: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  date: PropTypes.string,
};

export default MovieCard;
