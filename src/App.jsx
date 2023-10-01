import { Suspense, lazy } from "react";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Layout from "./layout/Layout";
import Movies from "./pages/Movies";
import { Spinner } from "./components";

//dynamically loading components
const WatchMovie = lazy(() => import("./pages/WatchMovie.jsx"));
const WatchLater = lazy(() => import("./pages/WatchLater"));
const Liked = lazy(() => import("./pages/Liked"));
const History = lazy(() => import("./pages/History"));
const Playlists = lazy(() => import("./pages/Playlists"));
const SearchedMovies = lazy(() => import("./pages/SearchedMovies"));
const Profile = lazy(() => import("./pages/Profile"));
const SignIn = lazy(() => import("./pages/Auth/SignIn"));
const SignUp = lazy(() => import("./pages/Auth/SignUp"));
const ErrorPage = lazy(() => import("./pages/ErrorPage"));
const AuthRequired = lazy(() => import("./components/AuthRequired"));
const AllowedWhenNotAuth = lazy(() =>
  import("./components/AllowedWhenNotAuth")
);

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Movies />} />
          <Route
            path="watch/:id"
            element={
              <Suspense fallback={<Spinner />}>
                <WatchMovie />
              </Suspense>
            }
          />
          <Route
            path="search"
            element={
              <Suspense fallback={<Spinner />}>
                <SearchedMovies />
              </Suspense>
            }
          />
          <Route
            element={
              <Suspense fallback={<Spinner />}>
                <AuthRequired />
              </Suspense>
            }
          >
            <Route
              path="watchLater"
              element={
                <Suspense fallback={<Spinner />}>
                  <WatchLater />
                </Suspense>
              }
            />
            <Route
              path="liked"
              element={
                <Suspense fallback={<Spinner />}>
                  <Liked />
                </Suspense>
              }
            />

            <Route
              path="history"
              element={
                <Suspense fallback={<Spinner />}>
                  <History />
                </Suspense>
              }
            />

            <Route
              path="playlists"
              element={
                <Suspense fallback={<Spinner />}>
                  <Playlists />
                </Suspense>
              }
            />

            <Route
              path="Profile"
              element={
                <Suspense fallback={<Spinner />}>
                  <Profile />
                </Suspense>
              }
            />
          </Route>

          <Route
            element={
              <Suspense fallback={<Spinner />}>
                <AllowedWhenNotAuth />
              </Suspense>
            }
          >
            <Route
              path="signin"
              element={
                <Suspense fallback={<Spinner />}>
                  <SignIn />
                </Suspense>
              }
            />
            <Route
              path="signup"
              element={
                <Suspense fallback={<Spinner />}>
                  <SignUp />
                </Suspense>
              }
            />
          </Route>
        </Route>
        <Route path="/*" element={<Navigate to={"/404"} replace={true} />} />
        <Route
          path="/404"
          element={
            <Suspense fallback={<Spinner />}>
              <ErrorPage />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
