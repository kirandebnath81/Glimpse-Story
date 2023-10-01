import styles from "../styles";

import { useSelector } from "react-redux";

import { DisplayMoviesList, EmptyList } from "../components";

const WatchLater = () => {
  const { watchLaterMovies } = useSelector((state) => state.user);

  if (watchLaterMovies.length === 0) {
    return (
      <div className={`${styles.mainBody} flex justify-center items-center`}>
        <EmptyList
          imgName="watchLaterImg"
          message="You haven't added any movies to Watch Later."
        />
      </div>
    );
  }
  return (
    <DisplayMoviesList
      data={watchLaterMovies}
      type="watchLaterMovies"
      title="Watch Later"
    />
  );
};

export default WatchLater;
