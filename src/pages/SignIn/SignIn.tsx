import React, { useEffect, useState } from "react";
import classNames from "classnames";
import * as yup from "yup";

import styles from "./SignIn.module.scss";
import Buttom from "../../components/Button";
import { ButtonType } from "../../utils/@globalTypes";
import FormPage from "../FormPage/FormProps";
import Frame from "../../components/Frame";
import { Theme, useThemeContext } from "../../context/Theme/Context";
import { NavLink, useNavigate } from "react-router-dom";
import { RoutesList } from "../Router";
import Input from "../../components/Input/Input";
import { useDispatch } from "react-redux";
import { signInUser } from "../../redux/reducers/authSlice";

const SingIn = () => {
  const { theme } = useThemeContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [validationError, setValidationError] = useState<any>({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onChangeEmail = (value: string) => {
    setEmail(value);
  };
  const onChangePassword = (value: string) => {
    setPassword(value);
  };

  const onSignInClick = () => {
    dispatch(
      signInUser({
        data: { email, password },
        callback: () => navigate(RoutesList.Home),
      })
    );
  };

  useEffect(() => {
    const schema = yup.object().shape({
      email: yup.string().required("Почта это обязательное поле"),
      password: yup
        .string()
        .required("Пароль должен быть больше 8 символов")
        .min(8),
    });

    const validator = async () => {
      const validationResalt = await schema
        .validate({ email, password }, { abortEarly: false })
        .catch((err: any) => {
          let errorObject: any = {};
          err.inner.map((error: any) => {
            const errorPath = `${error.path}`;
            errorObject[errorPath] = error.errors;
          });
          setValidationError(errorObject);
        });
      validationResalt && setValidationError({});
    };
    validator();
  }, [email, password]);

  return (
    <div className={classNames({ [styles.darkWrapper]: theme === Theme.Dark })}>
      <FormPage title={"Sign In"} />
      <Frame>
        <div className={styles.inputWrapper}>
          <Input
            value={email}
            onChange={onChangeEmail}
            type={"text"}
            title={"Email"}
            placeholder={"Your email"}
            errorText={validationError?.email}
          />

          <div>
            <Input
              value={password}
              onChange={onChangePassword}
              type={"password"}
              title={"Password"}
              placeholder={"Your password"}
              errorText={validationError?.password}
            />
            <div
              className={classNames(styles.forgotPass, {
                [styles.darkforgotPass]: theme === Theme.Dark,
              })}
            >
              Forgot password?
            </div>
          </div>
        </div>
        <div>
          <Buttom
            className={styles.btn}
            title={"Sign In"}
            type={ButtonType.Primary}
            // disabled={!isValid}
            onClick={onSignInClick}
          />
          <div
            className={classNames(styles.signUp, {
              [styles.darkSignUp]: theme === Theme.Dark,
            })}
          >
            Don’t have an account?{" "}
            <NavLink
              to={RoutesList.SignUp}
              className={classNames(styles.link, {
                [styles.darkLink]: theme === Theme.Dark,
              })}
            >
              &nbsp;Sign Up
            </NavLink>
          </div>
        </div>
      </Frame>
    </div>
  );
};
export default SingIn;
