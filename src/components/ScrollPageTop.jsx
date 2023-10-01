import { useState, useEffect } from "react";
import { icons } from "../constants";

import { scrollToTop } from "../utils";

const ScrollPageTop = () => {
  const [isView, setIsView] = useState(false);

  useEffect(() => {
    const scrolllHandler = () => {
      if (window.scrollY > 500) {
        setIsView(true);
      } else {
        setIsView(false);
      }
    };

    window.addEventListener("scroll", scrolllHandler);

    return () => {
      window.addEventListener("scroll", scrolllHandler);
    };
  }, []);

  if (!isView) return;

  return (
    <div
      className={`fixed right-12 sm:right-20 z-50  text-base w-8 h-8 flex justify-center items-center rounded-full cursor-pointer text-white  bg-slate-800 
      dark:bg-slate-500 bg-opacity-60 dark:bg-opacity-60 active:bg-opacity-90 dark:active:bg-opacity-90 transition-all duration-300 
       ${isView ? "bottom-[105px] sm:bottom-20" : "bottom-[-120px]"}`}
      onClick={scrollToTop}
    >
      <icons.arrowUp />
    </div>
  );
};

export default ScrollPageTop;
