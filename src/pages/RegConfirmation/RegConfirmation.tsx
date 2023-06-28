import React from "react";
import Button from "../../components/Button/Button";
import Frame from "../../components/Frame";
import FormPage from "../FormPage/FormProps";
import { ButtonType } from "../../utils/@globalTypes";
import styles from "./RegConfirmation.module.scss";
import classNames from "classnames";
import { Theme, useThemeContext } from "../../context/Theme/Context";
import { useNavigate, useParams } from "react-router-dom";
import { RoutesList } from "../Router";
import { useDispatch } from "react-redux";
import { activateUser } from "../../redux/reducers/authSlice";

const RegConfirmation = () => {
  const { theme } = useThemeContext();
  const { uid, token } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onConfirmationButtonClick = () => {
    if (uid && token) {
      dispatch(
        activateUser({
          data: { uid, token },
          callback: () => navigate(RoutesList.Success),
        })
      );
    }
  };

  return (
    <div>
      <FormPage title={"Registration Confirmation"} />
      <Frame>
        <div className={styles.container}>
          <div
            className={classNames(styles.text, {
              [styles.darkText]: theme === Theme.Dark,
            })}
          >
            Please activate your account with the activation link in the email
            .Please, check your email
          </div>
          <Button
            title={"Confirm"}
            type={ButtonType.Primary}
            onClick={onConfirmationButtonClick}
            className={styles.btn}
          />
        </div>
      </Frame>
    </div>
  );
};
export default RegConfirmation;
