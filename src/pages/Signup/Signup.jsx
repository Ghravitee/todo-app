import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase";
import bgMobileLight from "../../images/bg-mobile-light.jpg";
import bgMobileDark from "../../images/bg-mobile-dark.jpg";
import bgDesktopLight from "../../images/bg-desktop-light.jpg";
import bgDesktopDark from "../../images/bg-desktop-dark.jpg";
import iconSun from "../../images/icon-sun.svg";
import iconMoon from "../../images/icon-moon.svg";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Signup = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const [errors, setErrors] = useState({ email: "", password: "" }); // Single object for errors
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrors({ email: "", password: "" }); // Clear previous errors

    let validationErrors = {};

    if (!validateEmail(email)) {
      validationErrors.email = "Please enter a valid email address.";
    }

    if (!validatePassword(password)) {
      validationErrors.password =
        "Password should be at least 6 characters long.";
    }

    // Check if there are any validation errors
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors); // Set the errors if validation fails
      return;
    }
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log(user);
      navigate("/Signin"); // Redirect to sign-in page after successful signup
      setLoading(false);
    } catch (error) {
      console.error(error);
      // Handle Firebase errors (optional: map specific error messages)
      if (error.code === "auth/email-already-in-use") {
        setErrors((prev) => ({
          ...prev,
          email: "This email is already in use.",
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          email: "An error occurred during sign-up. Please try again.",
        }));
      }
      setLoading(false);
    }
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShow) => !prevShow); // Toggle password visibility
  };

  return (
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
            Sign Up to to use the Todo App
          </h2>
          <form className="mb-4" onSubmit={onSubmit}>
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

            <button
              type="submit"
              disabled={loading} // Disable button when loading
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
              {loading ? "Signing up..." : "Sign up"}{" "}
            </button>
          </form>

          <p
            className={
              theme === "light"
                ? "text-Very-Dark-Desaturated-Blue"
                : "text-white"
            }
          >
            Already have an account?{" "}
            <Link to="/Signin" className="hover:underline underline-offset-2">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default Signup;
