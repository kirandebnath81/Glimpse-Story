import { useState, useEffect } from "react";

import styles from "../styles";
import { auth, icons } from "../constants";

import { Link } from "react-router-dom";

import { ThemeToggler, SearchInput } from "../components";
import { useAuthState } from "react-firebase-hooks/auth";

const Navbar = () => {
  const [user] = useAuthState(auth);
  const [isSearchInput, setIsSearchInput] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 650) {
        setIsSearchInput(false);
      }
    };

    window.addEventListener("resize", handleResize);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 z-20 w-full h-[75px] flex justify-between items-center px-[10px] xs:px-4 sm:px-6 shadow-navbar font-poppins bg-white ${styles.darkNavbar} ${styles.colorsTransition}`}
    >
      {isSearchInput ? (
        <div className="flex-1 ">
          <SearchInput
            isSearchInput={isSearchInput}
            closeSearchInput={() => setIsSearchInput(false)}
          />
        </div>
      ) : (
        <>
          <Link to={"/"}>
            <div className="text-[18px] ss:text-[21px] sm:text-2xl font-medium whitespace-nowrap">
              Glimpse Story
            </div>
          </Link>

          <div className="flex justify-end items-center space-x-2 sm:space-x-4 ml-2 xs:ml-8">
            <div className="flex-1">
              <SearchInput />

              <div
                className={`sm:hidden block  text-[18px] ss:text-xl p-[5px] ss:p-2 rounded-full cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700
                active:bg-slate-300
                dark:active:bg-slate-800
                 ${styles.colorsTransition}`}
                onClick={() => setIsSearchInput(true)}
              >
                <icons.search />
              </div>
            </div>

            <div>
              <ThemeToggler />
            </div>

            {user ? (
              <Link to={"/profile"}>
                <div
                  className={`text-xl sm:text-2xl p-2 rounded-full cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700
              active:bg-slate-300
              dark:active:bg-slate-800
               ${styles.colorsTransition}`}
                >
                  <icons.user />
                </div>
              </Link>
            ) : (
              <Link to={"/signin"}>
                <div className="flex items-center text-xs ss:text-sm sm:text-[15px] bg-slate-200 hover:bg-slate-300 active:bg-slate-200 dark:bg-slate-600 dark:hover:bg-slate-500 dark:active:bg-slate-600 px-[6px] ss:px-2 xs:px-3 py-1 sm:py-[6px] rounded-[4px] xs:rounded-md select-none cursor-pointer  transition-colors duration-300 whitespace-nowrap">
                  Sign In
                </div>
              </Link>
            )}
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;
