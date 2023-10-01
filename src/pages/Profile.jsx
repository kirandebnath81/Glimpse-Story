import { useState } from "react";
import styles from "../styles";

import ClipLoader from "react-spinners/ClipLoader";

import { signOut } from "firebase/auth";
import { auth } from "../constants";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setStoredData } from "../features";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { profile } = useSelector((state) => state.user);

  const [isLoading, setIsLoading] = useState(false);

  const handleSignout = async () => {
    setIsLoading(true);
    try {
      await signOut(auth);
      navigate("/");
      dispatch(
        setStoredData({
          profile: {},
          playlistsMovies: [],
          watchLaterMovies: [],
          likedMovies: [],
          historyMovies: [],
          updatedMovies: [],
          selectedMovie: {},
          watchMovie: null,
          deleteMoviesList: {},
          editedCommentId: "",
        })
      );
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`${styles.mainBody} flex flex-col justify-center items-center font-poppins pt-28`}
    >
      <div
        className={`w-full xs:w-[90%] h-48 max-w-[450px] px-[15px] ss:px-7 xs:px-10 rounded-xl bg-white dark:bg-slate-900 flex flex-col  space-y-3  shadow-formShadow ${styles.colorsTransition} relative pt-10`}
      >
        <div>
          <span className="opacity-60">Name : </span> {profile?.name}
        </div>
        <div>
          <span className="opacity-60">Email : </span>
          {profile?.email}
        </div>
        <button
          onClick={handleSignout}
          className={`w-[70px] flex justify-center items-center ss:w-[85px] h-7 ss:h-8 text-xs ss:text-sm rounded-[5px] bg-slate-200 hover:bg-slate-300 active:bg-slate-400 dark:bg-slate-700 dark:hover:bg-slate-600 dark:active:bg-slate-800 absolute bottom-7 right-6 font-medium ${styles.colorsTransition}`}
        >
          {isLoading ? <ClipLoader color="#2779bd" size={23} /> : "Sign Out"}
        </button>
      </div>
    </div>
  );
};

export default Profile;
