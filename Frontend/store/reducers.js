import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_URL } from "../src/customer/components/config/config";

const initialState = {
  user: null,
  isAuth: false,
  jwt: null,
  error: null,
  isLoading: false,
};

export const loginUser = createAsyncThunk("auth/loginUser", async (data) => {
  const response = await fetch(`${API_URL}/api/v1/users/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const user = await response.json();
  // console.log(user);

  localStorage.setItem("jwt", user.token);

  return user;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    //  method 1 for register
    registerUser: async (state, action) => {
      try {
        state.isLoading = true;
        const user = await fetch(`${API_URL}/api/v1/users/auth/signup`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(action.payload),
        });

        state.isLoading = false;
        // console.log("Payload" + action.payload);
        const data = await user.json();
        // console.log(data);
        if (data.status == "success") {
          state.jwt = data.token;
          state.isAuth = true;
        }
      } catch (err) {
        console.log(err);
        state.error = err;
      }
    },
    //  For Login
    // loginUser: async (state, action) => {
    //   try {
    //     state.isLoading = true;
    //     const user = await fetch(`${API_URL}/api/v1/users/auth/login`, {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify(action.payload),
    //     });
    //     // console.log("Promise" + user);

    //     state.isLoading = false;
    //     const data = await user.json();
    //     console.log(data);
    //     if (data.status == "success") {
    //       state.jwt = data.token;
    //       // console.log("State" + state.jwt);
    //       state.isAuth = true;
    //     }
    //   } catch (err) {
    //     console.log(err);
    //     state.error = err;
    //   }
    // },
    //  For User Profile
    getUserProfile: async (state) => {
      try {
        state.isLoading = true;
        const user = await fetch(`${API_URL}/api/v1/users/profile`, {
          method: "GET",
          headers: {
            authorization: `Bearer ${state.jwt}`,
          },
        });

        const data = await user.json();
        state.isLoading = false;
        state.user = data.data.user;
      } catch (err) {
        console.log(err);
        state.error = err;
      }
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.jwt = action.payload.token;
        state.isAuth = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      }),
});

export const { registerUser, getUserProfile } = authSlice.actions;

export default authSlice.reducer;
