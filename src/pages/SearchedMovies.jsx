import styles from "../styles";

import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

import { fetchSearchedMovies } from "../utils";
import { MovieCard, Spinner } from "../components";

const SearchedMovies = () => {
  const [searchParams] = useSearchParams();
  const searchValue = searchParams.get("query");

  //fetch searched result
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["search", searchValue],
    queryFn: ({ queryKey }) => fetchSearchedMovies(queryKey[1]),
  });

  if (isLoading) return <Spinner />;

  return (
    <div className={`${styles.mainBody} pt-28 pb-60 sm:pb-44`}>
      {isError ? (
        <div className={`${styles.errorMsg}`}>{error.message}</div>
      ) : (
        <>
          {data.length !== 0 ? (
            <div className="flex flex-wrap justify-between sm:justify-start gap-y-12 gap-x-1 sm:gap-x-5">
              {data.map((movie) => (
                <MovieCard key={movie.id} data={movie} type="search" />
              ))}
            </div>
          ) : (
            <div className={`${styles.errorMsg}`}>Result Not Found</div>
          )}
        </>
      )}
    </div>
  );
};

export default SearchedMovies;
