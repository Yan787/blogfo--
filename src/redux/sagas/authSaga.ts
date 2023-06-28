import { all, call, put, takeLatest } from "redux-saga/effects"
import { ApiResponse } from "apisauce"
import { activateUser, getUserInfo, logoutUser, newPassword, resetPassword, setLoggedIn, setUserInfo, signInUser, signUser } from "../reducers/authSlice"
import API from "../api"
import { PayloadAction } from "@reduxjs/toolkit"
import { ActivateUserPayload, AddPostPayload, NewPasswordPayload, ResetPasswordPayload, SignInUserPayload, SignUpUserPauload } from "../reducers/@type"
import { getUserInfoResponse, SignInResponse, signUpUserResponse } from "./@types"
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "../../utils/constants"
import callCheckingAuth from "./callCheckingAuth"
import { addNewPost } from "../reducers/postSlice"

function* signUpUserWorker(actions: PayloadAction<SignUpUserPauload>) {
    const {data, callback} = actions.payload
    const {ok, problem}: ApiResponse<signUpUserResponse> = yield call(API.signUpUser, data)
    if(ok) {
        callback()
    } else {
        console.warn("Error sign up user", problem)
    }
}
function* activateUserWorker(actions: PayloadAction<ActivateUserPayload>) {
    const {data, callback} = actions.payload
    const {ok, problem}: ApiResponse<undefined> = yield call(API.activateUser, data)
    if(ok) {
        callback()
    } else {
        console.warn("Error sign acti user", problem)
    }
}



function* signInUserWorker(actions: PayloadAction<SignInUserPayload>) {
    const {data, callback} = actions.payload
    const {ok, problem, data: responseDate}: ApiResponse<SignInResponse> = yield call(API.signInUser, data)
    if(ok && responseDate) {
        localStorage.setItem(ACCESS_TOKEN_KEY, responseDate?.access)
        localStorage.setItem(REFRESH_TOKEN_KEY, responseDate?.refresh)
        callback()
        yield put(setLoggedIn(true))
    } else {
        console.warn("Error sign acti user", problem)
    }
}
function* logoutUserWorker(){
    localStorage.removeItem(ACCESS_TOKEN_KEY)
    localStorage.removeItem(REFRESH_TOKEN_KEY)
    yield put(setLoggedIn(false))
}




function* getUserInfoWorker() {
        const {ok, problem, data}: ApiResponse<getUserInfoResponse> = yield callCheckingAuth(API.getUserInfo)
        if(ok && data) {
            yield put(setUserInfo(data))
        } else {
            console.warn("Error sign in user", problem)
        }
}


function* addNewPostWorker(actions: PayloadAction<AddPostPayload>) {
    const {data, callback} = actions.payload
    const {ok, problem}: ApiResponse<undefined> = yield callCheckingAuth(API.addNewPost, data)
    if(ok) {
        callback()
    } else {
        console.warn("Error adding post", problem)
    }
}

function* resetPasswordWorker(actions: PayloadAction<ResetPasswordPayload>) {
    const {data, callback} = actions.payload
    const {ok, problem}: ApiResponse<undefined> = yield call(API.resetPassword, data)
    if(ok) {
        callback()
    } else {
        console.warn("Error sign acti user", problem)
    }
}

function* newPasswordWorker(actions: PayloadAction<NewPasswordPayload>) {
    const {data, callback} = actions.payload
    const {ok, problem}: ApiResponse<undefined> = yield call(API.newPassword, data)
    if(ok) {
        callback()
    } else {
        console.warn("Error sign acti user", problem)
    }
}


export default function* postSaga() {
    yield all ([
        takeLatest(signUser, signUpUserWorker),
        takeLatest(activateUser, activateUserWorker),
        takeLatest(signInUser, signInUserWorker),
        takeLatest(logoutUser, logoutUserWorker),
        takeLatest(getUserInfo, getUserInfoWorker),
        takeLatest(addNewPost, addNewPostWorker),
        takeLatest(resetPassword, resetPasswordWorker),
        takeLatest(newPassword, newPasswordWorker),
    ])
}


