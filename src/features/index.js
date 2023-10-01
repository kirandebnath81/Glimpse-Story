//modal
export { default as modalReducer } from "./modal/modalSlice";
export { toggleSaveModal, toggleDeleteModal } from "./modal/modalSlice";

//movies
export { default as userReducer } from "./user/userSlice";
export {
  setStoredData,
  setSelectedMovie,
  updateSelectedMovie,
  setDeleteMoviesList,
  setEditedCommentId,
} from "./user/userSlice";
