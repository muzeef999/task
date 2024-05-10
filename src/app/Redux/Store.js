import { configureStore } from "@reduxjs/toolkit";
import Userslice from "./Userslice";

const store = configureStore({
  reducer: {
    user: Userslice,
  },
});

export default store;
