import { createSlice } from "@reduxjs/toolkit";

function loadCartFromLocalStorage() {
  try {
    const serializedCart = localStorage.getItem("cart");
    if (serializedCart) {
      return JSON.parse(serializedCart);
    }
  } catch (error) {
    console.error("Failed to load cart from localStorage", error);
  }
  return { items: [] };
}

export const cartSlice = createSlice({
  name: "cart",
  initialState: loadCartFromLocalStorage(),
  reducers: {
    addToCart: (state, action) => {
      const { id, title, image, price, discont_price, quantity } =
        action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({
          id,
          quantity,
          title,
          image,
          price,
          discont_price,
        });
      }
      saveCartToLocalStorage(state);
    },

    decrementFromCart: (state, action) => {
      const { id } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
      }
      saveCartToLocalStorage(state);
    },

    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      if (existingItem) {
        existingItem.quantity = quantity;
      }
      saveCartToLocalStorage(state);
    },

    removeItem: (state, action) => {
      const { id } = action.payload;
      state.items = state.items.filter((item) => item.id !== id);
      saveCartToLocalStorage(state);
    },

    clearCart: (state) => {
      state.items = [];
      saveCartToLocalStorage(state);
    },
  },
});

function saveCartToLocalStorage(cartState) {
  try {
    const serializedCart = JSON.stringify(cartState);
    localStorage.setItem("cart", serializedCart);
  } catch (error) {
    console.error("Failed to save cart to localStorage", error);
  }
}

export const {
  addToCart,
  decrementFromCart,
  updateQuantity,
  removeItem,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
