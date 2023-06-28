import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../../components/Modal";
import styles from "./SelectedPostModal.module.scss";
import { PostSelectors } from "../../../redux/reducers/postSlice";
import {
  setSelectedPost,
  setPostVisible,
} from "../../../redux/reducers/postSlice";
import Card from "../../../components/Card";
import { CardSize } from "../../../utils/@globalTypes";
const SelectedPostModal = () => {
  const isVisible = useSelector(PostSelectors.getVisibleSelectedModal);

  const dispatch = useDispatch();

  const onClose = () => {
    dispatch(setSelectedPost(null));
    dispatch(setPostVisible(false));
  };

  const selectedPost = useSelector(PostSelectors.getSelectionPost);

  return (
    <Modal isVisible={isVisible} onClose={onClose}>
      {selectedPost ? <Card card={selectedPost} size={CardSize.Large} /> : null}
    </Modal>
  );
};
export default SelectedPostModal;
