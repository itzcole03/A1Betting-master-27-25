import type { AuthSlice } from '@/store/slices/authSlice.ts';
import { createAuthSlice, initialAuthState } from '@/store/slices/authSlice.ts';
import type { BetSlipSlice } from '@/store/slices/betSlipSlice.ts';
import {
  createBetSlipSlice,
  initialBetSlipState,
} from '@/store/slices/betSlipSlice.ts';
import type { DynamicDataSlice } from '@/store/slices/dynamicDataSlice.ts';
import {
  createDynamicDataSlice,
  initialDynamicDataState,
} from '@/store/slices/dynamicDataSlice.ts';
import type { NotificationSlice } from '@/store/slices/notificationSlice.ts';
import {
  createNotificationSlice,
  initialNotificationState,
} from '@/store/slices/notificationSlice.ts';
import type { PrizePicksSlice } from '@/store/slices/prizePicksSlice.ts';
import {
  createPrizePicksSlice,
  initialPrizePicksState,
} from '@/store/slices/prizePicksSlice.ts';
import { create } from 'zustand.ts';
import { persist, createJSONStorage } from 'zustand/middleware.ts';

// Define the AppState as a combination of all slice states;
export type AppState = AuthSlice &
  PrizePicksSlice &
  BetSlipSlice &
  NotificationSlice &
  DynamicDataSlice;

export type AppStore = AppState;

export const useAppStore = create<AppStore>()(
  persist(
    (set, get, api) => ({
      ...initialAuthState,
      ...initialPrizePicksState,
      ...initialBetSlipState,
      ...initialNotificationState,
      ...initialDynamicDataState,
      ...createAuthSlice(set as any, get as any, api as any),
      ...createPrizePicksSlice(set as any, get as any, api as any),
      ...createBetSlipSlice(set as any, get as any, api as any),
      ...createNotificationSlice(set as any, get as any, api as any),
      ...createDynamicDataSlice(set as any, get as any, api as any),
    }),
    {
      name: 'ai-sports-betting-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: state => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        webSocketClientId: state.webSocketClientId,
        themeSettings: (state as any).themeSettings,
        legs: state.legs,
        stake: state.stake,
      }),
    }
  )
);

// --- Selectors ---
export const selectIsAuthenticated = (state: AppStore) => state.isAuthenticated;
export const selectUser = (state: AppStore) => state.user;
export const selectBetSlipLegs = (state: AppStore) => state.legs;
export const selectToasts = (state: AppStore) => state.toasts;
export const selectUserBettingSummary = (state: AppStore) => {
  return {
    userName: state.user?.username,
    totalEntries: state.entries.length,
    currentBetSlipValue: state.potentialPayout,
  };
};
export const selectPropsForLeague = (league: string) => (state: AppStore) =>
  state.props.filter(p => (p.league || '').toLowerCase() === league.toLowerCase());
export function getInitialState(): AppStore {
  return {
    ...initialAuthState,
    ...initialPrizePicksState,
    ...initialBetSlipState,
    ...initialNotificationState,
    ...initialDynamicDataState,
  } as AppStore;
}
