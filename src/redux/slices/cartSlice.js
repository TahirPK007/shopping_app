const {createSlice} = require('@reduxjs/toolkit');

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    data: [],
  },

  reducers: {
    additemtocart(state, action) {
      let tempdata = state.data;
      tempdata.push(action.payload);
      state.data = tempdata;
    },
  },
});

export const {additemtocart} = cartSlice.actions;
export default cartSlice.reducer;
