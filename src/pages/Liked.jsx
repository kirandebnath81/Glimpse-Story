import styles from "../styles";

import { useSelector } from "react-redux";

import { DisplayMoviesList, EmptyList } from "../components";

const Liked = () => {
  const { likedMovies } = useSelector((state) => state.user);

  if (likedMovies.length === 0) {
    return (
      <div className={`${styles.mainBody} flex justify-center items-center`}>
        <EmptyList
          imgName="likeImg"
          message="Looks like, you haven't Liked any movies yet."
        />
      </div>
    );
  }
  return (
    <DisplayMoviesList data={likedMovies} type="likedMovies" title="Liked" />
  );
};

export default Liked;
