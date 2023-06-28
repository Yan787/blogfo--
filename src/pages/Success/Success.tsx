import Reacts from "react";
import classNames from "classnames";

import styles from "./Success.module.scss";
import Frame from "../../components/Frame";
import FormPage from "../FormPage/FormProps";
import Buttom from "../../components/Button";
import { ButtonType } from "../../utils/@globalTypes";
import { Theme, useThemeContext } from "../../context/Theme/Context";
import { RoutesList } from "../Router";
import { useNavigate } from "react-router-dom";

const Success = () => {
  const { theme } = useThemeContext();
  const navigatea = useNavigate();

  const onGoHomeClick = () => {
    navigatea(RoutesList.Home);
  };
  return (
    <div className={classNames({ [styles.darkWrapper]: theme === Theme.Dark })}>
      <FormPage title={"Success"} />
      <Frame>
        <div
          className={classNames(styles.successText, {
            [styles.darkSuccessText]: theme === Theme.Dark,
          })}
        >
          <div>Email confirmed.</div>
          <div>Your registration is now completed</div>
        </div>
        <Buttom
          className={styles.btn}
          title={"Go to home"}
          type={ButtonType.Primary}
          onClick={onGoHomeClick}
        />
      </Frame>
    </div>
  );
};
export default Success;
