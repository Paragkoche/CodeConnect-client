"use client";
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import uiReducer from "./slices/ui.reducer";
import userReducer from "./slices/user.reducer";

import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";
import localForage from "localforage";

function storage(dbName: string) {
  const db = localForage.createInstance({
    name: dbName,
  });
  return {
    db,
    getItem: db.getItem,
    setItem: db.setItem,
    removeItem: db.removeItem,
  };
}

const persistConfig = {
  key: "root",
  storage: storage("myDB"),
};
const persistedReducer = persistReducer(persistConfig, userReducer);
export const store = configureStore({
  reducer: {
    uiReducer,
    userReducer: persistedReducer,
  },
  middleware: [thunk],
});
setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
