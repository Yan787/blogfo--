import React, { FC, ReactNode } from "react";
import { Theme, ThemeContext } from "./Context";

type ThemeProviderProps = {
  children: ReactNode;
  theme: Theme;
  onChengeTheme: (value: Theme) => void;
};

const ThemeProvider: FC<ThemeProviderProps> = ({
  children,
  theme,
  onChengeTheme,
}) => {
  return (
    <ThemeContext.Provider value={{ theme, onChengeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
export default ThemeProvider;
