import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AllowedWhenNotAuth = () => {
  const { profile } = useSelector((state) => state.user);

  if (profile?.uid) {
    return <Navigate to={"/"} replace={true} />;
  }

  return <Outlet />;
};

export default AllowedWhenNotAuth;
