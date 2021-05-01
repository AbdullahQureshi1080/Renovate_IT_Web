import { createSlice } from "@reduxjs/toolkit";
// import { useDispatch, useSelector } from "react-redux";
// import { apiCallBegan, LOGIN_URL, REGISTER_URL } from "./api";
// import clearData from './user';

const shop = createSlice({
  name: "shop",
  initialState: {
    token: null,
    loading: false,
    // lastFetch: null,
    data: null,
  },
  reducers: {
    // actions => action handlers

    loginRequestFailed: (shop, action) => {
      shop.loading = false;
    },
    loginRequest: (shop, action) => {
      shop.loading = true;
    },

    loginRequestSuccess: (shop, action) => {
      shop.token = action.payload;
      shop.loading = false;
    },
    registerRequestFailed: (shop, action) => {
      shop.loading = false;
    },
    registerRequest: (shop, action) => {
      shop.loading = true;
    },
    registerRequestSuccess: (shop, action) => {
      shop.data = action.payload;
      shop.loading = false;
    },
    signout: (shop, action) => {
      shop.token = null;
      shop.data = {};
    },
  },
});

// console.log(slice);

const {
  loginRequestFailed,
  loginRequest,
  loginRequestSuccess,
  registerRequestSuccess,
  registerRequest,
  registerRequestFailed,
  signout,
} = shop.actions;
export default shop.reducer;

// Action Creators

// ()=>{} signature function



export const loginShop = (shop) => ({
  type: loginRequestSuccess.type,
  payload: shop,
});

export const setShopData = (shop) => ({
  type: registerRequestSuccess.type,
  payload: shop,
});


export const logout = () => (
  {
  type: signout.type,
  // payload: user,
}
);


// export const userstoreentication = (user) =>
//   apiCallBegan({
//     url: LOGIN_URL,
//     method: "post",
//     data: user,
//     onStart: loginRequest.type,
//     onSuccess: loginRequestSuccess.type,
//     onError: loginRequestFailed.type,
//   });

// export const registerUser = (userData) =>
//   apiCallBegan({
//     url: REGISTER_URL,
//     method: "post",
//     data: userData,
//     onStart: registerRequest.type,
//     onSuccess: registerRequestSuccess.type,
//     onError: registerRequestFailed.type,
//   });