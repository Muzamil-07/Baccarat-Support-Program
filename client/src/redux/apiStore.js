import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { nodeApi } from "../services/nodeApi";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import userReducer from "./userSlice";

const reducers = combineReducers({
  [nodeApi.reducerPath]: nodeApi.reducer,
  user: userReducer
});

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["nodeApi"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const apiStore = configureStore({
  reducer: persistedReducer,

  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(nodeApi.middleware),
});

setupListeners(apiStore.dispatch);