import styles from "../styles";
import { images } from "../constants";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <div
      className={`w-full min-h-screen  font-poppins bg-gray-50 dark:bg-slate-800 dark:text-white ease-out  flex flex-col md:flex-row justify-center items-center  space-y-14 sm:space-x-20 px-10 pb-14 sm:py-0 transition-colors duration-300 `}
    >
      <div className="basis-[50%] min-w-[250px] max-w-[500px]">
        <img className="p-5 sm:p-0 " src={images.errorPageImg} alt="error" />
      </div>
      <div className="basis-[40%] space-y-5">
        <div className="font-medium text-lg ss:text-[22px] sm:text-3xl whitespace-nowrap">
          We have looked everywhere
        </div>
        <div className="text-base ss:text-[19px] sm:text-2xl">
          Looks like the page is missing
        </div>
        <button
          onClick={() => navigate("/")}
          className={`px-4 py-1 rounded-md bg-sky-600 hover:bg-sky-500 active:bg-sky-600 text-white ${styles.colorsTransition} text-sm xs:text-base`}
        >
          Go to home page
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
