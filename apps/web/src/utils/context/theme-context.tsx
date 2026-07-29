import { useTheme } from "@src/utils/theme/theme";
import { createContext, type ReactNode } from "react";

export const ThemeContext = createContext<{
  currentTheme: string;
  setCurrentTheme: (theme: string) => void;
}>({ setCurrentTheme() {}, currentTheme: "" });

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const { theme, setTheme } = useTheme();

  return (
    <ThemeContext.Provider
      value={{ currentTheme: theme, setCurrentTheme: setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
