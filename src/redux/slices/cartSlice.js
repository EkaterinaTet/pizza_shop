import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalPrice: 0,
  items: [],
};
const findItems = (state, action) => {
  return state.items.find(
    (obj) =>
      obj.id === action.payload.id &&
      obj.size === action.payload.size &&
      obj.type === action.payload.type
  );
};
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const findItem = findItems(state, action);
      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }

      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },

    minusItem: (state, action) => {
      const findItem = findItems(state, action);
      if (findItem && findItem.count > 1) {
        findItem.count--;
      }

      state.totalPrice = state.items.reduce((sum, obj) => {
        return sum + obj.price * obj.count;
      }, 0);
    },

    removeItem: (state, action) => {
      const findItem = findItems(state, action);
      state.totalPrice -= findItem.price * findItem.count;
      state.items = state.items.filter((obj) => {
        return (
          obj.id !== action.payload.id ||
          obj.size !== action.payload.size ||
          obj.type !== action.payload.type
        );
      });
    },

    clearItems: (state) => {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions;

export default cartSlice.reducer;
