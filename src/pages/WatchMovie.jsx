import styles from "../styles";

import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { useSelector } from "react-redux";

import {
  fetchMovieDetails,
  fetchMovieVideo,
  fetchSimilarMovies,
  getTrailer,
  setWatchMovie,
} from "../utils";

import { VideoButtons, VideoComments, MovieCard, Spinner } from "../components";

const WatchMovie = () => {
  const { id } = useParams();

  const { profile, updatedMovies, playlistsMovies, watchMovie } = useSelector(
    (state) => state.user
  );

  //fetch movie videos data
  const movieVideos = useQuery({
    queryKey: ["movies", "video", id],
    queryFn: ({ queryKey }) => fetchMovieVideo(queryKey[2]),
  });

  //fetch movie details data
  const movieDetails = useQuery({
    queryKey: ["movie", "details", id],
    queryFn: ({ queryKey }) => fetchMovieDetails(queryKey[2]),
  });

  //fetch similar movies data
  const similarMovies = useQuery({
    queryKey: ["movies", "similar", id],
    queryFn: ({ queryKey }) => fetchSimilarMovies(queryKey[2]),
  });

  if (movieVideos.isLoading || movieDetails.isLoading) return <Spinner />;

  //get the watch movie
  const getWatchMovie = () => {
    if (!watchMovie) {
      return movieDetails.data;
    }

    if (watchMovie?.id === movieDetails?.data?.id) {
      return watchMovie;
    } else {
      setWatchMovie(
        updatedMovies,
        movieDetails.data,
        playlistsMovies,
        profile.uid
      );
      return watchMovie;
    }
  };

  const releventWatchMovie = getWatchMovie();

  return (
    <div
      className={`${styles.mainBody} pt-[105px] pb-60 sm:pb-48 md:flex md:space-x-8`}
    >
      {movieVideos.isError ? (
        <div className={`flex-1 ${styles.errorMsg}`}>
          {movieVideos.error.message}
        </div>
      ) : movieDetails.isError ? (
        <div className={`flex-1 ${styles.errorMsg}`}>
          {movieDetails.error.message}
        </div>
      ) : getTrailer(movieVideos) ? (
        <>
          <div className="w-full md:flex-1 min-h-screen mb-20">
            <div className="w-full h-auto rounded-lg overflow-hidden">
              <iframe
                src={`https://www.youtube.com/embed/${getTrailer(movieVideos)}`}
                title="Youtube Video"
                allowFullScreen
                allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
                className="w-full h-full aspect-video"
              ></iframe>
            </div>
            <div className="mt-5 mb-8">
              <div className="text-base xs:text-lg sm:text-xl font-semibold mb-2 text-slate-800 dark:text-slate-50">
                {movieDetails?.data?.original_title}
              </div>
              <div
                className="font-medium text-xs xs:text-sm sm:text-[15px] mb-3 
                    text-slate-700 dark:text-slate-200"
              >
                {movieDetails?.data?.tagline}
              </div>
              <div className="text-[10px] xs:text-xs sm:text-sm text-slate-700 dark:text-slate-200">
                {movieDetails?.data?.release_date}
              </div>
            </div>

            <VideoButtons movieData={releventWatchMovie} />
            <div className="w-full h-[1px] bg-slate-300 dark:bg-slate-700 my-14"></div>
            {/* Video comments */}
            <div>
              {profile?.uid ? (
                <VideoComments movieData={watchMovie} />
              ) : (
                <div className="opacity-95 text-sm sm:text-base">
                  Comments are turned off. Sign in to see comments
                </div>
              )}
            </div>
          </div>

          <div className="w-full md:basis-[300px] min-h-screen flex flex-wrap justify-between gap-y-12 gap-x-1 md:flex-col md:gap-x-0 md:justify-start">
            {similarMovies.data?.map((movieData) => (
              <MovieCard key={movieData?.id} data={movieData} type="similar" />
            ))}
          </div>
        </>
      ) : (
        <div className={`flex-1 ${styles.errorMsg}`}>Result Not Found</div>
      )}
    </div>
  );
};

export default WatchMovie;
