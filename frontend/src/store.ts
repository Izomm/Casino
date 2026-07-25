// src/store/store.ts
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { loadState, saveState } from "./utils/localStorage";

// Import all reducers from features
import authReducer from './features/auth/AuthSlice';
import gameReducer from './features/game/Gameslice';
import uiReducer from './features/ui/UiSlice';


// ⭐ NAMED IMPORTS - Gets individual actions (optional)
import { 
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  updateBalance,
  clearError,
} from './features/auth/AuthSlice'

import {
gameActions
} from './features/game/Gameslice';

import {
   uiActions  
} from './features/ui/UiSlice';


// ============================================
// CONFIGURE STORE
// ============================================


// Combine reducers manually
const rootReducer = combineReducers({
  auth: authReducer,
  games: gameReducer,
  ui: uiReducer,
});

export const store = configureStore({
  devTools: process.env.NODE_ENV !== "production",
  preloadedState: loadState() || {},
  reducer: rootReducer,  // Pass the combined reducer
});



// ============================================
// EXPORT TYPES
// ============================================

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// ============================================
// TYPED HOOKS (For use in components)
// ============================================

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// ============================================
// EXPORT ALL ACTIONS (Convenience)
// ============================================

// Re-export all actions from features
// Correct: Go up one level from /store to /src, then into /features
export default store;