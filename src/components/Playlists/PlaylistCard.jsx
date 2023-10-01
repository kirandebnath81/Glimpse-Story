import { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { imgBaseUrl, icons } from "../../constants";

import PlaylistsDropdown from "./PlaylistsDropdown";
import MovieCard from "../MovieCard";

const PlaylistCard = ({ data, selectedList }) => {
  const [isOpenPlaylist, setIsOpenPlaylist] = useState(false);

  useEffect(() => {
    setIsOpenPlaylist(false);
  }, [selectedList]);

  const standardTitle =
    data?.title.slice(0, 1).toUpperCase() + data?.title.slice(1);

  if (isOpenPlaylist) {
    return (
      <div>
        <div className="mb-8">
          <div className="font-medium text-lg tracking-wide opacity-95 mb-1">
            {standardTitle} playlist
          </div>
          <div className="opacity-80 text-sm">
            You have total {data?.movies?.length} movie
          </div>
        </div>
        <div className="flex flex-wrap justify-between md:justify-start gap-y-12 gap-x-1 md:gap-x-6">
          {data?.movies?.map((movie) => (
            <MovieCard key={movie?.id} data={movie} type={data?.name} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full xs:w-[380px]">
      <div
        className="w-full h-[185px] ss:h-56 rounded-lg overflow-hidden relative cursor-pointer"
        onClick={() => setIsOpenPlaylist(true)}
      >
        <img
          src={imgBaseUrl + data?.movies[0]?.backdrop_path}
          alt="poster"
          className="w-full h-full object-cover"
        />
        <div className="w-[50%] xs:w-[190px] h-full  absolute top-0 right-0 bg-black opacity-70"></div>

        <div className="w-[50%] xs:w-[190px] h-full absolute top-0 right-0 bg-transparent flex flex-col justify-center items-center text-3xl">
          {data?.movies?.length}
          <icons.playlist />
        </div>
      </div>

      <div className="w-full flex justify-between items-center mt-3">
        <div className="font-medium text-[17px] sm:text-lg opacity-95 basis-[90%]">
          {standardTitle}
        </div>

        {/*Dropdown menu*/}
        <div className="basis-6 h-7 relative">
          <PlaylistsDropdown data={data} />
        </div>
      </div>
    </div>
  );
};

PlaylistCard.propTypes = {
  data: PropTypes.object.isRequired,
  selectedList: PropTypes.string.isRequired,
};

export default PlaylistCard;
