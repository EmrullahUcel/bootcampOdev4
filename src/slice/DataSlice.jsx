import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  loading: false,
  name: "",
  id: "",
  street: "",
  city: "",
};

const DataSlice = createSlice({
  name: "dataBox",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    deleteCustomer: (state, action) => {
      const deletedCustomer = state.data.filter(
        (cus) => cus.id !== action.payload.id
      );
      state.data = deletedCustomer;
    },
    addCustomer: (state, action) => {
      state.data = [action.payload, ...state.data];
    },
  },
});

export default DataSlice.reducer;
export const { deleteCustomer, addCustomer, setLoading, sortData, toggleSort } =
  DataSlice.actions;
