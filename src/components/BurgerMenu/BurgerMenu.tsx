import React, { FC, useState } from "react";
import styles from "./BurgerMenu.module.scss";
import { ButtonType } from "../../utils/@globalTypes";
import Button from "../Button/Button";
import { CloseIcon, OpenedMenu } from "../../assets/icons";
import classNames from "classnames";

type BurgerMenuProps = {
  changeState: () => void;
  isOpened: boolean;
};
const BurgerMenu: FC<BurgerMenuProps> = ({ isOpened, changeState }) => {
  return (
    <Button
      className={styles.btn}
      type={ButtonType.Primary}
      title={isOpened ? <CloseIcon /> : <OpenedMenu />}
      onClick={changeState}
    />
  );
};
export default BurgerMenu;
