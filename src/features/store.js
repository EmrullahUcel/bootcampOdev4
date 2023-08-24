import { configureStore } from "@reduxjs/toolkit";
import DataSlice from "../slice/DataSlice";



const store = configureStore({
  reducer: {
    dataBox: DataSlice
  }
})


export default store;