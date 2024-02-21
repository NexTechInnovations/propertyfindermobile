import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Define the initial state
const initialState: any = {
  data: [],
  autoCompleteData: [],
  loading: false,
  error: null,
  currentPage: 0,
  filters: {
    // query: "",
    lang: "en",
    purpose: "for-sale",
    hitsPerPage: "25",
    categoryExternalID: 4,
    page: "0",
    sort: "city-level-score",
    roomsMin: "",
    roomsMax: "",
    // propertyType: null,
    bathsMin: "",
    priceMin: "",
    priceMax: "",
  },
  moreFilters: {
    furnishingStatus: "",
    areaMin: "",
    areaMax: "",
  },
};

const propertiesSlice = createSlice({
  name: "properties",
  initialState,

  reducers: {
    setProperties: (state, action) => {
      state.properties = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setTotalResults: (state, action) => {
      state.totalResults = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    setMoreFilters: (state, action) => {
      state.moreFilters = { ...state.moreFilters, ...action.payload };
    },
  },

  extraReducers: (builder) => {},
});

export const {
  setProperties,
  setCurrentPage,
  setTotalResults,
  setMoreFilters,
  setFilters,
} = propertiesSlice.actions;
export const selectProperties = (state: any) => state.properties;

export default propertiesSlice.reducer;
