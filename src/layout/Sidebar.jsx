import styles from "../styles";
import { navLinks } from "../constants";

import { CustomNavLink } from "../components";

const Sidebar = () => {
  return (
    <nav
      className={`fixed sm:left-0 sm:top-[75px] bottom-0 z-10  sm:w-20 w-full sm:h-screen h-[75px] bg-white ${styles.darkNavbar} ${styles.colorsTransition} flex justify-between sm:justify-start sm:flex-col  items-center  shadow-navbar space-y-0 sm:space-y-2 space-x-2 sm:space-x-0`}
    >
      {navLinks.map((link) => (
        <div key={link.id} className="w-full h-full sm:w-full sm:h-20">
          <CustomNavLink link={link} />
        </div>
      ))}
    </nav>
  );
};

export default Sidebar;
