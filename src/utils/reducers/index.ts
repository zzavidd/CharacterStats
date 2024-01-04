/* eslint-disable @typescript-eslint/no-empty-interface */
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { Order } from 'natural-orderby';
import type { TypedUseSelectorHook } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from 'redux-persist';
import localStorage from 'redux-persist/lib/storage';

import * as reducers from './actions';

export const InitialAppState: AppState = {
  filters: [],
  sort: {
    property: 0,
    order: 'asc',
  },
  group: 0,
};

const slice = createSlice({
  name: 'local',
  initialState: InitialAppState,
  reducers,
});

export const store = configureStore({
  reducer: persistReducer(
    { key: 'local', version: 1, storage: localStorage },
    slice.reducer,
  ),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export const persistor = persistStore(store);

export const AppActions = { ...slice.actions };

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

export interface AppState {
  filters: [];
  sort: {
    property: number;
    order: Order;
  };
  group: number;
}

type AppDispatch = typeof store.dispatch;
