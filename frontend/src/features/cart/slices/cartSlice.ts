import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { TCartItem } from '../types/cart';

export interface CartState {
  items: TCartItem[];
  isVisible: boolean;
}

const initialState: CartState = {
  items: [],
  isVisible: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<TCartItem>) => {
      const idx = state.items.findIndex(i => i.productId === action.payload.productId);
      if (idx > -1) {
        state.items[idx].quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
      state.isVisible = true;
    },
    toggleCart: (state, action: PayloadAction<boolean>) => {
      state.isVisible = action.payload;
    },
    remove: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(i => i.productId !== action.payload);
    },
    modifyQuantity: (
      state,
      action: PayloadAction<{ productId: string; amount: number }>
    ) => {
      const item = state.items.find(i => i.productId === action.payload.productId);
      if (item) item.quantity += action.payload.amount;
    },
  },
});

export const { add, remove, modifyQuantity, toggleCart } = cartSlice.actions;
export default cartSlice.reducer;