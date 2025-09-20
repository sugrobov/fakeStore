import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./productsSlice";
import authReducer from "./authSlice";
import cartReducer, { cartMiddleware} from "./cartSlice";

export const store = configureStore({
    reducer: {
        products: productsReducer,
        auth: authReducer,
        cart: cartReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(cartMiddleware)
});
