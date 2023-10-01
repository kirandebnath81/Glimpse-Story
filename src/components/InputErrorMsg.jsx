import { icons } from "../constants";

import PropTypes from "prop-types";

const InputErrorMsg = ({ message }) => {
  return (
    <div className="flex items-center mt-1 text-red-500">
      <icons.error />
      <span className="ml-1 font-light text-sm">{message}</span>
    </div>
  );
};

InputErrorMsg.propTypes = {
  message: PropTypes.string.isRequired,
};

export default InputErrorMsg;
