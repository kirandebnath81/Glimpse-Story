import styles from "../styles";
import { icons } from "../constants";

import PropTypes from "prop-types";

import { useDispatch } from "react-redux";
import { setDeleteMoviesList, toggleDeleteModal } from "../features";

import MovieCard from "./MovieCard";

const DisplayMoviesList = ({ data, type, title }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(toggleDeleteModal(true));
    dispatch(setDeleteMoviesList({ data, type, title }));
  };

  return (
    <div className={`${styles.mainBody} pt-28 pb-64 sm:pb-48`}>
      <div className="md:flex items-start justify-between flex-row-reverse mb-10">
        <div
          className={`flex items-center font-semibold justify-end text-sm xs:text-[15px] mb-6 md:mb-0 opacity-80  cursor-pointer hover:opacity-100 
          active:opacity-80 transition-opacity duration-300`}
          onClick={handleDelete}
        >
          <div className="mr-[6px] text-base">
            <icons.delete />
          </div>
          <div>CLEAR ALL {title.toUpperCase()} MOVIES</div>
        </div>

        <div>
          <div className="mb-2 text-lg sm:text-xl font-medium opacity-95">
            {title} Movies
          </div>
          <div className="text-sm xs:text-base text-slate-600 dark:text-slate-300">
            You have total {data?.length} movie in your{" "}
            <span className="text-slate-700 dark:text-slate-200">{title}</span>{" "}
            movies .
          </div>
        </div>
      </div>
      <div className="flex flex-wrap justify-between sm:justify-start gap-y-12 gap-x-1 sm:gap-x-5">
        {data?.map((movie) => (
          <MovieCard key={movie.id} data={movie} type={type} />
        ))}
      </div>
    </div>
  );
};

DisplayMoviesList.propTypes = {
  data: PropTypes.array.isRequired,
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default DisplayMoviesList;
