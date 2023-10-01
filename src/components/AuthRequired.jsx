import styles from "../styles";
import { auth } from "../constants";
import { useAuthState } from "react-firebase-hooks/auth";

import { Navigate, Outlet, useLocation } from "react-router-dom";

const AuthRequired = () => {
  const [user, isLoading] = useAuthState(auth);
  const { pathname } = useLocation();

  if (isLoading) {
    return (
      <div
        className={`${styles.mainBody} flex justify-center items-center text-xl xs:text-2xl font-medium`}
      >
        Initialising User..
      </div>
    );
  }

  if (!user) {
    return (
      <Navigate
        to={"/signin/?message=You must sign in first"}
        state={pathname}
        replace={true}
      />
    );
  }

  return <Outlet />;
};

export default AuthRequired;
