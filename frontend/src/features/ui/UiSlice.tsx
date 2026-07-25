// src/features/ui/uiSlice.tsx
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// ============================================
// TYPES
// ============================================

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  duration?: number;
}

export interface ModalData {
  type: string;
  data?: any;
}

export interface UIState {
  isLoading: boolean;
  loadingMessage: string | null;
  modal: ModalData | null;
  theme: 'light' | 'dark';
  sidebarOpen: boolean;
  notifications: ToastMessage[];
  soundEnabled: boolean;
  animationsEnabled: boolean;
  autoplayEnabled: boolean;
  currentPage: string;
  breadcrumbs: string[];
  error: string | null;
}

// ============================================
// INITIAL STATE
// ============================================

const initialState: UIState = {
  isLoading: false,
  loadingMessage: null,
  modal: null,
  theme: (localStorage.getItem('theme') as 'light' | 'dark') || 'dark',
  sidebarOpen: false,
  notifications: [],
  soundEnabled: localStorage.getItem('soundEnabled') !== 'false',
  animationsEnabled: localStorage.getItem('animationsEnabled') !== 'false',
  autoplayEnabled: localStorage.getItem('autoplayEnabled') === 'true',
  currentPage: 'home',
  breadcrumbs: ['Home'],
  error: null,
};

// ============================================
// SLICE
// ============================================

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    // -------- LOADING --------
    showLoading: (state, action: PayloadAction<string | undefined>) => {
      state.isLoading = true;
      state.loadingMessage = action.payload || 'Loading...';
    },
    hideLoading: (state) => {
      state.isLoading = false;
      state.loadingMessage = null;
    },

    // -------- THEME --------
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload;
      document.documentElement.className = `${action.payload}-theme`;
      localStorage.setItem('theme', action.payload);
    },
    toggleTheme: (state) => {
      const newTheme = state.theme === 'light' ? 'dark' : 'light';
      state.theme = newTheme;
      document.documentElement.className = `${newTheme}-theme`;
      localStorage.setItem('theme', newTheme);
    },

    // -------- SIDEBAR --------
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    openSidebar: (state) => {
      state.sidebarOpen = true;
    },
    closeSidebar: (state) => {
      state.sidebarOpen = false;
    },

    // -------- NOTIFICATIONS --------
    addNotification: (state, action: PayloadAction<Omit<ToastMessage, 'id'>>) => {
      const id = Date.now().toString();
      state.notifications.push({
        ...action.payload,
        id,
        duration: action.payload.duration || 3000,
      });
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(n => n.id !== action.payload);
    },
    clearNotifications: (state) => {
      state.notifications = [];
    },

    // -------- MODAL --------
    openModal: (state, action: PayloadAction<{ type: string; data?: any }>) => {
      state.modal = action.payload;
      document.body.style.overflow = 'hidden';
    },
    closeModal: (state) => {
      state.modal = null;
      document.body.style.overflow = '';
    },

    // -------- PAGE NAVIGATION --------
    setCurrentPage: (state, action: PayloadAction<string>) => {
      state.currentPage = action.payload;
    },
    setBreadcrumbs: (state, action: PayloadAction<string[]>) => {
      state.breadcrumbs = action.payload;
    },
    addBreadcrumb: (state, action: PayloadAction<string>) => {
      state.breadcrumbs.push(action.payload);
    },
    clearBreadcrumbs: (state) => {
      state.breadcrumbs = ['Home'];
    },

    // -------- SETTINGS --------
    toggleSound: (state) => {
      state.soundEnabled = !state.soundEnabled;
      localStorage.setItem('soundEnabled', String(state.soundEnabled));
    },
    toggleAnimations: (state) => {
      state.animationsEnabled = !state.animationsEnabled;
      localStorage.setItem('animationsEnabled', String(state.animationsEnabled));
    },
    toggleAutoplay: (state) => {
      state.autoplayEnabled = !state.autoplayEnabled;
      localStorage.setItem('autoplayEnabled', String(state.autoplayEnabled));
    },

    // -------- ERROR --------
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },

    // -------- RESET --------
    resetUI: (state) => {
      state.modal = null;
      state.error = null;
      state.isLoading = false;
      state.loadingMessage = null;
    },
  },
});

// ============================================
// EXPORT
// ============================================

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;