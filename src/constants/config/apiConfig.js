const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const requests = {
  fetchAllMovies: `/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false`,

  fetchMovieGenres: `/genre/movie/list?api_key=${API_KEY}&language=en-US`,

  //In the next 3 api add the id at the exact place, do not add the id with params(in axios)
  fetchVideo: `/movie/{id}/videos?api_key=${API_KEY}&language=en-US`,

  fetchSimilar: `/movie/{movie_id}/similar?api_key=${API_KEY}&language=en-US&page=1`,

  fetchDetails: `/movie/{id}?api_key=${API_KEY}&language=en-US`,

  fetchSearchedMovie: `/search/movie?api_key=${API_KEY}&language=en-US&include_adult=false`,
};

export default requests;
