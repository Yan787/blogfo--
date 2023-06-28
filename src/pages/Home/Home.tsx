import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

import styles from "./Home.module.scss";
import Title from "../../components/Title";
import Tabs from "../../components/Tabs";
import CardsList from "../../components/CardsList";
import SelectedPostModal from "./SelectedPostModal";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllPosts,
  getMyPost,
  PostSelectors,
} from "../../redux/reducers/postSlice";
import { ButtonType, TabsNames } from "../../utils/@globalTypes";
import { PER_PAGE } from "../../utils/constants";
import classNames from "classnames";
import Button from "../../components/Button";
import Loader from "../../components/Loader";

const Home = () => {
  enum Order {
    Title = "title",
    Date = "date",
  }

  const dispatch = useDispatch();

  const [activeTab, setActivTab] = useState(TabsNames.All);
  const [currentPage, setCurrentPage] = useState(1);
  const [ordering, setOrdering] = useState("");

  const onTabClick = (key: TabsNames) => () => {
    setActivTab(key);
    setCurrentPage(1);
  };

  const postsList = useSelector(PostSelectors.getAllPosts);
  const favouriteList = useSelector(PostSelectors.getLikedPost);
  const myPosts = useSelector(PostSelectors.getMyPost);
  const favourites = useSelector(PostSelectors.getBookmarkStatus);

  const isLoader = useSelector(PostSelectors.getAllPostsLoading);

  const postsCount = useSelector(PostSelectors.getAllPostsCount);
  const pagesCount = Math.ceil(postsCount / PER_PAGE);

  const getCurrentList = () => {
    switch (activeTab) {
      case TabsNames.Popular:
        return favouriteList;
      case TabsNames.MyPosts:
        return myPosts;
      case TabsNames.Favourites:
        return favourites;
      case TabsNames.All:
      default:
        return postsList;
    }
  };

  // useEffect(() => {
  // 	dispatch(getAllPosts());
  // }, []);

  const onOrderClick = (order: Order) => () => {
    if (order === ordering) {
      setOrdering("");
      setCurrentPage(1);
    } else {
      setOrdering(order);
    }
  };

  useEffect(() => {
    const offset = PER_PAGE * (currentPage - 1);
    dispatch(getAllPosts({ offset, ordering }));
  }, [dispatch, currentPage, ordering]);

  const onPageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected + 1);
  };

  return (
    <div>
      <Title title={"Blog"} />
      <Tabs activeTab={activeTab} onTabClick={onTabClick} />
      <div className={styles.wrapper}>
        <Button
          title="title"
          type={ButtonType.Primary}
          onClick={onOrderClick(Order.Title)}
          className={classNames(styles.orderButton, {
            [styles.activStylesBtn]: ordering === Order.Title,
          })}
        />{" "}
        <Button
          title="data"
          type={ButtonType.Primary}
          onClick={onOrderClick(Order.Date)}
          className={classNames(styles.orderButton, {
            [styles.activStylesBtn]: ordering === Order.Date,
          })}
        />
      </div>

      {isLoader ? (
        <Loader />
      ) : (
        <>
          <CardsList cardsList={getCurrentList()} />
          {activeTab !== TabsNames.Popular &&
            activeTab !== TabsNames.Favourites && (
              <ReactPaginate
                pageCount={pagesCount}
                onPageChange={onPageChange}
                containerClassName={styles.pagesContainer}
                pageClassName={styles.pageNumber}
                breakClassName={styles.pageNumber}
                breakLinkClassName={styles.linkPage}
                activeLinkClassName={styles.linkPage}
                pageLinkClassName={styles.linkPage}
                activeClassName={styles.activePageNumber}
                nextClassName={classNames(styles.arrowButton, {
                  [styles.blockedButton]: currentPage === pagesCount,
                })}
                previousClassName={classNames(styles.arrowButton, {
                  [styles.blockedButton]: currentPage === 1,
                })}
                previousLinkClassName={styles.linkPage}
                nextLinkClassName={styles.linkPage}
              />
            )}
        </>
      )}
    </div>
  );
};
export default Home;
