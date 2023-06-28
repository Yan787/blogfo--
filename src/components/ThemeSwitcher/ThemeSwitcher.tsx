import classNames from "classnames";
import React from "react";

import { SunIcon, MoonIcon } from "../../assets/icons";
import { Theme, useThemeContext } from "../../context/Theme/Context";
import styles from "./ThemeSwitcher.module.scss";

const ThemeSwitcher = () => {
  const { theme, onChengeTheme } = useThemeContext();
  const onClick = (value: Theme) => () => onChengeTheme(value);

  return (
    <div className={styles.container}>
      <div
        className={classNames(styles.button, {
          [styles.activeButton]: theme === Theme.Light,
        })}
        onClick={onClick(Theme.Light)}
      >
        <SunIcon />
      </div>
      <div
        className={classNames(styles.button, {
          [styles.activeButton]: theme === Theme.Dark,
        })}
        onClick={onClick(Theme.Dark)}
      >
        <MoonIcon />
      </div>
    </div>
  );
};
export default ThemeSwitcher;
