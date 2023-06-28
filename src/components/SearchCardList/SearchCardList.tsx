import React, { FC } from "react";

import { CardListType, CardSize } from "../../utils/@globalTypes";
import Card from "../Card";
import EmptyState from "../EmptyState";
import styles from "./SearchCardList.module.scss";

type CardsListProps = {
  cardsList: CardListType;
};

const SearchCardList: FC<CardsListProps> = ({ cardsList }) => {
  return cardsList.length > 0 ? (
    <div className={styles.container}>
      {cardsList.map((item) => {
        return <Card card={item} key={item.id} size={CardSize.Search} />;
      })}
    </div>
  ) : (
    <EmptyState
      title="Sorry, there's no posts"
      description="Try to use another search request"
    />
  );
};
export default SearchCardList;
