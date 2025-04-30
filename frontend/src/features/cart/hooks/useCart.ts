import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '@/store';
import type { CartState } from '../slices/cartSlice';
import type { TCartItem } from '../types/cart';
import { add, remove, modifyQuantity, toggleCart } from '../slices/cartSlice';

export const useCart = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, isVisible } = useSelector<RootState, CartState>((state) => state.cart);

  const onAdd = (item: TCartItem) => dispatch(add(item));
  const onRemove = (productId: string) => dispatch(remove(productId));
  const onModify = (payload: { productId: string; amount: number }) => dispatch(modifyQuantity(payload));
  const onToggle = (visible: boolean) => dispatch(toggleCart(visible));

  return { items, isVisible, onAdd, onRemove, onModify, onToggle };
};