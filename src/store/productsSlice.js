import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";

import localforage from "localforage";

const initialState = {
  customProducts: [], // начальное состояние
};

/**
 * @async Thunk для добавления продукта
 */
export const addProductAsync = createAsyncThunk(
  "products/addProduct",
  async (product, { rejectWithValue, dispatch }) => {
    const newProduct = { ...product, id: `custom_${nanoid()}` };
    try {
      await localforage.setItem("customProducts", [
        ...(await localforage.getItem("customProducts") || []),
        newProduct,
      ]);
      return newProduct;
    } catch (error) {
      dispatch(productsSlice.actions.removeProduct(newProduct.id)); // Откат
      return rejectWithValue(error.message);
    }
  }
);

/**
 * slice для продуктов
 */
export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.customProducts.push(action.payload);
    },
    removeProduct: (state, action) => {
      state.customProducts = state.customProducts.filter(
        (product) => product.id !== action.payload
      );
    },
    updateProduct: (state, action) => {
      state.customProducts = state.customProducts.map((product) => {
        if (product.id === action.payload.id) {
          return action.payload;
        }
        return product;
      });
    },
    setProducts: (state, action) => {
      state.customProducts = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addProductAsync.fulfilled, (state, action) => {
        state.customProducts.push(action.payload);
      })
      .addCase(addProductAsync.rejected, (state, action) => {
        console.error("Ошибка при добавлении продукта:", action.error);
      });
  }
});

// Middleware для загрузки данных при инициализации
export const initializeProducts = () => async (dispatch) => {
  try {
    const savedProducts = await localforage.getItem("customProducts");
    if (savedProducts && Array.isArray(savedProducts)) {
      // Проверяем, что все продукты имеют префикс 'custom_'
      const validProducts = savedProducts.map(product => ({
        ...product,
        id: product.id.startsWith('custom_') ? product.id : `custom_${product.id}` // добавляем, если без префикса
      }));
      dispatch(productsSlice.actions.setProducts(validProducts));
    } else {
      console.warn("Данные не найдены или повреждены.");
    }
  } catch (error) {
    console.error("Ошибка при инициализации продуктов:", error);
  }
};

export const { addProduct, removeProduct, updateProduct, setProducts }
  = productsSlice.actions;
export default productsSlice.reducer;