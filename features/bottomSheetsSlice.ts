import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState: any = {
  priceFilter: false,
  propertyTypeFilter: false,
  categoryFilter: false,
};

const bottomSheetsSlice = createSlice({
  name: "bottomSheets",
  initialState,

  reducers: {
    setPriceBottomSheet: (state, action) => {
      state.priceFilter = action.payload;
    },
    setPropertyTypeBottomSheet: (state, action) => {
      state.propertyTypeFilter = action.payload;
    },
    setCategoryBottomSheet: (state, action) => {
      state.categoryFilter = action.payload;
    },
  },

  extraReducers: (builder) => {},
});

export const {
  setPriceBottomSheet,
  setPropertyTypeBottomSheet,
  setCategoryBottomSheet,
} = bottomSheetsSlice.actions;

export default bottomSheetsSlice.reducer;
