import icons from "./icons";

const navLinks = [
  { title: "Home", icon: icons.home, activeIcon: icons.homeFill, id: "movies" },
  {
    title: "Playlists",
    icon: icons.playlist,
    activeIcon: icons.playlistFill,
    id: "playlists",
  },
  {
    title: "WatchLater",
    icon: icons.watchLater,
    activeIcon: icons.watchLaterFill,
    id: "watchLater",
  },
  { title: "Liked", icon: icons.like, activeIcon: icons.likeFill, id: "liked" },
  {
    title: "History",
    icon: icons.history,
    activeIcon: icons.historyFill,
    id: "history",
  },
];

export default navLinks;
