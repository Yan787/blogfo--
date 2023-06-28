import React, { useEffect } from "react";
import classNames from "classnames";

import styles from "./Post.module.scss";
import {
  LikeIcon,
  DislikeIcon,
  BookmarkIcon,
  FilledBookmarkicon,
} from "../../assets/icons";
import Buttom from "../../components/Button";
import { ButtonType, CardType } from "../../utils/@globalTypes";
import { Theme, useThemeContext } from "../../context/Theme/Context";
import { useDispatch, useSelector } from "react-redux";
import {
  getSinglePost,
  LikeStatus,
  PostSelectors,
  setBookmarkStatus,
  setStatus,
} from "../../redux/reducers/postSlice";
import { NavLink, useParams } from "react-router-dom";
import { RoutesList } from "../Router";

const Post = () => {
  const { theme } = useThemeContext();

  const { postId } = useParams();
  const dispatch = useDispatch();
  const singlePost = useSelector(PostSelectors.getSinglePost);

  const likePost = useSelector(PostSelectors.getLikedPost);
  const dislikePost = useSelector(PostSelectors.getDislikedPost);

  const likeIndex = likePost.findIndex((post) => post.id === singlePost?.id);
  const dislikeIndex = dislikePost.findIndex(
    (post) => post.id === singlePost?.id
  );
  // functions
  const onchengeStatus = (status: LikeStatus, card: CardType) => {
    return dispatch(setStatus({ status, card }));
  };
  const onStatusClick = (status: LikeStatus) => () => {
    singlePost && onchengeStatus(status, singlePost);
  };

  const onchengeBookmark = (card: CardType) => {
    dispatch(setBookmarkStatus({ card }));
  };
  const onBookmarkClick = () => {
    singlePost && onchengeBookmark(singlePost);
  };

  const savedPosts = useSelector(PostSelectors.getBookmarkStatus);

  const indexSavedPosts = savedPosts.findIndex(
    (post) => post.id === singlePost?.id
  );

  useEffect(() => {
    postId && dispatch(getSinglePost(postId));
  }, []);

  const isDark = theme === Theme.Dark;

  return (
    singlePost && (
      <div
        className={classNames(styles.container, {
          [styles.darkContainer]: isDark,
        })}
      >
        <div className={styles.navigation}>
          <div
            className={classNames(styles.nav, {
              [styles.darkNav]: isDark,
            })}
          >
            <NavLink
              to={RoutesList.Home}
              className={classNames(styles.btnHome, {
                [styles.darkBtnHome]: isDark,
              })}
            >
              Home
            </NavLink>
          </div>
          <div
            className={classNames(styles.nav, {
              [styles.darkNav]: isDark,
            })}
          >
            Post {singlePost?.id}
          </div>
        </div>
        {singlePost && (
          <div
            className={classNames(styles.title, {
              [styles.darkTitle]: isDark,
            })}
          >
            {singlePost?.title}
          </div>
        )}
        <div className={styles.wrapperImge}>
          <img className={styles.imge} alt="imge" src={singlePost?.image} />
        </div>
        <div className={styles.wrapperText}>
          <p
            className={classNames(styles.text, {
              [styles.darkText]: isDark,
            })}
          >
            {singlePost?.text}
          </p>
        </div>
        <div className={styles.buttons}>
          <div className={styles.wrapperBtn}>
            <Buttom
              className={classNames({ [styles.like]: likeIndex > -1 })}
              title={<LikeIcon />}
              onClick={onStatusClick(LikeStatus.Like)}
              type={ButtonType.Secondary}
            />
            <Buttom
              className={classNames({ [styles.dislike]: dislikeIndex > -1 })}
              title={<DislikeIcon />}
              onClick={onStatusClick(LikeStatus.DisLike)}
              type={ButtonType.Secondary}
            />
          </div>
          <div>
            <Buttom
              title={
                <div className={styles.bookmark}>
                  {indexSavedPosts > -1 ? (
                    <FilledBookmarkicon />
                  ) : (
                    <BookmarkIcon />
                  )}
                  Add to favorites
                </div>
              }
              onClick={onBookmarkClick}
              type={ButtonType.Secondary}
            />
          </div>
        </div>
        <div
          className={classNames(styles.border, {
            [styles.darkBorder]: isDark,
          })}
        ></div>
      </div>
    )
  );
};
export default Post;
