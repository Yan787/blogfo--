import React, { FC, ReactNode } from "react";
import classNames from "classnames";

import styles from "./Button.module.scss";
import { ButtonType } from "../../utils/@globalTypes";

type ButtonProps = {
  title: string | ReactNode;
  onClick: () => void;
  type: ButtonType;
  disabled?: Boolean;
  className?: string;
};

export const BtnStyles = {
  [ButtonType.Primary]: styles.PrimaryButton,
  [ButtonType.Secondary]: styles.SecondaryButton,
  [ButtonType.Errer]: styles.ErrerButton,
};

const Button: FC<ButtonProps> = ({
  title,
  onClick,
  type,
  disabled,
  className,
}) => {
  const ButtonClassName = BtnStyles[type];

  return (
    <div
      onClick={disabled ? undefined : onClick}
      className={classNames(ButtonClassName, className, {
        [styles.disabledButton]: disabled,
      })}
    >
      {title}
    </div>
  );
};
export default Button;
