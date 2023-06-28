/* eslint-disabl */
import React, { FC } from "react";

import { CardListType, CardSize } from "../../utils/@globalTypes";
import Card from "../Card";
import EmptyState from "../EmptyState";
import styles from "./CardsList.module.scss";

type CardsListProps = {
  cardsList: CardListType;
};

const CardsList: FC<CardsListProps> = ({ cardsList }) => {
  return cardsList.length > 0 ? (
    <div className={styles.container}>
      <div>
        <Card card={cardsList[0]} size={CardSize.Large} />
        <div className={styles.mediumContainer}>
          {cardsList.map((item, index) => {
            if (index > 0 && index < 5) {
              return <Card card={item} key={item.id} size={CardSize.Medium} />;
            }
          })}
        </div>
      </div>
      <div className={styles.reghSideContainer}>
        {cardsList.map((item, index) => {
          if (index > 5) {
            return <Card card={item} key={item.id} size={CardSize.Small} />;
          }
        })}
      </div>
    </div>
  ) : (
    <EmptyState
      title="Sorry, there's no posts"
      description="Try to check out another category"
    />
  );
};
export default CardsList;
