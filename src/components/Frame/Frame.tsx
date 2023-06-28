import classNames from "classnames";
import React, { FC, ReactNode } from "react";
import { Theme, useThemeContext } from "../../context/Theme/Context";
import styles from "./Frame.module.scss";

type FrameProps = {
  children: ReactNode;
};

const Frame: FC<FrameProps> = ({ children }) => {
  const { theme } = useThemeContext();
  return (
    <div className={styles.wrapper}>
      <div
        className={classNames(styles.frame, {
          [styles.darkFrame]: theme === Theme.Dark,
          [styles.lightFrame]: theme === Theme.Light,
        })}
      >
        {children}
      </div>
    </div>
  );
};
export default Frame;
