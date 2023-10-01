import { useRef, useState, useEffect } from "react";
import styles from "../../styles";
import { icons } from "../../constants";

import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

import { fetchGenres } from "../../utils";

const Genres = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const genreId = Number(searchParams.get("genreId"));

  const [isGenreSelcted, setIsGenreSelcted] = useState(genreId || false);

  const [scrlElement, setScrlElement] = useState(null);
  const [scrollX, setScrollX] = useState(0);
  const [scrollEnd, setScrollEnd] = useState(false);

  const scrl = useRef();

  //set the element ref
  useEffect(() => {
    setScrlElement(scrl.current);
  }, []);

  //fetch generes data
  const { isError, error, data } = useQuery({
    queryKey: ["movies", "genres"],
    queryFn: fetchGenres,
  });

  if (isError) {
    return <div>{error.message}</div>;
  }

  //onscroll event handler
  const scrollHandler = () => {
    const { scrollWidth, offsetWidth, scrollLeft } = scrlElement;
    //setting the left scroll for hiding the prev scroll btn when scrollLeft is 0
    setScrollX(scrollLeft);

    //when the offsetWidth and scrollLeft together becomes more than or equavalent of the total width of the scrollbar i.e scrollWidth then the end of the scrollbar have been reached.
    if (Math.ceil(scrollLeft) + offsetWidth >= scrollWidth) {
      setScrollEnd(true);
    } else {
      setScrollEnd(false);
    }
  };

  //scrolling the bar
  const scroll = (shift) => (scrlElement.scrollLeft += shift);

  //set genre
  const genreHandler = (id) => {
    const param = id ? { genreId: id } : "";
    setSearchParams(param);
    setIsGenreSelcted(id ? true : false);
  };

  const selectGenre = (id) => genreHandler(id);

  const unselectGenre = (id) => {
    genreHandler(id);
    scrlElement.scrollLeft = 0;
  };

  return (
    <div
      className={`fixed top-[75px] left-0 z-10 pl-0 sm:pl-20 w-full h-16 bg-white dark:bg-slate-900 ${styles.transitionAll} shadow-sm flex items-center border-none dark:border-solid border-t-2 border-slate-800`}
    >
      <div className="w-[95%] h-auto flex items-center mx-auto space-x-2 xs:space-x-3">
        {scrollX !== 0 && (
          <div
            className="h-full text-2xl xs:text-3xl cursor-pointer"
            onClick={() => scroll(-100)}
          >
            <icons.arrowLeft />
          </div>
        )}

        <div
          className={`flex items-center space-x-[10px] xs:space-x-4 overflow-x-scroll scrollbar`}
          ref={scrl}
          onScroll={scrollHandler}
        >
          <div
            className={`px-2 xs:px-3 py-[2px] xs:py-[3px] rounded-[4px] xs:rounded-md whitespace-nowrap font-poppins text-xs xs:text-sm font-medium cursor-pointer select-none
              ${styles.colorsTransition}
              ${
                !isGenreSelcted
                  ? "bg-slate-700 text-slate-100 dark:bg-slate-100 dark:text-slate-700"
                  : "bg-slate-200 dark:bg-slate-700  text-slate-700 dark:text-slate-200"
              } `}
            onClick={() => selectGenre("")}
          >
            All
          </div>

          {data?.map(({ name, id }) =>
            genreId === id ? (
              <div
                key={id}
                className={`bg-slate-700 dark:bg-slate-100  text-slate-100 dark:text-slate-700 px-2 xs:px-3 py-[2px] xs:py-[3px] rounded-[4px] xs:rounded-md whitespace-nowrap font-poppins text-xs xs:text-sm font-medium cursor-pointer select-none
               ${styles.colorsTransition}`}
                onClick={() => unselectGenre("")}
              >
                {name}
              </div>
            ) : (
              <div
                key={id}
                className={` bg-slate-200 dark:bg-slate-700  text-slate-700 dark:text-slate-200 px-2 xs:px-3 py-[2px] xs:py-[3px]  rounded-[4px] xs:rounded-md whitespace-nowrap font-poppins text-xs xs:text-sm font-medium cursor-pointer select-none
                ${styles.colorsTransition}`}
                onClick={() => selectGenre(id)}
              >
                {name}
              </div>
            )
          )}
        </div>

        {!scrollEnd && (
          <div
            className="h-full text-2xl xs:text-3xl cursor-pointer"
            onClick={() => scroll(100)}
          >
            <icons.arrowRight />
          </div>
        )}
      </div>
    </div>
  );
};

export default Genres;
