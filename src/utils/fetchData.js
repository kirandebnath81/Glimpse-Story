import { onValue, ref } from "firebase/database";
import { axios, db, requests } from "../constants";
import { setStoredData } from "../features";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export const fetchMoviesInfo = async (genreId, videosPage) => {
  const { data } = await axios.get(requests.fetchAllMovies, {
    params: { with_genres: genreId, page: videosPage },
  });

  return data.results;
};

export const fetchGenres = async () => {
  const { data } = await axios.get(requests.fetchMovieGenres);
  return data.genres;
};

export const fetchMovieVideo = async (id) => {
  const { data } = await axios.get(
    `/movie/${id}/videos?api_key=${API_KEY}&language=en-US`
  );

  return data.results;
};

export const fetchSimilarMovies = async (id) => {
  const { data } = await axios.get(
    `/movie/${id}/similar?api_key=${API_KEY}&language=en-US&page=1`
  );

  return data.results;
};

export const fetchMovieDetails = async (id) => {
  const { data } = await axios.get(
    `/movie/${id}?api_key=${API_KEY}&language=en-US`
  );

  return data;
};

//searched movies
export const fetchSearchedMovies = async (value) => {
  const { data } = await axios.get(requests.fetchSearchedMovie, {
    params: { query: value },
  });

  return data.results;
};

//Fetch all data from db
export const fetchDataFromDb = (user, dispatch) => {
  const dbRef = ref(db, `${user?.uid}`);
  onValue(dbRef, (snapshot) => {
    const data = snapshot.val();
    if (data !== null) {
      dispatch(setStoredData(data));
    } else {
      dispatch(setStoredData({}));
    }
  });
};
