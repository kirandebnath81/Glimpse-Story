import { v4 } from "uuid";
import getPlaylists from "./getPlaylists";

const addedMovieData = (playlistsMovies, movie) => {
  const allPlaylists = getPlaylists(playlistsMovies);

  const data = {
    playlists: { watchLater: false, ...allPlaylists },
    isLiked: false,
    comments: getComments(movie),
  };

  return data;
};

const getComments = (movie) => {
  const comments = [
    {
      userEmail: "saharohit05@gmail.com",
      comment: "I loved it,it's going to rock",
      id: v4(),
    },
    {
      userEmail: "pranjitdas31@gmail.com",
      comment: "This movie is a 10/10. It exceeded my expectations",

      id: v4(),
    },
    {
      userEmail: "preetyNath85@gmail.com",
      comment: "Eagerly waiting for the movie..",

      id: v4(),
    },
    {
      userEmail: "mdimran073@gmail.com",
      comment: "Lovely, Really enjoyed",
      id: v4(),
    },
    {
      userEmail: "royshani65@gmail.com",
      comment:
        "You know it's a good movie when you rewatching the trailer after seeing the movie",

      id: v4(),
    },
    {
      userEmail: "nathbappan25@gmail.com",
      comment: "The emotions, the actions, the storyline..just amazing",

      id: v4(),
    },
    {
      userEmail: "bosepapai77@gmail.com",
      comment: "This movie is a masterpiece ",

      id: v4(),
    },
    {
      userEmail: "dewrimamli55@gmail.com",
      comment: "Eagerly waiting for the movie..",

      id: v4(),
    },
    {
      userEmail: "rajatkumar55@gmail.com",
      comment: "What a perfect cinematography.",
      id: v4(),
    },
    {
      userEmail: "kirandebnath71@gmail.com",
      comment: "What an awesome film! And the fighting scenes were AMAZING!!!",
      id: v4(),
    },
  ];

  const movieLike = movie?.vote_count;

  if (movieLike <= 100) {
    return [];
  } else if (movieLike > 100 && movieLike <= 500) {
    return comments.slice(0, 1);
  } else if (movieLike > 500 && movieLike <= 1000) {
    return comments.slice(1, 3);
  } else if (movieLike > 1000 && movieLike <= 1500) {
    return comments.slice(3, 6);
  } else if (movieLike > 1500 && movieLike <= 2000) {
    return comments.slice(6, 10);
  } else if (movieLike > 2000 && movieLike <= 3000) {
    return comments.slice(2, 7);
  } else if (movieLike > 3000 && movieLike <= 5000) {
    return comments.slice(5);
  } else if (movieLike > 5000 && movieLike <= 7000) {
    return comments.slice(0, 7);
  } else if (movieLike > 7000 && movieLike <= 10000) {
    return comments.slice(1, 9);
  } else if (movieLike > 10000 && movieLike <= 15000) {
    return comments.slice(0, 9);
  } else {
    return comments;
  }
};

export default addedMovieData;
