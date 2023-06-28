import React, { useState } from "react";

import styles from "./ResetPassword.module.scss";
import FormPage from "../FormPage/FormProps";
import Frame from "../../components/Frame";
import Button from "../../components/Button";
import { ButtonType } from "../../utils/@globalTypes";
import classNames from "classnames";
import { useThemeContext } from "../../context/Theme/Context";
import { Theme } from "../../context/Theme/Context";
import Input from "../../components/Input/Input";
import { useDispatch } from "react-redux";
import { RoutesList } from "../Router";
import { useNavigate } from "react-router-dom";
import { resetPassword } from "../../redux/reducers/authSlice";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const { theme } = useThemeContext();

  const [email, setEmail] = useState("");

  const onChangeEmail = (value: string) => {
    setEmail(value);
  };

  const onSubmit = () => {
    dispatch(
      resetPassword({
        data: { email },
        callback: () => navigator(RoutesList.SignUp),
      })
    );
  };

  return (
    <div>
      <FormPage title={"Reset password"} />
      <Frame>
        <div
          className={classNames({ [styles.darkText]: theme === Theme.Dark })}
        >
          You will receive an email example@gmail.com with a link to reset your
          password!
        </div>
        <Input
          value={email}
          onChange={onChangeEmail}
          type={"text"}
          title={"Email"}
          placeholder={"example@gmail.com"}
        />
        <Button
          title={"Password"}
          type={ButtonType.Primary}
          onClick={onSubmit}
        />
      </Frame>
    </div>
  );
};
export default ResetPassword;
