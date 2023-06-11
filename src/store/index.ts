import { configureStore, ThunkAction, AnyAction } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";

const store = configureStore({ reducer: rootReducer });

export type RootState = ReturnType<typeof rootReducer>;
export type AppThunk<T = void> = ThunkAction<T, RootState, unknown, AnyAction>;
export type AppDispatch = typeof store.dispatch;

export default store;
