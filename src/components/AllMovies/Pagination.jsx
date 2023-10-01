import styles from "../../styles";

import ReactPaginate from "react-paginate";

import { useSearchParams } from "react-router-dom";

const Pagination = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleChange = (event) => {
    const pageNo = event.selected + 1;

    setSearchParams((prevParams) => {
      prevParams.set("page", pageNo);
      return prevParams;
    });
  };

  //get the current page so that we can set the pagination state from our app state using forcepage prop
  const currentPage = searchParams.get("page")
    ? Number(searchParams.get("page")) - 1
    : 0;

  return (
    <>
      <ReactPaginate
        pageCount={500}
        onPageChange={handleChange}
        forcePage={currentPage}
        pageRangeDisplayed={1}
        marginPagesDisplayed={2}
        nextLabel=">"
        previousLabel="<"
        className={`flex  w-full sm:max-w-[550px] h-12 xs:h-14 justify-center items-center bg-slate-200 dark:bg-slate-900 rounded-md font-poppins text-sm font-medium px-4 space-x-1 ss:space-x-2 xs:space-x-3 sm:space-x-4 mx-auto overflow-hidden ${styles.colorsTransition}`}
        pageLinkClassName={`text-xs sm:text-sm py-[1px] xs:py-[2.8px] ${styles.paginateButton} `}
        activeLinkClassName={` 
        bg-slate-800 text-white dark:bg-white dark:text-black  ${styles.colorsTransition}`}
        previousLinkClassName={` text-md xs:text-lg ${styles.paginateButton} `}
        nextLinkClassName={`text-md xs:text-lg ${styles.paginateButton} `}
        breakLinkClassName={`text-sm xs:text-lg px-[2px] sm:px-[5px] rounded-sm hover:bg-slate-700 hover:text-slate-200 hover:dark:bg-slate-200 hover:dark:text-slate-700
        active:bg-slate-900 dark:active:bg-slate-500  ${styles.colorsTransition}`}
      />
    </>
  );
};

export default Pagination;
