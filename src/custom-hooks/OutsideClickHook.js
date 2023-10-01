import { useEffect, useRef } from "react";

const useOutsideClick = (handleClose) => {
  const elementRef = useRef();

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (elementRef.current && !elementRef.current.contains(event.target)) {
        handleClose();
      }
    };

    window.addEventListener("mousedown", handleOutsideClick);

    return () => {
      window.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [handleClose]);

  return elementRef;
};

export default useOutsideClick;
