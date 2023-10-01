import styles from "../styles";

import { icons } from "../constants";

import { useDispatch, useSelector } from "react-redux";
import { setDeleteMoviesList, toggleDeleteModal } from "../features";

import { getReleventDate } from "../utils";
import { EmptyList, MovieCard } from "../components";

const History = () => {
  const dispatch = useDispatch();

  const { historyMovies } = useSelector((state) => state.user);

  const handleDelete = () => {
    dispatch(toggleDeleteModal(true));
    dispatch(
      setDeleteMoviesList({
        data: historyMovies,
        type: "historyMovies",
        title: "History",
      })
    );
  };

  if (historyMovies.length === 0) {
    return (
      <div className={`${styles.mainBody} flex justify-center items-center`}>
        <EmptyList
          imgName="historyImg"
          message="Looks like, you haven't watched any videos yet."
        />
      </div>
    );
  }

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
          <div>CLEAR ALL HISTORY MOVIES</div>
        </div>

        <div className="mb-2 text-lg sm:text-xl font-medium opacity-95">
          Watch History
        </div>
      </div>
      <div>
        {historyMovies?.map(({ movies, date, id }) => (
          <div key={id} className="mb-10">
            <div className="text-lg xs:text-xl font-semibold mb-7 tracking-wide">
              {getReleventDate(date)}
            </div>
            <div className="flex flex-wrap gap-y-12 gap-x-5">
              {movies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  data={movie}
                  type="historyMovies"
                  date={date}
                />
              ))}
            </div>
            <div
              className={`w-full h-[2px] bg-gray-200 dark:bg-slate-700 mt-12 ${styles.colorsTransition}`}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;
