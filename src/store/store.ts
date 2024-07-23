import { configureStore } from '@reduxjs/toolkit';
import releaseReducer from './releaseSlice';

export const store = configureStore({
  reducer: {
    release: releaseReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;