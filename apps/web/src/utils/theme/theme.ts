import { useEffect, useState } from "react";

export const getCurrentTheme = () =>
  localStorage.getItem("theme") ||
  (window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light");

/**
 * set app theme
 * @param theme color
 * @returns
 */
export const setCurrentTheme = (theme: string) => {
  localStorage.setItem("theme", theme);
  document.documentElement.setAttribute("data-theme", theme);
};

export const useTheme = () => {
  const [theme, setTheme] = useState(getCurrentTheme());

  useEffect(() => {
    setCurrentTheme(theme || "light");
  }, [theme]);

  return {
    theme: theme,
    setTheme: setTheme,
  };
};
