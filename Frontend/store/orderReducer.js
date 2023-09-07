import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../src/customer/components/config/config";

const initialState = {
  orders: [],
  order: null,
  isLoading: false,
  error: "",
};

export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (data, thunkAPI) => {
    try {
      const data = await api.post(`/api/v1/orders`, data.address);

      const order = await data.json();
      if (order.status === "fail" || order.status === "error") {
        throw new Error(order.message);
      }
      //  on creating navigating
      data.naviagte(`step=3 & order_id=${order.data.order._id}`);

      return order;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const getOrderById = createAsyncThunk(
  "order/getOrderById",
  async (orderId, thunkAPI) => {
    try {
      const data = await api.get(`/api/v1/orders/${orderId}`);
      const order = await data.json();
      if (order.status === "fail" || order.status === "error") {
        throw new Error(order.message);
      }
      return order;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const getOrderHistory = createAsyncThunk(
  "order/orderHistory",
  async (data, thunkAPI) => {
    try {
      const data = await api.get(`/api/v1/orders/orderhistory`);
      const order = await data.json();
      if (order.status === "fail" || order.status === "error") {
        throw new Error(order.message);
      }
      return order;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(createOrder.pending, (state) => {
        state.isLoading = false;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.order = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      //     get order
      .addCase(getOrderById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.order = action.payload;
      })
      .addCase(getOrderById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      //    get Order History
      .addCase(getOrderHistory.pending, (state) => {
        state.isLoading = true;
      })
      //     order history will be in orders array
      .addCase(getOrderHistory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
      })
      .addCase(getOrderHistory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      }),
});

export default orderSlice.reducer;
