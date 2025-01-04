import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
  },
  reducers: {
    addCart: (state, action) => {
      const exists = state.cartItems.find(
        (item) => item.id === action.payload.id
      );
      if (exists) {
        exists.quantity += 1;
      } else {
        state.cartItems.push({ ...action.payload, quantity: 1 });
      }
    },
    removeCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
    },
    clearAllCart: (state, action) => {
      state.cartItems = [];
    },
  },
});

export const { addCart, removeCart, clearAllCart } = cartSlice.actions;

export default cartSlice.reducer;
