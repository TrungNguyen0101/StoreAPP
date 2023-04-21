import { createSlice } from "@reduxjs/toolkit";

const reduxSlice = createSlice({
  name: "reduxSlice",
  initialState: {
    image_url1: "",
    image_url2: "",
  },
  reducers: {
    getImageURL_1: (state, payload) => ({
      ...state,
      image_url1: payload.payload,
    }),
    getImageURL_2: (state, payload) => ({
      ...state,
      image_url2: payload.payload,
    }),
  },
});
export const { getImageURL_1, getImageURL_2 } = reduxSlice.actions;

export default reduxSlice.reducer;
