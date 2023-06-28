import React, { useEffect, useMemo, useState } from "react";

import styles from "./NewPassword.module.scss";
import Frame from "../../components/Frame";
import FormPage from "../FormPage/FormProps";
import Imput from "../../components/Input";
import Button from "../../components/Button";
import { ButtonType } from "../../utils/@globalTypes";
import Input from "../../components/Input";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { RoutesList } from "../Router";
import { newPassword } from "../../redux/reducers/authSlice";

const NewPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { uid, token } = useParams();

  const [password, setpassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const [passwordTouched, setPasswordTouched] = useState(false);
  const [confirmPassworTouched, setConfirmPassworTouched] = useState(false);

  const onChangePassword = (value: string) => {
    setpassword(value);
  };
  const onChangeConfirmPassword = (value: string) => {
    setConfirmPassword(value);
  };

  const onBlurPassword = () => {
    setPasswordTouched(true);
  };
  const onBlurconfirmPassword = () => {
    setConfirmPassworTouched(true);
  };

  useEffect(() => {
    if (confirmPassworTouched) {
      if (password !== confirmPassword) {
        setPasswordError("Passwords must match");
        setConfirmPasswordError("Passwords must match");
      } else if (confirmPassword.length === 0 || confirmPassword.length === 0) {
        setPasswordError("Password is required field");
        setConfirmPasswordError("Password is required field");
      } else {
        setPasswordError("");
        setConfirmPasswordError("");
      }
    }
  }, [passwordTouched, password, confirmPassword]);

  const isValid = useMemo(() => {
    return (
      passwordError.length === 0 &&
      confirmPasswordError.length === 0 &&
      passwordTouched &&
      confirmPassworTouched
    );
  }, [
    passwordError,
    confirmPasswordError,
    passwordTouched,
    confirmPassworTouched,
  ]);

  const onSubmit = () => {
    if (uid && token) {
      dispatch(
        newPassword({
          data: { uid, token, new_password: password },
          callback: () => navigate(RoutesList.SignIn),
        })
      );
    }
  };

  return (
    <div>
      <FormPage title={"New password"} />
      <Frame>
        <Input
          value={password}
          onChange={onChangePassword}
          type={"password"}
          title={"Password"}
          placeholder={"Your password"}
          onBlur={onBlurPassword}
          errorText={passwordError}
        />
        <Input
          value={confirmPassword}
          onChange={onChangeConfirmPassword}
          type={"password"}
          title={"Confirm password"}
          placeholder={"Your password"}
          onBlur={onBlurconfirmPassword}
          errorText={confirmPasswordError}
        />
        <Button
          title={"Set password"}
          type={ButtonType.Primary}
          disabled={!isValid}
          onClick={onSubmit}
        />
      </Frame>
    </div>
  );
};
export default NewPassword;
