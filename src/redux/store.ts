import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' 

import themeReducers from "./reducers/themeSlice"
import modalReducer from "./reducers/postSlice";
import createSagaMiddleware from "@redux-saga/core";
import rootSaga from "./sagas/rootSaga";
import authReducer from "./reducers/authSlice";
import persistStore from "redux-persist/es/persistStore";
 

const middleware = createSagaMiddleware()

const rootReducer = combineReducers({
    theme: themeReducers,
    post: modalReducer,
    auth: authReducer,
})

const persistConfig = {
    key: 'root',
    storage,
  }

const persistedReducer = persistReducer(persistConfig, rootReducer)
 

const store = configureStore({
    reducer: persistedReducer,
    middleware: [middleware]
})

middleware.run(rootSaga)

export type RootState = ReturnType<typeof store.getState>

export let persistor = persistStore(store)

export default store
