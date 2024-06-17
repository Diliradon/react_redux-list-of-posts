import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { usersApi } from '../api/usersApi';
import { postsApi } from '../api/postsApi';
import { commentsApi } from '../api/commenrtApi';

export const store = configureStore({
  reducer: {
    usersApi: usersApi.reducer,
    postsApi: postsApi.reducer,
    commentsApi: commentsApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .concat(usersApi.middleware)
      .concat(postsApi.middleware)
      .concat(commentsApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

/* eslint-disable @typescript-eslint/indent */
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
/* eslint-enable @typescript-eslint/indent */
