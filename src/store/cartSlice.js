import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import localforage from "localforage";

const initialState = {
    items: [],
}

export const loadCart = createAsyncThunk("cart/loadCart", async () => {
    const cart = await localforage.getItem("cart") || [];
    return cart;
});

export const saveCart = createAsyncThunk("cart/saveCart", async (cart, { rejectWithValue }) => {
    try {
        await localforage.setItem("cart", cart);
        return cart;
    } catch (error) {
        console.error("Ошибка сохранения корзины:", error);
        return rejectWithValue(error.message);
    }
});

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            console.log('Adding to cart:', action.payload);
            const existingItem = state.items.find(item => item.id === action.payload.id);
            if (existingItem) {
                existingItem.quantity += 1;
                console.log('Increased quantity for:', existingItem.id);
            } else {
                    const newItem = { ...action.payload, quantity: 1 };
                    state.items.push(newItem);
                    console.log('Added new item:', newItem.id);
            }
            },
            removeFromCart: (state, action) => {
                state.items = state.items.filter(
                    (item) => item.id !== action.payload
                );
            },
            updateQuantity: (state, action) => {
                const { id, quantity } = action.payload;
                const item = state.items.find(item => item.id === id);
                if (item) {
                    item.quantity = quantity
                }
            },
            clearCart: (state) => {
                state.items = []
            }
            },
            extraReducers: (builder) => {
                builder
                    .addCase(loadCart.fulfilled, (state, action) => {
                        state.items = action.payload;
                    })
                    .addCase(saveCart.fulfilled, (state, action) => {
                        state.items = action.payload;
                    });
            }
});

export const cartMiddleware = store => next => action => {
  const result = next(action);
  
  if (action.type.startsWith("cart/")) {
    const state = store.getState();
    // console.log('Saving cart to localForage:', state.cart.items);
    localforage.setItem("cart", state.cart.items);
  }
  
  return result;
};

// для инициализации корзины
export const initializeCart = () => async (dispatch) => {
  try {
    const savedCart = await localforage.getItem("cart") || [];
    dispatch({ type: 'cart/loadCart/fulfilled', payload: savedCart });
  } catch (error) {
    console.error("Ошибка загрузки корзины:", error);
  }
};


export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;