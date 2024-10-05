import { useState } from "react";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../../../firebase";
import { Link, useNavigate } from "react-router-dom";
import bgMobileLight from "../../images/bg-mobile-light.jpg";

import bgMobileDark from "../../images/bg-mobile-dark.jpg";
import bgDesktopLight from "../../images/bg-desktop-light.jpg";
import bgDesktopDark from "../../images/bg-desktop-dark.jpg";
import iconSun from "../../images/icon-sun.svg";
import iconMoon from "../../images/icon-moon.svg";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Signin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const [errors, setErrors] = useState({ email: "", password: "" }); // Object to track field-specific errors
  const [resetEmailSent, setResetEmailSent] = useState(false); // State to track if reset email was sent
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    return password.length > 0; // Password should not be empty
  };

  const onLogin = async (e) => {
    e.preventDefault();
    setErrors({ email: "", password: "" }); // Clear previous errors

    let validationErrors = {};

    if (!validateEmail(email)) {
      validationErrors.email = "Please enter a valid email address.";
    }

    if (!validatePassword(password)) {
      validationErrors.password = "Password cannot be empty.";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors); // Set validation errors if any
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      navigate("/Homepage"); // Redirect after successful login
      console.log(user);
    } catch (error) {
      console.error(error);
      // Handle Firebase errors
      if (error.code === "auth/wrong-password") {
        setErrors((prev) => ({ ...prev, password: "Incorrect password." }));
      } else if (error.code === "auth/user-not-found") {
        setErrors((prev) => ({
          ...prev,
          email: "No user found with this email.",
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          email: "An error occurred during sign-in. Please try again.",
        }));
      }
    }
  };

  //   function to handle password reset

  const handlePasswordReset = async () => {
    setErrors({ ...errors, reset: "" });
    if (!validateEmail(email)) {
      setErrors({
        ...errors,
        reset: "Please enter a valid email to reset your password.",
      });
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setResetEmailSent(true); // Indicate that the reset email was sent
    } catch (error) {
      console.error(error);
      setErrors({
        ...errors,
        reset: "Failed to send password reset email. Please try again.",
      });
    }
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShow) => !prevShow); // Toggle password visibility
  };

  return (
    <>
      <main
        className={`${
          theme === "light" ? "bg-white" : "bg-Very-Dark-Blue"
        } h-screen`}
      >
        <div className="max-w-full relative">
          <img
            src={theme === "light" ? bgMobileLight : bgMobileDark}
            alt=""
            className="w-full md:hidden max-h-[18rem] block"
          />
          <img
            src={theme === "light" ? bgDesktopLight : bgDesktopDark}
            alt=""
            className="w-full hidden md:block lg:max-h-[15rem]"
          />
          <div className="max-w-[20rem] md:max-w-[33rem] absolute top-10 lg:top-10 left-0 right-0 mx-auto flex justify-between items-center">
            <h1 className="text-white text-3xl josephin-700 tracking-[0.4em] font-semibold">
              TODO
            </h1>
            <img
              onClick={toggleTheme}
              src={theme === "light" ? iconMoon : iconSun}
              className="cursor-pointer"
            />
          </div>

          <div
            className={`max-w-[20rem] md:max-w-[33rem] mx-auto rounded-[4px] ${
              theme === "light" ? "bg-white" : "bg-Very-Dark-Desaturated-Blue"
            }  -translate-y-8 md:-translate-y-4 lg:-translate-y-10 box px-4 py-4`}
          >
            <h2
              className={`mb-4 lg:text-2xl ${
                theme === "light" ? "" : "text-white"
              }`}
            >
              Please Sign in to proceed
            </h2>
            <form className="mb-4">
              <div className="flex flex-col gap-2 mb-4">
                <label
                  htmlFor="email-address"
                  className={`${
                    theme === "light"
                      ? "text-Very-Dark-Grayish-Blue-Light"
                      : "text-Light-Grayish-Blue-Dark"
                  }`}
                >
                  Email address
                </label>
                <input
                  type="email"
                  label="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Email address"
                  className="w- p-2 border-2 border-Very-Dark-Grayish-Blue-Light rounded-md"
                />
                {errors.email && (
                  <p className="text-red-600 text-sm mb-2">{errors.email}</p>
                )}
              </div>

              <div className="flex flex-col gap-2 mb-4">
                <label
                  htmlFor="password"
                  className={`${
                    theme === "light"
                      ? "text-Very-Dark-Grayish-Blue-Light"
                      : "text-Light-Grayish-Blue-Dark"
                  }`}
                >
                  Password
                </label>
                <input
                  type={`${showPassword ? "text" : "password"}`}
                  label="Create password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Password"
                  className="p-2 border-2 border-Very-Dark-Grayish-Blue-Light rounded-md"
                />
                <div
                  className="cursor-pointer"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <AiOutlineEye
                      size={25}
                      className={`${
                        theme === "light"
                          ? "text-Very-Dark-Grayish-Blue-Light"
                          : "text-Light-Grayish-Blue-Dark"
                      }`}
                    />
                  ) : (
                    <AiOutlineEyeInvisible
                      size={25}
                      className={`${
                        theme === "light"
                          ? "text-Very-Dark-Grayish-Blue-Light"
                          : "text-Light-Grayish-Blue-Dark"
                      }`}
                    />
                  )}
                </div>
                {errors.password && (
                  <p className="text-red-600 text-sm mb-2">{errors.password}</p>
                )}
              </div>

              <div className="flex gap-4 items-end">
                <button
                  onClick={onLogin}
                  className={`px-6 py-2 ${
                    theme === "light"
                      ? "bg-Very-Dark-Desaturated-Blue"
                      : "bg-Light-Grayish-Blue-Dark"
                  } flex justify-center items-center ${
                    theme === "light"
                      ? "text-white"
                      : "text-Very-Dark-Desaturated-Blue"
                  } rounded-md`}
                >
                  Sign in
                </button>
                <p
                  className={
                    theme === "light"
                      ? "text-Very-Dark-Desaturated-Blue"
                      : "text-white"
                  }
                >
                  No account yet?{" "}
                  <Link to="/" className="hover:underline underline-offset-2">
                    Sign up
                  </Link>
                </p>
              </div>
              {/* Password reset section */}
              <div className="mt-4">
                <p
                  className={
                    theme === "light"
                      ? "text-Very-Dark-Desaturated-Blue"
                      : "text-white"
                  }
                >
                  Forgot your password?
                </p>
                <button
                  onClick={handlePasswordReset}
                  className="text-blue-600 hover:underline text-sm"
                >
                  Reset Password
                </button>
                {errors.reset && (
                  <p className="text-red-600 text-sm mt-2">{errors.reset}</p>
                )}
                {resetEmailSent && (
                  <p className="text-green-600 text-sm mt-2">
                    Password reset email sent! Check your inbox.
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
};

export default Signin;
