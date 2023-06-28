import postSaga from "./postSaga";
import { all } from "redux-saga/effects"
import authSaga from "./authSaga";

export default function* rootSaga() {
    yield all ([postSaga(), authSaga()])
}


