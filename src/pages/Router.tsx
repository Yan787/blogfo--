import React, { useEffect } from "react";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Home";
import PagesContainer from "./PagesContainer";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import RegConfirmation from "./RegConfirmation/RegConfirmation";
import FormPage from "./FormPage/FormProps";
import Post from "./Post";
import ResetPassword from "./ResetPassword";
import NewPassword from "./NewPassword";
import Success from "./Success";
import { useDispatch, useSelector } from "react-redux";
import { AuthSalectors, getUserInfo } from "../redux/reducers/authSlice";
import Search from "./Search";
import AddPost from "./AddPost";

export enum RoutesList {
  Home = "/",
  SinglePost = "/blog/:postId",
  AddPost = "/blog/add",
  Search = "/blog/search",
  SignIn = "/sign-in",
  SignUp = "/sign-up",
  Confirm = "/activate/:uid/:token",
  Success = "/sign-up/success",
  RegConfirmation = "/regonfirmation-confirmation",
  ResetPassword = "/Reset-Password",
  NewPassword = "/password/reset/confirm/:uid/:token",
  Default = "*",
}

const Router = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(AuthSalectors.getLoggendIn);

  useEffect(() => {
    isLoggedIn && dispatch(getUserInfo());
  }, [dispatch, isLoggedIn]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path={RoutesList.Home} element={<PagesContainer />}>
          <Route path={RoutesList.Success} element={<Success />}></Route>
          <Route path={RoutesList.Home} element={<Home />}></Route>
          <Route path={RoutesList.SignIn} element={<SignIn />}></Route>
          <Route path={RoutesList.SignUp} element={<SignUp />}></Route>
          <Route path={RoutesList.SinglePost} element={<Post />}></Route>
          <Route path={RoutesList.Search} element={<Search />}></Route>
          <Route
            path={RoutesList.AddPost}
            element={
              isLoggedIn ? <AddPost /> : <Navigate to={RoutesList.SignIn} />
            }
          />
          <Route
            path={RoutesList.Confirm}
            element={<RegConfirmation />}
          ></Route>
          <Route
            path={RoutesList.NewPassword}
            element={<NewPassword />}
          ></Route>
          <Route
            path={RoutesList.ResetPassword}
            element={<ResetPassword />}
          ></Route>
          <Route
            path={RoutesList.Default}
            element={<FormPage title={"404 NOT FOUND"} />}
          ></Route>
          <Route
            path={RoutesList.RegConfirmation}
            element={<RegConfirmation />}
          ></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
export default Router;
