import { useEffect } from "react";
//toast
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../constants";

import { Outlet, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { fetchDataFromDb } from "../utils";

//components
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { DeleteModal, SaveModal, ScrollPageTop } from "../components";

const Layout = () => {
  const dispatch = useDispatch();
  const [user] = useAuthState(auth);
  const { pathname, search } = useLocation();

  const { isSaveModal, isDeleteModal } = useSelector((state) => state.modal);

  //Reading all the data from firebase database
  useEffect(() => {
    if (user?.uid) {
      fetchDataFromDb(user, dispatch);
    }
  }, [user, dispatch]);

  //scrolling the window to top on path change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname, search]);

  return (
    <div>
      {isSaveModal && <SaveModal />}
      {isDeleteModal && <DeleteModal />}
      <ToastContainer
        position="bottom-right"
        autoClose={1000}
        theme={"colored"}
      />
      <ScrollPageTop />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Sidebar />
    </div>
  );
};

export default Layout;
