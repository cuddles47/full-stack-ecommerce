import { CartState } from '../slices/cartSlice';

const localStorageName = 'cartStore';

export const loadCartState = (): CartState => {
  const defaultState: CartState = { items: [], isVisible: false };
  try {
    const serialized = localStorage.getItem(localStorageName);
    if (!serialized) return defaultState;
    const parsed = JSON.parse(serialized) as { items: CartState['items'] };
    return { items: parsed.items, isVisible: defaultState.isVisible };
  } catch {
    return defaultState;
  }
};

export const saveCartState = (state: CartState) => {
  try {
    const serialized = JSON.stringify({ items: state.items });
    localStorage.setItem(localStorageName, serialized);
  } catch {
    console.error('Failed to save cart state');
  }
};