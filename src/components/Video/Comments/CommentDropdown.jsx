import { useState } from "react";

import PropTypes from "prop-types";
import styles from "../../../styles";

import { icons } from "../../../constants";
//import { useAuthState } from "react-firebase-hooks/auth";

import { useDispatch, useSelector } from "react-redux";
import { setEditedCommentId } from "../../../features";

import { useOutsideClick } from "../../../custom-hooks";

import { updateMovie, updateWatchMovie } from "../../../utils";

const CommentDropdown = ({ data, id }) => {
  const dispatch = useDispatch();

  const { profile, updatedMovies } = useSelector((state) => state.user);

  const [isDropdown, setIsDropdown] = useState(false);

  const elementRef = useOutsideClick(() => setIsDropdown(false));

  if (!isDropdown) {
    return (
      <div
        className={`w-full h-full text-lg rounded-[4px] flex items-center justify-center cursor-pointer active:bg-slate-600 ${styles.colorsTransition}`}
        onClick={() => setIsDropdown(true)}
      >
        <icons.dotMenu />
      </div>
    );
  }

  const deleteHandler = () => {
    const newMovie = {
      ...data,
      comments: data.comments.filter((commentInfo) => commentInfo.id !== id),
    };
    //update selected movie
    updateWatchMovie(newMovie, profile.uid);

    //update in the db
    updateMovie(updatedMovies, newMovie, profile.uid);
  };

  const editHandler = () => {
    setIsDropdown(false);
    dispatch(setEditedCommentId({ id }));
  };

  return (
    <div ref={elementRef} className="w-full h-full">
      <div
        className={`w-full h-full text-lg rounded-[4px] flex items-center justify-center cursor-pointer active:bg-slate-600 ${styles.colorsTransition}`}
        onClick={() => setIsDropdown(false)}
      >
        <icons.dotMenu />
      </div>

      <div
        className={`absolute top-10 right-2 z-[5] bg-slate-200 dark:bg-slate-700 rounded-lg overflow-hidden ${styles.colorsTransition} dropdown`}
      >
        <div className={`${styles.dropdownBtn}`} onClick={editHandler}>
          <div className="mr-2 text-lg">
            <icons.edit />
          </div>
          <div className="text-sm font-medium">Edit</div>
        </div>
        <div className={`${styles.dropdownBtn}`} onClick={deleteHandler}>
          <div className="mr-2 text-lg">
            <icons.delete />
          </div>
          <div className="text-sm font-medium ">Delete</div>
        </div>
      </div>
    </div>
  );
};

CommentDropdown.propTypes = {
  data: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
};

export default CommentDropdown;
