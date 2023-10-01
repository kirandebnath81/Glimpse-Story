import {
  AiOutlineUser,
  AiOutlineHome,
  AiFillHome,
  AiOutlineLike,
  AiFillLike,
  AiOutlinePlus,
  AiOutlineLogin,
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineDelete,
} from "react-icons/ai";

import {
  MdPlaylistAdd,
  MdFeaturedPlayList,
  MdOutlineWatchLater,
  MdWatchLater,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdOutlineErrorOutline,
} from "react-icons/md";

import { BsFillSunFill } from "react-icons/bs";
import { FaMoon, FaUser } from "react-icons/fa";
import { BiSearch } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";
import { HiDotsVertical } from "react-icons/hi";
import { TbShare3 } from "react-icons/tb";
import { FiEdit } from "react-icons/fi";
import { IoArrowBackOutline, IoArrowUpOutline } from "react-icons/io5";
import { RiChatHistoryLine, RiChatHistoryFill } from "react-icons/ri";

const icons = {
  sun: BsFillSunFill,
  moon: FaMoon,
  search: BiSearch,
  cross: RxCross2,
  user: AiOutlineUser,
  userFill: FaUser,
  backArrow: IoArrowBackOutline,
  home: AiOutlineHome,
  homeFill: AiFillHome,
  playlist: MdPlaylistAdd,
  playlistFill: MdFeaturedPlayList,
  watchLater: MdOutlineWatchLater,
  watchLaterFill: MdWatchLater,
  like: AiOutlineLike,
  likeFill: AiFillLike,
  history: RiChatHistoryLine,
  historyFill: RiChatHistoryFill,
  dotMenu: HiDotsVertical,
  arrowLeft: MdKeyboardArrowLeft,
  arrowRight: MdKeyboardArrowRight,
  share: TbShare3,
  plus: AiOutlinePlus,
  signIn: AiOutlineLogin,
  eye: AiOutlineEye,
  eyeInvisible: AiOutlineEyeInvisible,
  error: MdOutlineErrorOutline,
  delete: AiOutlineDelete,
  arrowUp: IoArrowUpOutline,
  edit: FiEdit,
};

export default icons;
