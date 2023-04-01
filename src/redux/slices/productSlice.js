const {createSlice} = require('@reduxjs/toolkit');

const productSlice = createSlice({
  name: 'product',
  initialState: {
    data: null,
    isLoading: false,
  },

  reducers: {
    addProducts(state, action) {
      state.data = action.payload;
    },
  },
});

export const {addProducts} = productSlice.actions;
export default productSlice.reducer;
