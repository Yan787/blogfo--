import classNames from "classnames";
import React, { useState } from "react";
import ImageUploading, { ImageListType } from "react-images-uploading";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import Button from "../../components/Button";
import Input from "../../components/Input";
import { addNewPost } from "../../redux/reducers/postSlice";
import { ButtonType } from "../../utils/@globalTypes";
import FormProps from "../FormPage/FormProps";
import { RoutesList } from "../Router";

import styles from "./AddPost.module.scss";

const AddPost = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [lessonNum, setLessonNum] = useState("");
  const [images, setImages] = useState<ImageListType>([]);
  const [description, setDescription] = useState("");
  const [text, setText] = useState("");

  const onSubmit = () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("text", text);
    formData.append("description", description);
    formData.append("lesson_num", lessonNum);
    formData.append("image", images[0].file as Blob);

    dispatch(
      addNewPost({
        callback: () => navigate(RoutesList.Home),
        data: formData,
      })
    );
  };

  const onChange = (imageList: ImageListType) => {
    setImages(imageList);
  };

  return (
    <div className={styles.container}>
      <FormProps title="Add post" />
      <Input
        value={title}
        onChange={setTitle}
        type={"text"}
        title={"Title"}
        placeholder={"Add your title"}
        inputClassName={styles.input}
      />
      <div className={styles.smallInputContainer}>
        <Input
          value={lessonNum}
          onChange={setLessonNum}
          type={"text"}
          title={"Lesson Number"}
          placeholder={"Add your lesson number"}
          inputClassName={styles.input}
        />
        <ImageUploading
          multiple={false}
          value={images}
          onChange={onChange}
          dataURLKey="data_url"
        >
          {({
            imageList,
            onImageUpload,
            onImageRemoveAll,
            onImageUpdate,
            onImageRemove,
            isDragging,
            dragProps,
          }) => (
            <div className="upload__image-wrapper">
              <div className={styles.title}>Image</div>
              {imageList.length === 0 ? (
                <div
                  className={classNames(styles.dragNDrop, {
                    [styles.draggable]: isDragging,
                  })}
                  onClick={onImageUpload}
                  {...dragProps}
                >
                  Click or Drop here
                </div>
              ) : (
                <Button
                  title={"Remove all images"}
                  type={ButtonType.Secondary}
                  onClick={onImageRemoveAll}
                />
              )}
              {imageList.map((image, index) => (
                <div key={index} className={styles.imageItem}>
                  <img src={image["data_url"]} alt="" width="100" />
                  <div className={styles.updateButtonsContainer}>
                    <Button
                      title={"Update"}
                      className={styles.updateButton}
                      type={ButtonType.Secondary}
                      onClick={() => onImageUpdate(index)}
                    />
                    <Button
                      title={"Remove"}
                      className={styles.updateButton}
                      type={ButtonType.Secondary}
                      onClick={() => onImageRemove(index)}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </ImageUploading>
      </div>
      <Input
        value={description}
        onChange={setDescription}
        type={"text"}
        title={"Description"}
        placeholder={"Add your description"}
        inputClassName={styles.input}
      />
      <Input
        value={text}
        onChange={setText}
        type={"text"}
        title={"Text"}
        placeholder={"Add your text"}
        inputClassName={styles.input}
      />
      <div className={styles.footer}>
        <Button
          title={"Delete post"}
          onClick={() => {}}
          type={ButtonType.Errer}
        />
        <div className={styles.updateButtonsContainer}>
          <Button
            title={"Cancel"}
            onClick={() => {}}
            type={ButtonType.Secondary}
          />
          <Button
            title={"Add post"}
            onClick={onSubmit}
            type={ButtonType.Primary}
          />
        </div>
      </div>
    </div>
  );
};

export default AddPost;
