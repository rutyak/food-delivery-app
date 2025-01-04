
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import cartReducer from "./slice/cartSlice";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: "root",
    storage
} 

const rootReducer = combineReducers({
    cart: cartReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer
})

const persistor = persistStore(store);

export {store, persistor};