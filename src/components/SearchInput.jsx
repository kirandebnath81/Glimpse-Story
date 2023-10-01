import { useRef, useState, useEffect } from "react";
import styles from "../styles";
import { icons } from "../constants";

import Proptypes from "prop-types";
import { useNavigate } from "react-router-dom";

const SearchInput = ({ isSearchInput, closeSearchInput }) => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");

  const inputRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();
    if (!inputValue) return;
    navigate(`/search/?query=${inputValue}`);
  };

  //focus input in small screen on click
  useEffect(() => {
    isSearchInput && inputRef.current.focus();
  }, [isSearchInput]);

  return (
    <form
      className={`${
        isSearchInput ? "w-full flex space-x-2" : "hidden"
      } sm:flex items-center h-[36px] w-full relative`}
      onSubmit={submitHandler}
    >
      {isSearchInput && (
        <div
          className={`basis-9 h-full  flex justify-center items-center text-xl cursor-pointer rounded-full  hover:bg-slate-200 
          active:bg-slate-100
        dark:hover:bg-slate-700 
          dark:active:bg-slate-800
           ${styles.colorsTransition}`}
          onClick={closeSearchInput}
        >
          <icons.backArrow />
        </div>
      )}

      <input
        type="text"
        ref={inputRef}
        placeholder="Search"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className={` 
    
        ${isSearchInput && "w-[88%] ss:flex-1"}
        sm:w-48 sm:focus:w-[275px]  md:focus:w-[350px] h-full outline-none select-none  pl-5 pr-[70px] border-solid border-[1.5px] border-slate-200 dark:border-slate-800  focus:border-sky-300 dark:focus:border-sky-600 dark:bg-slate-800  transition-all ease-out duration-500  rounded-3xl box-border `}
      />

      {inputValue && (
        <div
          className={`w-[30px] h-[30px] absolute right-9 z-10  flex justify-center items-center rounded-full cursor-pointer bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-600 ${styles.transitionAll}`}
          onClick={() => {
            inputRef.current.focus();
            setInputValue("");
          }}
        >
          <icons.cross />
        </div>
      )}
      <div
        className={`w-[30px] h-[30px] flex justify-center items-center cursor-pointer absolute right-[6px] bg-white  dark:bg-slate-800 rounded-full  hover:bg-slate-100 dark:hover:bg-slate-600 ${styles.transitionAll}`}
        onClick={submitHandler}
      >
        <icons.search />
      </div>
    </form>
  );
};

SearchInput.propTypes = {
  isSearchInput: Proptypes.bool,
  closeSearchInput: Proptypes.func,
};

export default SearchInput;
