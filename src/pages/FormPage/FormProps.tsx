import React, { FC } from "react";
import classNames from "classnames";

import Title from "../../components/Title";
import styles from "./FormProps.module.scss";
import { Theme, useThemeContext } from "../../context/Theme/Context";
import { NavLink } from "react-router-dom";
import { RoutesList } from "../Router";

type FormPageProps = {
  title: string;
};

const FormPage: FC<FormPageProps> = ({ title }) => {
  const { theme } = useThemeContext();
  return (
    <div className={styles.container}>
      <NavLink
        to={RoutesList.Home}
        className={classNames(styles.btnHome, {
          [styles.btnDarkHome]: theme === Theme.Dark,
        })}
      >
        Back to home
      </NavLink>
      <Title title={title} />
    </div>
  );
};
export default FormPage;
