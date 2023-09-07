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
      console.log(data);
      const cart = await api.post(`/api/v1/carts`, data);

      console.log(cart.data.data);

      return cart.data.data;
    } catch (err) {
      console.log(err.response.data.message);
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);
//  update Cart Item
export const updateCartItem = createAsyncThunk(
  "cart/updateCart",
  async (reqData, thunkAPI) => {
    console.log(reqData);
    try {
      const cartItem = await api.patch(
        `/api/v1/cartItems/${reqData.cartItemId}`,
        +reqData.data
      );
      console.log(cartItem.data.data);
      return cartItem.data.data;
    } catch (err) {
      console.log(err.response.data.message);
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);
export const removeCartItem = createAsyncThunk(
  "cart/removeFromCart",
  async (cartItemId, thunkAPI) => {
    try {
      const cartItem = await api.delete(`/api/v1/cartItems/${cartItemId}`);

      console.log(cartItem.data.data._id);
      return cartItem.data.data._id;
    } catch (err) {
      console.log(err.response.data.message);
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);
export const getCart = createAsyncThunk("cart/getCart", async (_, thunkAPI) => {
  try {
    const carts = await api.get(`/api/v1/carts`);

    console.log(carts.data.data);
    return carts.data.data;
  } catch (err) {
    console.log(err.response.data.message);
    return thunkAPI.rejectWithValue(err.response.data.message);
  }
});

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
        //   id which wil be matched will be upadted one
        state.cartItems = state.cartItems.map((item) =>
          item._id === action.payload._id ? action.payload : item
        );
      })
      //   For removing Cart Item
      .addCase(removeCartItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeCartItem.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      //  action.payload is id of cartItem
      .addCase(removeCartItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = state.cartItems?.filter(
          (item) => item._id !== action.payload
        );
      })

      //  For get cart Item
      .addCase(getCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      //  action.payload will contain the whole cart array
      .addCase(getCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.cartItems;
        state.cart = action.payload;
      }),
});

export default cartSlice.reducer;
