import React from "react";
import classNames from "classnames";

import { Outlet } from "react-router-dom";
import styles from "./PagesContainer.module.scss";
import { Theme, useThemeContext } from "../../context/Theme/Context";
import Heder from "./Heder";

const PagesContainer = () => {
  const { theme } = useThemeContext();
  return (
    <div
      className={classNames(styles.container, {
        [styles.darkContainer]: theme === Theme.Dark,
        [styles.lightContainer]: theme === Theme.Light,
      })}
      id="scrollableDiv"
    >
      <Heder />
      <div className={styles.mainInfo}>
        <Outlet />
        <div className={styles.footer}>
          <div>©2022 Blogfolio</div>
          <div>All rights reserved</div>
        </div>
      </div>
    </div>
  );
};

export default PagesContainer;
