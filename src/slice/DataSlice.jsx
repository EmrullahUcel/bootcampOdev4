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
    setData: (state, action) => {
      state.data = action.payload;
      state.loading = false;
    },
    setLoading: (state) => {
      state.loading = true;
    },
    deleteCustomer: (state, action) => {
      const deletedCustomer = state.data.filter(
        (cus) => cus.id !== action.payload.id
      );
      state.data = deletedCustomer;
    },
    sortData: (state, action) => {
      const { field, ascending } = action.payload;
      state.data.sort((a, b) => {
        if (ascending) {
          return a[field].localeCompare(b[field]);
        } else {
          return b[field].localeCompare(a[field]);
        }
      });
    },
    addCustomer: (state, action) => {
      state.data = [action.payload, ...state.data];
    },
  },
});

export default DataSlice.reducer;
export const { setData, deleteCustomer, sortData, addCustomer, setLoading } =
  DataSlice.actions;
