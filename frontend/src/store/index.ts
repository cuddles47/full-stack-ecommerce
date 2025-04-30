import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../features/cart/slices/cartSlice';
import { loadCartState, saveCartState } from '../features/cart/utils/storeLocalStorage';
import type { CartState } from '../features/cart/slices/cartSlice';

// Preload persisted cart state
const preloadedState: { cart: CartState } = {
  cart: loadCartState(),
};

export const store = configureStore<{ cart: CartState }>({
  reducer: {
    cart: cartReducer,
  },
  preloadedState,
});

// Persist cart on state changes
store.subscribe(() => {
  saveCartState(store.getState().cart);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;