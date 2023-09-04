import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../src/customer/components/config/config";
const initialState = {
  products: [],
  product: {},
  isLoading: false,
  error: "",
};

export const getAllProducts = createAsyncThunk(
  "product/getAll",
  async (reqData, thunkAPI) => {
    const {
      colors,
      sizes,
      minPrice,
      maxPrice,
      category,
      stock,
      sort,
      pageNumber,
      pageSize,
    } = reqData;

    try {
      const data = await api.get(
        `/api/v1/products?colors=${colors}&sizes=${sizes}&minPrice=${minPrice}&maxPrice=${maxPrice}&category=${category}&stock=${stock}&sort=${sort}&pageNumber=${pageNumber}&pageSize=${pageSize}`
      );
      const products = await data.json();

      if (products.status === "error" || products.status === "fail") {
        throw new Error(products.message);
      }
      return products;
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const getProductById = createAsyncThunk(
  "product/getById",
  async (id, thunkAPI) => {
    try {
      const data = await api.get(`/api/v1/products/${id}`);
      const product = await data.json();
      if (product.status === "error" || product.status === "fail") {
        throw new Error(product.message);
      }
      return product;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
    });
    builder.addCase(getAllProducts.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    //  get Product By Id
    builder.addCase(getProductById.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getProductById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.product = action.payload;
    });
    builder.addCase(getProductById.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export default productSlice.reducer;
