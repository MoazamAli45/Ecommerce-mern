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
      const products = await api.get(
        `/api/v1/products?colors=${colors}&sizes=${sizes}&minPrice=${minPrice}&maxPrice=${maxPrice}&category=${category}&stock=${stock}&sort=${sort}&pageNumber=${pageNumber}&pageSize=${pageSize}`
      );

      console.log(products.data.data);
      // if (products.status === "error" || products.status === "fail") {
      //   throw new Error(products.message);
      // }
      return products.data.data;
    } catch (err) {
      // console.log(err);
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);

export const getProductById = createAsyncThunk(
  "product/getById",
  async (id, thunkAPI) => {
    try {
      const product = await api.get(`/api/v1/products/${id}`);

      console.log(product.data.data);
      return product.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
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
