import styles from "../../styles";

import { useOutsideClick } from "../../custom-hooks";

import { useDispatch, useSelector } from "react-redux";
import { toggleDeleteModal } from "../../features";

import { deleteAll, updateMoviesList } from "../../utils";

const DeleteModal = () => {
  const dispatch = useDispatch();

  const { profile, deleteMoviesList, playlistsMovies, updatedMovies } =
    useSelector((state) => state.user);

  const { data, type, title } = deleteMoviesList;
  const handleModalClose = () => dispatch(toggleDeleteModal(false));

  //close modal
  const elementRef = useOutsideClick(handleModalClose);

  //delete movies
  const deleteHandler = () => {
    if (
      type === "watchLaterMovies" ||
      type === "likedMovies" ||
      type === "playlistsMovies" ||
      type === "historyMovies"
    ) {
      deleteAll(type, profile.uid);
    } else {
      //for deleting each playlist movies
      deleteAll(type, profile.uid, playlistsMovies);
    }

    type !== "historyMovies" &&
      updateMoviesList(updatedMovies, data, type, profile.uid);
    handleModalClose();
  };

  return (
    <div className="fixed z-40 w-full h-screen bg-slate-950/90 dark:bg-slate-800/80 flex items-center justify-center">
      <div
        className="w-[90%] max-w-[450px] h-60 py-5 px-4 ss:p-6  bg-slate-50 dark:bg-slate-950 
        dark:text-slate-50 
        rounded-lg font-poppins flex flex-col justify-between relative z-50"
        ref={elementRef}
      >
        <div className="font-semibold tracking-wide dark:text-slate-50 text-sm xs:text-base text-slate-700">
          CLEAR {title.toUpperCase()} MOVIES ?
        </div>
        <div className="text-sm xs:text-base dark:text-slate-50">
          <div>{profile.name}</div>
          <div className="text-xs xs:text-[15px] dark:text-slate-200 text-slate-700">
            ({profile.email})
          </div>
        </div>
        <p className="text-[13px] xs:text-[15px] text-slate-600 dark:text-slate-300">
          Your Glimpse Story {title} movies will be cleared forever , do you
          want to do it ?
        </p>

        <div className="flex justify-end space-x-4 text-[15px] font-medium">
          <button className={styles.cancelBtn} onClick={handleModalClose}>
            Cancel
          </button>
          <button
            className="px-[10px] xs:px-4 py-1 xs:py-[5px] rounded-[4px] xs:rounded-md text-xs xs:text-sm font-medium text-white
              bg-rose-600  hover:bg-rose-500  active:bg-rose-600 transition-colors duration-300"
            onClick={deleteHandler}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
