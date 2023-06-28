import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ACCESS_TOKEN_KEY } from "../../utils/constants";
import { getUserInfoResponse } from "../sagas/@types";
import { RootState } from "../store";
import { ActivateUserPayload, NewPasswordPayload, ResetPasswordPayload, SignInUserPayload, SignUpUserPauload } from "./@type";

type initialType = {
    isLoggedIn: boolean; 
    userInfo: getUserInfoResponse | null
}

const initialState: initialType = {
    isLoggedIn: !! localStorage.getItem(ACCESS_TOKEN_KEY),
    userInfo: null,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        signUser: (_, __: PayloadAction<SignUpUserPauload>) => {},
        activateUser: (_, __: PayloadAction<ActivateUserPayload>) => {},

  
        signInUser: (_, __: PayloadAction<SignInUserPayload>) => {},
        setLoggedIn: (state, actions: PayloadAction<boolean>) => {
            state.isLoggedIn = actions.payload
        },
        logoutUser: (_, __: PayloadAction<undefined>) => {},


        getUserInfo: (_, __: PayloadAction<undefined>) => {},
        setUserInfo: (state, actions: PayloadAction<getUserInfoResponse | null>) => {
            state.userInfo = actions.payload
        },
        resetPassword: (_,__: PayloadAction<ResetPasswordPayload>) => {},
        newPassword: (_, __: PayloadAction<NewPasswordPayload>) => {},
    }
})

export const {signUser, activateUser, signInUser, setLoggedIn, logoutUser, getUserInfo, setUserInfo, resetPassword, newPassword} = authSlice.actions

export default authSlice.reducer

export const AuthSalectors = {
    getLoggendIn: (state: RootState) => state.auth.isLoggedIn,
    getUserNameInfo: (state: RootState) => state.auth.userInfo
}