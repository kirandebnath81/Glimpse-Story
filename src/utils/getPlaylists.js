const getPlaylists = (playlistsMovies) => {
  const playlistNames = playlistsMovies.map((list) => list.name);

  let playlists = {};
  playlistNames.forEach((name) => {
    playlists = { ...playlists, [name]: false };
  });

  return playlists;
};

export default getPlaylists;
