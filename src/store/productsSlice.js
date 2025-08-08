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
  async (product, { rejectWithValue }) => {
    try {
      const newProduct = {
        ...product,
        id: `custom_${nanoid()}`,
        thumbnail: product.thumbnail || `https://placehold.co/200x300/666666/FFFFFF?text=${encodeURIComponent(product.title)}`,
        rating: product.rating || 0,
        category: product.category || 'other',
        published: product.published !== undefined ? product.published : true,
      };

      const currentProducts = await localforage.getItem("customProducts") || [];
      const updatedProducts = [...currentProducts, newProduct];

      await localforage.setItem("customProducts", updatedProducts);
      return newProduct;
    } catch (error) {
      console.error("Ошибка добавления продукта:", error);
      return rejectWithValue(error.message);
    }
  }
);

/**
 * @async Thunk для обновления продукта
 */
export const updateProductAsync = createAsyncThunk(
  "products/updateProduct",
  async (updatedProduct, { rejectWithValue }) => {
    try {
      // console.log("Обновляем продукт в localForage:", updatedProduct);

      // 1. Получаем продукты
      const currentProducts = await localforage.getItem("customProducts") || [];
      // console.log("Текущие продукты из localForage:", currentProducts);

      // 2. Обновляем продукт
      const updatedProducts = currentProducts.map(product =>
        product.id === updatedProduct.id ? updatedProduct : product
      );
      // console.log("Обновленный массив продуктов:", updatedProducts);

      // 3. Сохраняем в localForage
      await localforage.setItem("customProducts", updatedProducts);
      // console.log("Продукты успешно обновлены в localForage");

      // 4. Возвращаем обновленный продукт для Redux
      return updatedProduct;
    } catch (error) {
      console.error("Error updating product in localForage:", error);
      return rejectWithValue(error.message);
    }
  }
);

/**
 * @async Thunk для переключения статуса публикации
 */
export const togglePublishAsync = createAsyncThunk(
  "products/togglePublish",
  async ({ productId, currentPublished }, { rejectWithValue }) => {
    try {
      const currentProducts = await localforage.getItem("customProducts") || [];
      const productIndex = currentProducts.findIndex(p => p.id === productId);
      if (productIndex !== -1) {
        throw new Error("Product not found")
      }

      const updatedProduct = {
        ...currentProducts[productIndex],
        published: !currentPublished,
      };

      const updatedProducts = [...currentProducts];
      updatedProducts[productIndex] = updatedProduct;

      await localforage.setItem("customProducts", updatedProducts);
      return updatedProduct;

    } catch (error) {
      console.error("Ошибка при переключении статуса:", error);
      return rejectWithValue(error.message);
    }

  }
);

/**
 * @async Thunk для удаления продукта
 */
export const removeProductAsync = createAsyncThunk(
  "products/removeProduct",
  async (productId, { rejectWithValue }) => {
    try {
      // console.log("Удаляем продукт с id:", productId);
      // Получаем продукты
      const currentProducts = await localforage.getItem("customProducts") || [];
      const updatedProducts = currentProducts.filter(p => p.id !== productId);
      await localforage.setItem("customProducts", updatedProducts);
      return productId; // ? - не нужно
    } catch (error) {
      console.error("Ошибка при удалении продукта:", error);
      return rejectWithValue(error.message);
    }
  }
);

/**
 * slice продуктов
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
      .addCase(updateProductAsync.fulfilled, (state, action) => {
        state.customProducts = state.customProducts.map(product =>
          product.id === action.payload.id ? action.payload : product
        );
      })
      .addCase(removeProductAsync.fulfilled, (state, action) => {
        state.customProducts = state.customProducts.filter(
          (product) => product.id !== action.payload
        );
      })
      .addCase(togglePublishAsync.fulfilled, (state, action) => {
        state.customProducts = state.customProducts.map(product => {
          product.id === action.payload.id ? action.payload : product
        });
      })
      .addCase(addProductAsync.rejected, (_, action) => {
        console.error("Ошибка при добавлении продукта:", action.error);
      })
      .addCase(updateProductAsync.rejected, (_, action) => {
        console.error("Ошибка при обновлении продукта:", action.error);
      })
      .addCase(togglePublishAsync.rejected, (_, action) => {
        console.error("Ошибка при переключении статуса:", action.payload);
      })
      .addCase(removeProductAsync.rejected, (_, action) => {
        console.error("Ошибка при удалении продукта:", action.error);
      });
  },
});

// Middleware для загрузки данных при инициализации
export const initializeProducts = () => async (dispatch) => {
  try {
    const savedProducts = await localforage.getItem("customProducts") || [];
    // console.log("Инициализация при загрузке:", savedProducts);

    if (!Array.isArray(savedProducts)) {
      await localforage.setItem("customProducts", []);
      dispatch(setProducts([]));
      return;
    }

    const validProducts = savedProducts.filter(product =>
      product?.id && product.title && !isNaN(product.price)
    );

    dispatch(setProducts(validProducts));
  } catch (error) {
    console.error("Ощибка при инициализации:", error);
    await localforage.setItem("customProducts", []);
    dispatch(setProducts([]));
  }
};

export const { addProduct, removeProduct, updateProduct, setProducts }
  = productsSlice.actions;
export default productsSlice.reducer;