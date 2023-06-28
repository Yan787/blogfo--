/* eslint-disabl */
import { create } from "apisauce";
import { PER_PAGE } from "../../utils/constants";
import { ActivateUserData, NewPasswordData, ResetPasswordData, SignInUserData, UserPayloadData } from "../reducers/@type";

const API = create({
    baseURL: "https://studapi.teachmeskills.by"
})

const getPost = (offset: number, ordering?: string, search?: string) => {
    return API.get("/blog/posts/", {limit: PER_PAGE, offset, ordering, search})
}

// return API.get("/blog/posts/?limit=12");
//  { limit: 12, search });

const getSignlePost = (id: string) => {
    return API.get(`/blog/posts/${id}/`)
}

const signUpUser = (data: UserPayloadData) => {
    return API.post("/auth/users/", data)
}

const activateUser = (data: ActivateUserData) => {
    return  API.post("/auth/users/activation/", data)
}

const signInUser = (data: SignInUserData) => {
    return API.post("/auth/jwt/create/", data)
}



const getUserInfo = (token: string) => {
    return API.get(
      "/auth/users/me/",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  };

const verifyToken = (token: string) => {
    return API.post("/auth/jwt/verify/", { token });
};

const refreshToken = (token: string) => {
    return API.post("/auth/jwt/refresh/", { refresh: token })
}

const getMyPost = (token: string) => {
    return API.get("/blog/posts/my_posts/",
    {}, 
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
}

const addNewPost = (token: string, data: any) => {
  return API.post("/blog/posts/", data, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
};

const resetPassword = (data: ResetPasswordData) => {
  return API.post("/auth/users/reset_password/", data)
}

const newPassword = (data: NewPasswordData) => {
  return API.post("/auth/users/reset_password_confirm/", data);
};

export default {
    getPost, getSignlePost, signUpUser,
    activateUser, signInUser, getUserInfo,
    verifyToken, refreshToken, getMyPost, 
    addNewPost, resetPassword, newPassword
}



