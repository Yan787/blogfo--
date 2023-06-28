import classNames from "classnames";
import React, { FC } from "react";

import { NoContentIcon } from "../../assets/icons";
import { Theme, useThemeContext } from "../../context/Theme/Context";
import styles from "./EmptyState.module.scss";

type EmptyStateProps = {
  title: string;
  description: string;
};

const EmptyState: FC<EmptyStateProps> = ({ title, description }) => {
  const { theme } = useThemeContext();

  return (
    <div
      className={classNames(styles.container, {
        [styles.darkContiner]: theme === Theme.Dark,
        [styles.lightContiner]: theme === Theme.Light,
      })}
    >
      <NoContentIcon />
      <div className={styles.title}>{title}</div>
      <div className={styles.description}>{description}</div>
    </div>
  );
};
export default EmptyState;
