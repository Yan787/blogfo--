import React, { useState } from "react";
import ThemeProvider from "./context/Theme/Provider";
import { Theme } from "./context/Theme/Context";
import Router from "./pages/Router";
import { useDispatch, useSelector } from "react-redux";
import { chengeTheme } from "./redux/reducers/themeSlice";
import { ThemeSelector } from "./redux/reducers/themeSlice";

const App = () => {
  // const [theme, setTheme] = useState(Theme.Dark);
  const dispatch = useDispatch();

  const theme = useSelector(ThemeSelector.getThemeValue);

  const onChengeTheme = (value: Theme) => {
    dispatch(chengeTheme(value));
  };

  return (
    <ThemeProvider theme={theme} onChengeTheme={onChengeTheme}>
      <Router />
    </ThemeProvider>
  );
};
export default App;
