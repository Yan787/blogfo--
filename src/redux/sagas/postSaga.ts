import { ApiResponse } from "apisauce";
import { all, call, put, takeLatest, takeLeading } from "redux-saga/effects";
import { getAllPosts, setAllPosts, getSinglePost, setSinglePost, getMyPost, setMyPost, getSearchedPost, setSearchedPost, setAllPostsLoading } from "../reducers/postSlice";
import { AllPostsRosponse } from "./@types";
import API from "../api"
import { CardType } from "../../utils/@globalTypes";
import { PayloadAction } from "@reduxjs/toolkit";
import callCheckingAuth from "./callCheckingAuth";
import { GetAllPostsPayload, GetSearchPostsPauload } from "../reducers/@type";

function* getAllPostWorker(action: PayloadAction<GetAllPostsPayload>) {
    yield put(setAllPostsLoading(true))
    const { offset, ordering } = action.payload
    const {ok, data, problem}: ApiResponse<AllPostsRosponse> = yield call(API.getPost, offset, ordering)
    if(ok && data) {
        yield put(setAllPosts({cardList: data.results, postsCount: data.count}))
    } else {
        console.warn("Error getting all Posts", problem)
    }
    yield put(setAllPostsLoading(false))
}

function* getSearchPostWorker(action: PayloadAction<GetSearchPostsPauload>) {
    const {searchValue, isOverwrite, offset} = action.payload
    const {ok, data, problem}: ApiResponse<AllPostsRosponse> = yield call(API.getPost, offset, '', searchValue)
    if(ok && data) {
        yield put(setSearchedPost({ cardList: data.results, postsCount: data.count, isOverwrite }))
    } else {
        console.warn("Error getting all Posts", problem)
    }
}

function* getSinglePostWorker(action: PayloadAction<string>) {
    const {ok, data, problem}: ApiResponse<CardType> = yield call(API.getSignlePost, action.payload)
    if(ok && data) {
        yield put(setSinglePost(data))
    } else {
        console.warn("Error getting all Posts", problem)
    }
}

function* getMyPostWorker() {
    const {ok, data, problem, status}: ApiResponse<AllPostsRosponse> = yield callCheckingAuth(API.getMyPost) 
    if(ok && data) {
        yield put(setMyPost(data.results))
    } else if (status === 404) {
        console.log("нет постов")
    } else {
        console.warn("Error getting my posts", problem)
    }
}

export default function* postSaga() {
    yield all ([
        takeLatest(getAllPosts, getAllPostWorker),
        takeLeading(getSearchedPost, getSearchPostWorker),
        takeLatest(getSinglePost, getSinglePostWorker),
        takeLatest(getMyPost, getMyPostWorker),
    ])
}