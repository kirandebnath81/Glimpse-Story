import { useEffect, useState } from "react";
import styles from "../styles";
import { icons } from "../constants";

const ThemeToggler = () => {
  const [theme, setTheme] = useState(
    window.localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      window.localStorage.setItem("theme", theme);
    } else {
      document.documentElement.classList.remove("dark");
      window.localStorage.removeItem("theme");
    }
  }, [theme]);

  return (
    <div
      className={`p-[5px] ss:p-2  rounded-full cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700 active:bg-slate-300 dark:active:bg-slate-800 ${styles.colorsTransition}`}
      onClick={() => setTheme((prev) => (prev === "light" ? "dark" : "light"))}
    >
      {theme === "light" ? (
        <div className="transition-transform duration-[1800ms] delay-300 ">
          <icons.moon className="text-[15px] ss:text-lg sm:text-[22px]" />
        </div>
      ) : (
        <div className="rotate-[360deg] transition-transform duration-[1800ms]  delay-300 ">
          <icons.sun className="text-lg sm:text-[22px]" />
        </div>
      )}
    </div>
  );
};

export default ThemeToggler;
