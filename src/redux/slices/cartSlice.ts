import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItem: [],
  },

  reducers: {
    setCart: (state, action) => {
      state.cartItem = action.payload;
    },

    clearCart: (state) => {
      state.cartItem = [];
    },
  },
});

export const { setCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
