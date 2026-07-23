// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

// Import only the slices you currently have
// Add more imports here as you create new slices
// import authReducer from './slices/authSlice';
// import walletReducer from './slices/walletSlice';

export const store = configureStore({
  reducer: {
    // Register your slices here
    // auth: authReducer,
    // wallet: walletReducer,
    
    // TODO: Add more reducers as you build them
    // game: gameReducer,
    // ui: uiReducer,
    // history: historyReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['auth/setUser'],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Typed hooks
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;