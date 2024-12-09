import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  model: string;
  brand: string;
}

interface ProductsState {
  items: Product[];
  wishlistItems: Product[];
  status: "idle" | "loading" | "succeeded" | "error";
}

const initialState: ProductsState = {
  items: [],
  wishlistItems: [],
  status: "idle",
};

export const fetchProducts = createAsyncThunk<Product[]>(
  "products/fetchProducts",
  async () => {
    const response = await fetch(
      "https://fakestoreapi.in/api/products?limit=100"
    );

    if (!response.ok) {
      throw new Error(`Ошибка загрузки данных: ${response.statusText}`);
    }

    const data = await response.json();
    return data.products as Product[];
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: initialState,
  reducers: {
    addItem(state, action: PayloadAction<Product>) {
      state.items = [action.payload, ...state.items];
    },
    deleteItem(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload);
      state.wishlistItems = state.wishlistItems.filter(
        (item) => item.id !== action.payload
      );
    },
    toggleItemToWishlist(state, action) {
      const item: Product | undefined = state.wishlistItems.find(
        (item) => item.id === action.payload.id
      );

      if (!item) state.wishlistItems.push(action.payload);
      else
        state.wishlistItems = state.wishlistItems.filter(
          (item) => item.id !== action.payload.id
        );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.items = state.items.concat(action.payload);
        state.status = "succeeded";
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.status = "error";
      });
  },
});

export default productsSlice.reducer;
export const { addItem, deleteItem, toggleItemToWishlist } =
  productsSlice.actions;
