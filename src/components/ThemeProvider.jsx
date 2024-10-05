import { useState, useEffect } from "react";
import iconSun from "../images/icon-sun.svg";
import iconMoon from "../images/icon-moon.svg";

const ThemeProvider = () => {
  // Step 1: Set theme state and check localStorage for saved theme
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  // Step 2: Apply the theme to the body class and save to localStorage
  useEffect(() => {
    document.body.className = theme; // Add 'light' or 'dark' class to body
    localStorage.setItem("theme", theme); // Save the theme in localStorage
  }, [theme]);

  // Step 3: Function to toggle theme
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <div>
      <img
        onClick={toggleTheme}
        src={theme === "light" ? iconSun : iconMoon}
        className="cursor-pointer"
      />
    </div>
  );
};

export default ThemeProvider;
