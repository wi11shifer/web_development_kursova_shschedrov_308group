import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedItems: [],
};

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const existingItem = state.selectedItems.find((item) => item.id === action.payload.id);
      if (!existingItem) {
        state.selectedItems.push({ ...action.payload, quantity: 1 });
      }
    },
    removeItem: (state, action) => {
      state.selectedItems = state.selectedItems.filter((item) => item.id !== action.payload);
    },
    updateItemQuantity: (state, action) => {
      const item = state.selectedItems.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
  },
});

export const { addItem, removeItem, updateItemQuantity } = itemsSlice.actions;
export default itemsSlice.reducer;
