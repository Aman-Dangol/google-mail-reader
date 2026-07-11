import { Button } from "@src/components/button";
import { useTheme } from "@src/utils/theme/theme";
import { MoonIcon, SunIcon } from "lucide-react";
import { useState } from "react";

export const ThemeButton = () => {
  const { theme, setTheme } = useTheme();
  const [iconClassName, setIconClassName] = useState("");

  const handleClick = () => {
    if (!iconClassName) setIconClassName("pop-up");
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const Sun = SunIcon;
  const Moon = MoonIcon;

  const DisplayIcon = theme === "dark" ? Sun : Moon;
  return (
    <Button onClick={handleClick}>
      {<DisplayIcon className={iconClassName} />}
    </Button>
  );
};
