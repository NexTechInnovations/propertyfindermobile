import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState: any = {
  priceFilter: false,
};

const bottomSheetsSlice = createSlice({
  name: "bottomSheets",
  initialState,

  reducers: {
    setPriceBottomSheet: (state, action) => {
      state.priceFilter = action.payload;
    },
  },

  extraReducers: (builder) => {},
});

export const { setPriceBottomSheet } = bottomSheetsSlice.actions;
export const selectBottomSheets = (state: any) => state;

export default bottomSheetsSlice.reducer;
