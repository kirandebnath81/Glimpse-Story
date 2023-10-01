import { useState, useEffect, useRef } from "react";

import PropTypes from "prop-types";
import styles from "../../../styles";
import { v4 } from "uuid";

import { useDispatch, useSelector } from "react-redux";
import { setEditedCommentId } from "../../../features";

import { updateMovie, updateWatchMovie } from "../../../utils";

const CommentInput = ({ data, type, editedComment }) => {
  const dispatch = useDispatch();

  const { profile, updatedMovies } = useSelector((state) => state.user);

  const [inputValue, setInputValue] = useState(editedComment?.comment || "");
  const [isButtons, setIsButtons] = useState(false);

  const inputRef = useRef();

  //focus input for edit comment when opened
  useEffect(() => {
    type === "edit" && inputRef.current.focus();
  }, [type]);

  //close edit comment
  const handleCloseEdit = () => dispatch(setEditedCommentId(""));

  //cancel comment input
  const cancelHandler = () => {
    if (type === "create") {
      setInputValue("");
      setIsButtons(false);
    } else {
      handleCloseEdit();
    }
  };

  //check whether comment is edited or not
  const handleCheckEdit = () => {
    if (type !== "edit") return;
    const getLength = (str) => str.replace(/\s/g, "").length;
    return getLength(editedComment?.comment) === getLength(inputValue);
  };

  const submitHandler = () => {
    //when edit comment is left not edited
    if (handleCheckEdit()) {
      handleCloseEdit();
      return;
    }

    let newMovie;

    if (type === "create") {
      const newComment = {
        userEmail: profile.email,
        comment: inputValue.trim(),
        id: v4(),
      };

      const oldComments = data.comments ? data.comments : [];

      newMovie = {
        ...data,
        comments: [newComment, ...oldComments],
      };
      setIsButtons(false);
      setInputValue("");
    } else {
      newMovie = {
        ...data,
        comments: data.comments.map((commentInfo) =>
          commentInfo.id === editedComment.id
            ? { ...commentInfo, comment: inputValue }
            : commentInfo
        ),
      };
      handleCloseEdit();
    }

    //update the watch movie
    updateWatchMovie(newMovie, profile.uid);

    //update in the db
    updateMovie(updatedMovies, newMovie, profile.uid);
  };

  //relevent button title
  const buttonTitle = type === "create" ? "Comment" : "Save";

  return (
    <div className="flex-1">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        ref={inputRef}
        onFocus={() => setIsButtons(true)}
        placeholder="Add a Comment..."
        className="w-full h-9 text-sm xs:text-base bg-transparent border-solid border-b-[1px] focus:border-b-2
      border-slate-500 dark:border-slate-300  outline-none select-none transition-all 
      ease-in duration-150"
      />

      {isButtons && (
        <div className="flex justify-end items-center space-x-3 mt-4">
          <button onClick={cancelHandler} className={styles.cancelBtn}>
            Cancel
          </button>

          {inputValue ? (
            <button
              onClick={submitHandler}
              className={`px-[10px] xs:px-4 py-1 xs:py-[5px] rounded-[4px]  xs:rounded-md text-xs xs:text-sm font-medium transition-colors duration-300 text-slate-50 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 dark:active:bg-blue-700 ${
                type === "edit" && handleCheckEdit() && "opacity-75"
              }`}
            >
              {buttonTitle}
            </button>
          ) : (
            <button
              disabled
              className="px-[10px] xs:px-4 py-1 xs:py-[5px] rounded-sm xs:rounded-md  text-xs xs:text-sm font-medium transition-colors duration-300 bg-slate-200 dark:bg-slate-600 text-slate-800 dark:text-slate-100 disabled:cursor-not-allowed disabled:opacity-80"
            >
              {buttonTitle}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

CommentInput.propTypes = {
  data: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  editedComment: PropTypes.object,
};

export default CommentInput;
