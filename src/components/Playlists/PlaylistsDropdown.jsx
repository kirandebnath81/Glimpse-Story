import { useState } from "react";
import PropTypes from "prop-types";
import styles from "../../styles";
import { icons } from "../../constants";

import { useDispatch } from "react-redux";
import { setDeleteMoviesList, toggleDeleteModal } from "../../features";

import { useOutsideClick } from "../../custom-hooks";

const PlaylistsDropdown = ({ data }) => {
  const dispatch = useDispatch();

  const [isDropdown, setIsDropdown] = useState(false);

  //close dropdown hook
  const elementRef = useOutsideClick(() => setIsDropdown(false));

  const deleteHandler = () => {
    setIsDropdown(false);
    dispatch(toggleDeleteModal(true));
    dispatch(
      setDeleteMoviesList({
        data: data.movies,
        type: data.name,
        title: data.title,
      })
    );
  };

  if (isDropdown) {
    return (
      <div ref={elementRef} className="w-full h-full">
        <div
          className={styles.dropdownMenu}
          onClick={() => setIsDropdown(false)}
        >
          <icons.dotMenu />
        </div>

        <div
          className={`absolute top-9 right-0 z-[5] bg-slate-200 dark:bg-slate-700 rounded-lg overflow-hidden ${styles.colorsTransition} dropdown`}
        >
          <div className={`${styles.dropdownBtn}`} onClick={deleteHandler}>
            <div className="mr-2 text-lg">
              <icons.delete />
            </div>
            <div className="text-sm font-medium ">
              CLEAR {data.title.toUpperCase()}
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles.dropdownMenu} onClick={() => setIsDropdown(true)}>
        <icons.dotMenu />
      </div>
    );
  }
};

PlaylistsDropdown.propTypes = {
  data: PropTypes.object.isRequired,
};

export default PlaylistsDropdown;
