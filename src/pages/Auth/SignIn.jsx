import { useState } from "react";

import styles from "../../styles";
import { icons, testUsers } from "../../constants";

import { useForm } from "react-hook-form";

import ClipLoader from "react-spinners/ClipLoader";

import { Link, useLocation, useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../constants";

import { InputErrorMsg } from "../../components";

const SignIn = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //get error msg when the user tries to access private data without sign in
  const [searchParams] = useSearchParams();
  const message = searchParams.get("message");

  const [showPassword, setShowPassword] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState({ user: false, guest: false });

  const onSubmit = async (data) => {
    const { email, password } = data;
    setIsError(false);

    email.includes("testuser") && password.includes("A")
      ? setIsLoading((prev) => ({ ...prev, guest: true }))
      : setIsLoading((prev) => ({ ...prev, user: true }));

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate(state ? state : "/", { replace: true });
    } catch (error) {
      setIsError(true);
      setErrorMsg(error.message);
    } finally {
      setIsLoading({ user: false, guest: false });
    }
  };

  return (
    <div
      className={`${styles.mainBody} flex flex-col justify-center items-center font-poppins pt-0 sm:pt-14`}
    >
      {message && (
        <div className="text-lg ss:text-xl font-medium mb-5 text-red-500">
          {message}
        </div>
      )}
      <div
        className={`w-full xs:w-[90%] h-auto max-w-[450px] px-[15px] ss:px-7 xs:px-10 py-10 rounded-xl bg-white dark:bg-slate-900 flex flex-col items-center shadow-formShadow ${styles.colorsTransition}`}
      >
        <div className="text-lg ss:text-xl xs:text-2xl font-medium mb-8 text-slate-700 dark:text-slate-100">
          Sign In To Your Account
        </div>
        {/*error msg*/}
        {isError && (
          <div className="w-full border-[1px] border-solid border-red-500 dark:border-red-600 mb-6 py-2 rounded-lg text-center text-red-500 dark:text-red-500 font-light">
            {errorMsg}
          </div>
        )}

        <form className="space-y-6 w-full" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <input
              type="email"
              placeholder="Email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@gmail.com$/,
                  message: "Please enter a valid Gmail ",
                },
              })}
              className={`${styles.inputField} ${
                errors?.email ? styles.errorInput : styles.correctInput
              }`}
            />
            {/*error msg*/}
            {errors?.email && (
              <InputErrorMsg message={errors?.email?.message} />
            )}
          </div>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Min 6 characters required" },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                  message: "Must contain uppercase, lowercaser and 1 num",
                },
              })}
              className={`${styles.inputField} ${
                errors?.password ? styles.errorInput : styles.correctInput
              }`}
            />
            {/*error msg*/}
            {errors?.password && (
              <InputErrorMsg message={errors?.password?.message} />
            )}

            {/*toggle password view button*/}
            {showPassword ? (
              <div
                onClick={() => setShowPassword(false)}
                className={`${styles.PasswrodInputEye}`}
              >
                <icons.eyeInvisible />
              </div>
            ) : (
              <div
                onClick={() => setShowPassword(true)}
                className={`${styles.PasswrodInputEye}`}
              >
                <icons.eye />
              </div>
            )}
          </div>

          <button
            type="submit"
            className={`w-full h-9 ss:h-10 rounded-md flex items-center justify-center bg-slate-200 dark:bg-slate-800 text-sm ss:text-base hover:bg-slate-300 active:bg-slate-200 dark:hover:bg-slate-700
            dark:active:bg-slate-800 ${styles.colorsTransition}`}
          >
            {isLoading.user ? (
              <ClipLoader color="#2779bd" size={28} />
            ) : (
              "Sign In"
            )}
          </button>
        </form>
        <div
          className="flex justify-center items-center space-x-3 mt-8 mb-6"
          onClick={() => onSubmit(testUsers[Math.round(Math.random() * 10)])}
        >
          <div
            className={`text-[15px] ss:text-[17px] font-medium cursor-pointer text-blue-700 hover:text-blue-800 active:text-blue-700 dark:text-blue-500 hover:dark:text-blue-600 active:dark:text-blue-500
             ${styles.colorsTransition}`}
          >
            Continue as Guest
          </div>
          {isLoading.guest && <ClipLoader color="#2779bd" size={25} />}
        </div>
        <div className="text-sm ss:text-base font-light">
          Dont have an account?{" "}
          <Link to={"/signup"}>
            <span className="text-sm ss:text-base text-blue-700 dark:text-blue-500 font-medium hover:underline">
              Sign Up
            </span>
          </Link>{" "}
        </div>
      </div>
    </div>
  );
};

export default SignIn;
