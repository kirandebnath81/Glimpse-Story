import styles from "../styles";

import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

import { fetchMoviesInfo } from "../utils";
import { Genres, MovieCard, Pagination, Spinner } from "../components";

const Movies = () => {
  const [searchParams] = useSearchParams();

  const genreId = searchParams.get("genreId");
  const moviesPage = searchParams.get("page");

  //fetch movies info data
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["movies", "details", genreId || "", moviesPage || 1],
    queryFn: ({ queryKey }) => fetchMoviesInfo(queryKey[2], queryKey[3]),
    keepPreviousData: true,
  });

  if (isLoading) return <Spinner />;

  return (
    <div className={`${styles.mainBody} pt-44 pb-40 sm:pb-20 flex flex-col`}>
      <Genres />
      {isError ? (
        <div className={`${styles.errorMsg}`}>{error.message}</div>
      ) : (
        <>
          <div className="flex flex-wrap justify-between gap-y-12 gap-x-1">
            {data?.map((movie) => (
              <MovieCard key={movie.id} data={movie} type="main" />
            ))}
          </div>
          <div className="mt-24">
            <Pagination />
          </div>
        </>
      )}
    </div>
  );
};

export default Movies;
