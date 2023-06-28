import React, { useEffect, useMemo, useState } from "react";
import Frame from "../../components/Frame";
import FormPage from "../FormPage/FormProps";
import Button from "../../components/Button/Button";
import { ButtonType } from "../../utils/@globalTypes";
import styles from "./SignUp.module.scss";
import { NavLink, useNavigate } from "react-router-dom";
import { RoutesList } from "../Router";
import Input from "../../components/Input/Input";
import classNames from "classnames";
import { Theme, useThemeContext } from "../../context/Theme/Context";
import { useDispatch } from "react-redux";
import { signUser } from "../../redux/reducers/authSlice";

const SignUp = () => {
  const { theme } = useThemeContext();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [nameTauched, setNameTauched] = useState(false);
  const [emailTauched, setEmailTauched] = useState(false);
  const [passwordTauched, setPasswordTauched] = useState(false);

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setpPsswordError] = useState("");

  useEffect(() => {
    if (name.length === 0 && nameTauched) {
      setNameError("Name is required field");
    } else {
      setNameError("");
    }
  }, [name, nameTauched]);

  useEffect(() => {
    if (email.length === 0 && emailTauched) {
      setEmailError("Email is required field");
    } else {
      setEmailError("");
    }
  }, [email, emailTauched]);

  useEffect(() => {
    if (passwordTauched) {
      if (password !== confirmPassword) {
        setpPsswordError("Passwords must match");
      } else if (confirmPassword.length === 0 || confirmPassword.length === 0) {
        setpPsswordError("Password is required field");
      } else {
        setpPsswordError("");
      }
    }
  }, [passwordTauched, password, confirmPassword]);

  const isValid = useMemo(() => {
    return (
      nameError.length === 0 &&
      emailError.length === 0 &&
      passwordError.length === 0 &&
      nameTauched &&
      emailTauched &&
      passwordTauched
    );
  }, [
    nameError,
    emailError,
    passwordError,
    nameTauched,
    emailTauched,
    passwordTauched,
  ]);

  const onChangeName = (value: string) => {
    setName(value);
  };

  const onBlurName = () => {
    setNameTauched(true);
  };

  const onChangeEmail = (value: string) => {
    setEmail(value);
  };

  const onBlurEmail = () => {
    setEmailTauched(true);
  };

  const onChangePassword = (value: string) => {
    setPassword(value);
  };

  const onBlurPassword = () => {
    setPasswordTauched(true);
  };

  const onChangeConfirmPassword = (value: string) => {
    setConfirmPassword(value);
  };

  const onSignUpClick = () => {
    dispatch(
      signUser({
        data: { username: name, email, password },
        callback: () => navigate(RoutesList.SignIn),
      })
    );
  };

  return (
    <>
      <FormPage title={"Sign Up"} />
      <Frame>
        <Input
          value={name}
          onChange={onChangeName}
          type={"text"}
          title={"Name"}
          placeholder={"Your name"}
          errorText={nameError}
          onBlur={onBlurName}
        />

        <Input
          value={email}
          onChange={onChangeEmail}
          type={"text"}
          title={"Email"}
          placeholder={"Your email"}
          errorText={emailError}
          onBlur={onBlurEmail}
        />
        <Input
          value={password}
          onChange={onChangePassword}
          type={"password"}
          title={"Password"}
          placeholder={"Your password"}
          errorText={passwordError}
          onBlur={onBlurPassword}
        />
        <Input
          value={confirmPassword}
          onChange={onChangeConfirmPassword}
          type={"password"}
          title={"Confirm password"}
          placeholder={"Confirm password"}
          errorText={passwordError}
          onBlur={onBlurPassword}
        />

        <div className={styles.button}>
          <Button
            title={"Sign Up"}
            disabled={!isValid}
            onClick={onSignUpClick}
            type={ButtonType.Primary}
          />
          <div
            className={classNames(styles.signUp, {
              [styles.darkSingUp]: theme === Theme.Dark,
              [styles.darktext]: theme === Theme.Dark,
            })}
          >
            Already have an account?{" "}
            <NavLink
              to={RoutesList.SignIn}
              className={classNames(styles.navButton, {
                [styles.darkNav]: theme === Theme.Dark,
              })}
            >
              &nbsp;Sign In
            </NavLink>
          </div>
        </div>
      </Frame>
    </>
  );
};

export default SignUp;
