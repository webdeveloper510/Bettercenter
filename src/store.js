// store.js
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';

// Load cart state from localStorage
const loadCartFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('cartState');
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    console.error('Could not load cart state', e);
    return undefined;
  }
};

const saveCartToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('cartState', serializedState);
  } catch (e) {
    console.error('Could not save cart state', e);
  }
};

const preloadedState = {
  cart: loadCartFromLocalStorage() || {
    items: [],
    totalQuantity: 0,
  }
};

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  preloadedState
});

// Save cart state to localStorage on every change
store.subscribe(() => {
  saveCartToLocalStorage(store.getState().cart);
});
