import React, { useMemo, useState, KeyboardEvent } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import classNames from "classnames";

import BurgerMenu from "../../../components/BurgerMenu";
import Button from "../../../components/Button/Button";
import { ButtonType } from "../../../utils/@globalTypes";
import ThemeSwitcher from "../../../components/ThemeSwitcher";
import styles from "./Heder.module.scss";
import { RoutesList } from "../../Router";
import { CloseIcon, SearchIcon, UserIcon } from "../../../assets/icons";
import { useDispatch, useSelector } from "react-redux";
import { AuthSalectors, logoutUser } from "../../../redux/reducers/authSlice";
import UserName from "../../../components/UserName/UserName";
import Input from "../../../components/Input";
import { getSearchedPost } from "../../../redux/reducers/postSlice";

const Heder = () => {
  const [isOpened, setOpened] = useState(false);
  const [isInputOpened, setInputOpened] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const navigate = useNavigate();
  const isLoggedIn = useSelector(AuthSalectors.getLoggendIn);
  const dispatch = useDispatch();

  const changeState = () => {
    return setOpened(!isOpened);
  };

  const onAuthButtonClic = () => {
    navigate(RoutesList.SignIn);
  };

  const onLogoutClick = () => {
    dispatch(logoutUser());
  };

  const navButtonList = useMemo(
    () => [
      {
        title: "Home",
        key: RoutesList.Home,
      },
      ...(!isLoggedIn
        ? []
        : [
            {
              title: "Add post",
              key: RoutesList.AddPost,
            },
          ]),
      // ...(!isLoggedIn
      //   ? []
      //   : [
      {
        title: "ResetPassword",
        key: RoutesList.ResetPassword,
      },
      // ]),
      // {
      //   title: "Confirmation",
      //   key: RoutesList.RegConfirmation,
      // },
      // {
      //   title: "ResetPassword",
      //   key: RoutesList.ResetPassword,
      // },
      // {
      //   title: "New password",
      //   key: RoutesList.NewPassword,
      // },
    ],
    [isLoggedIn]
  );

  const onClickSearchButton = () => {
    setInputOpened(!isInputOpened);
    if (isInputOpened) {
      dispatch(getSearchedPost({ searchValue, isOverwrite: true, offset: 0 }));
      navigate(RoutesList.Search);
    }
  };
  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onClickSearchButton();
    }
  };

  const name = useSelector(AuthSalectors.getUserNameInfo);
  const userName = name?.username ? name?.username : "где твоё имя?";

  const location = useLocation();
  return (
    <>
      <div className={styles.container}>
        <div className={styles.infoContainer}>
          <BurgerMenu isOpened={isOpened} changeState={changeState} />
          {isInputOpened && (
            <Input
              value={searchValue}
              placeholder={"Search..."}
              type={"text"}
              inputClassName={classNames(styles.imput, {
                [styles.imputLoggedIn]: !isLoggedIn,
              })}
              onChange={setSearchValue}
              onKeyDown={onKeyDown}
            />
          )}
        </div>
        <div className={styles.infoContainer}>
          <Button
            title={<SearchIcon />}
            type={ButtonType.Primary}
            onClick={onClickSearchButton}
            className={classNames(styles.searchIconColor, {
              [styles.searchIcon]: isInputOpened,
            })}
          />

          {isLoggedIn ? (
            <UserName userName={userName} className={styles.userName} />
          ) : (
            <Button
              title={<UserIcon />}
              className={styles.border}
              type={ButtonType.Primary}
              onClick={onAuthButtonClic}
            />
          )}
        </div>
      </div>
      {isOpened && (
        <div className={styles.mainContainer}>
          <div className={styles.actionsContainer}>
            {isLoggedIn && (
              <UserName userName={userName} className={styles.menuUser} />
            )}

            {navButtonList.map(({ title, key }) => {
              return (
                <NavLink
                  to={key}
                  key={key}
                  className={classNames(styles.navButton, {
                    [styles.activeNavButton]: location.pathname === key,
                  })}
                >
                  {title}
                </NavLink>
              );
            })}
          </div>
          <div>
            <ThemeSwitcher />
            <Button
              title={!isLoggedIn ? "Sign In" : "Log Out"}
              type={ButtonType.Secondary}
              onClick={!isLoggedIn ? onAuthButtonClic : onLogoutClick}
              className={styles.authButton}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Heder;
