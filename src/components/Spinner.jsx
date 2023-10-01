import styles from "../styles";

import DotLoader from "react-spinners/DotLoader";

const Spinner = () => (
  <div className={`${styles.mainBody} flex justify-center items-center`}>
    <DotLoader color="#24dcf8" size={65} speedMultiplier={1.5} />
  </div>
);

export default Spinner;
