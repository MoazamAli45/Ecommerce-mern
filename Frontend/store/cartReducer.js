import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../src/customer/components/config/config";

const initialState = {
  cart: null,
  cartItems: [],
  isLoading: false,
  error: "",
};

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (data, thunkAPI) => {
    try {
      const data = await api.post(`/api/v1/carts`, data);
      const cart = await data.json();

      if (cart.status === "fail" || cart.status === "error") {
        throw new Error(cart.message);
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);
//  update Cart Item
export const updateCartItem = createAsyncThunk(
  "cart/updateCart",
  async (reqData, thunkAPI) => {
    try {
      const data = await api.patch(
        `/api/v1/cartItems/${reqData.cartItemId}`,
        reqData.data
      );
      const cartItem = await data.json();
      if (cartItem.status === "fail" || cartItem.status === "error") {
        throw new Error(cartItem.message);
      }
      return cartItem;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);
export const removeCartItem = createAsyncThunk(
  "cart/removeFromCart",
  async (data, thunkAPI) => {}
);
export const getCart = createAsyncThunk(
  "cart/addToCart",
  async (data, thunkAPI) => {}
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload;
      })
      //    Update Cart Item
      .addCase(updateCartItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCartItem.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      //    For Updating Cart Item
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = state.cartItems.map((item) =>
          item._id === action.payload._id ? action.payload : item
        );
      }),
});
