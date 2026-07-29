import { Button } from "@src/components/button";
import { ThemeContext } from "@src/utils/context/theme-context";
import { MoonIcon, SunIcon } from "lucide-react";
import { useContext, useState } from "react";

export const ThemeButton = () => {
  const { currentTheme, setCurrentTheme } = useContext(ThemeContext);
  const [iconClassName, setIconClassName] = useState("");

  const handleClick = () => {
    if (!iconClassName) setIconClassName("pop-up");
    setCurrentTheme(currentTheme === "dark" ? "light" : "dark");
  };

  const Sun = SunIcon;
  const Moon = MoonIcon;

  const DisplayIcon = currentTheme === "dark" ? Sun : Moon;
  return (
    <Button onClick={handleClick}>
      {<DisplayIcon className={iconClassName} />}
    </Button>
  );
};
