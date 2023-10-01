import styles from "../styles";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

const CustomNavLink = ({ link }) => {
  return (
    <NavLink to={`${link.id === "movies" ? "/" : "/" + link.id}`}>
      {({ isActive }) =>
        isActive ? (
          <div
            className={`w-full h-full flex flex-col justify-center items-center space-y-1 hover:bg-slate-100 dark:hover:bg-slate-800 active:bg-slate-300 dark:active:bg-slate-900 ${styles.colorsTransition}`}
          >
            <div className="text-xl sm:text-2xl">
              <link.activeIcon />
            </div>

            <div className="text-[10px] sm:text-[11px] text-slate-950 dark:text-slate-200">
              {link.title}
            </div>
          </div>
        ) : (
          <div
            className={`w-full h-full flex flex-col justify-center items-center hover:bg-slate-100 dark:hover:bg-slate-800 active:bg-slate-300 dark:active:bg-slate-900 ${styles.colorsTransition}`}
          >
            <div className="text-xl sm:text-2xl">
              <link.icon />
            </div>

            <div className="text-[9px] sm:text-[10px] text-slate-950 dark:text-slate-200">
              {link.title}
            </div>
          </div>
        )
      }
    </NavLink>
  );
};

CustomNavLink.propTypes = {
  link: PropTypes.object.isRequired,
};

export default CustomNavLink;
