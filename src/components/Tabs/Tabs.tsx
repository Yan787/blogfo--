import React, { FC, useMemo } from "react";
import classNames from "classnames";

import { TabsType } from "./types";
import styles from "./Tabs.module.scss";
import { useThemeContext } from "../../context/Theme/Context";
import { Theme } from "../../context/Theme/Context";
import { TabsNames } from "../../utils/@globalTypes";
import { useSelector } from "react-redux";
import { AuthSalectors } from "../../redux/reducers/authSlice";

type TabsProps = {
  onTabClick: (key: TabsNames) => () => void;
  activeTab: TabsNames;
};

const Tabs: FC<TabsProps> = ({ activeTab, onTabClick }) => {
  const { theme } = useThemeContext();

  const isLoggedIn = useSelector(AuthSalectors.getLoggendIn);

  const TABS_LIST = useMemo(
    () => [
      {
        title: `All`,
        disabled: false,
        key: TabsNames.All,
      },
      {
        title: `My Posts`,
        disabled: !isLoggedIn,
        key: TabsNames.MyPosts,
      },
      {
        title: `Popular`,
        disabled: false,
        key: TabsNames.Popular,
      },
      {
        title: `Favourites`,
        disabled: false,
        key: TabsNames.Favourites,
      },
    ],
    [isLoggedIn]
  );

  return (
    <div
      className={classNames(styles.continer, {
        [styles.darkContiner]: theme === Theme.Dark,
      })}
    >
      {TABS_LIST.map((tab) => {
        return (
          <div
            key={tab.key}
            className={classNames(styles.tab, {
              [styles.activeTab]: activeTab === tab.key,
              [styles.disabled]: tab.disabled,
              [styles.darkDisabled]: tab.disabled,
            })}
            onClick={tab.disabled ? undefined : onTabClick(tab.key)}
          >
            {tab.title}
          </div>
        );
      })}
    </div>
  );
};
export default Tabs;
