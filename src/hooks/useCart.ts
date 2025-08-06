import { useState } from 'react';
import { CartItem, FoodOrder } from '../types/food.types';

export function useCart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [completedOrder, setCompletedOrder] = useState<FoodOrder | null>(null);

  const getTotalCartItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const handleOrderSuccess = (order: FoodOrder) => {
    setCompletedOrder(order);
    clearCart();
  };

  return {
    cartItems,
    setCartItems,
    getTotalCartItems,
    completedOrder,
    clearCart,
    handleOrderSuccess,
  };
}