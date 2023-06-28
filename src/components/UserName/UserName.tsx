import React, { FC } from "react";
import classNames from "classnames";
import styles from "./UserName.module.scss";

type UserNameProps = {
  userName: string;
  className?: string;
};

const UserName: FC<UserNameProps> = ({ userName, className }) => {
  const initials = userName.length > 0 && userName[0];

  return (
    <div className={classNames(styles.background, className)}>
      <div className={styles.wrapper}>
        <div className={styles.initials}>{initials}</div>
        <div className={styles.userName}>{userName}</div>
      </div>
    </div>
  );
};
export default UserName;
