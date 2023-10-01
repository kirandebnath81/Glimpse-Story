import { images } from "../constants";

import PropTypes from "prop-types";

import { useNavigate } from "react-router-dom";

const EmptyList = ({ imgName, message }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-start  w-[95%] max-w-[500px]">
      <div className="w-full max-w-[300px]">
        <img
          src={images[imgName]}
          alt="playlist"
          className="w-full object-cover mb-8"
        />
      </div>

      <div className="mb-6 text-sm ss:text-base xs:text-lg font-medium text-center">
        {message}
      </div>
      <button
        className="px-[10px] xs:px-4 py-1 xs:py-[5px] rounded-[4px] xs:rounded-[5px] text-xs xs:text-sm font-medium text-slate-900
         bg-cyan-400  hover:bg-cyan-500  active:bg-cyan-400 transition-colors duration-300"
        onClick={() => navigate("/")}
      >
        Explore
      </button>
    </div>
  );
};

EmptyList.propTypes = {
  imgName: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};

export default EmptyList;
