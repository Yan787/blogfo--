import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import styles from "./Search.module.scss";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import SearchCardList from "../../components/SearchCardList";
import Title from "../../components/Title";
import {
  getSearchedPost,
  PostSelectors,
  setSearchedPost,
} from "../../redux/reducers/postSlice";
import SelectedPostModal from "../Home/SelectedPostModal";
import { PER_PAGE } from "../../utils/constants";

const Search = () => {
  const dispatch = useDispatch();
  const searchValue = useSelector(PostSelectors.getSearchedValue);
  const cardList = useSelector(PostSelectors.getSearchedPost);
  const postsCount = useSelector(PostSelectors.getSearchedPostCount);

  const [page, setPage] = useState(1);

  useEffect(() => {
    const offset = (page - 1) * PER_PAGE;
    dispatch(getSearchedPost({ searchValue, isOverwrite: false, offset }));
  }, [dispatch, page, searchValue]);

  // useEffect(() => {
  //   return () => {
  //     dispatch(
  //       setSearchedPost({ cardList: [], postsCount: 0, isOverwrite: true })
  //     );
  //   };
  // }, []);

  const onNextPeached = () => {
    setPage(page + 1);
  };

  return (
    <div>
      <Title title={searchValue} />
      <InfiniteScroll
        next={onNextPeached}
        hasMore={cardList.length < postsCount}
        loader={<Loader />}
        dataLength={cardList.length}
        scrollThreshold={0.7}
        scrollableTarget="scrollableDiv"
      >
        <SearchCardList cardsList={cardList} />
      </InfiniteScroll>
      <SelectedPostModal />
    </div>
  );
};

export default Search;
