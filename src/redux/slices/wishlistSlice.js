const {createSlice} = require('@reduxjs/toolkit');

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: {
    data: [],
  },

  reducers: {
    additemtowishlist(state, action) {
      let tempdata = state.data;
      tempdata.push(action.payload);
      state.data = tempdata;
    },
  },
});

export const {additemtowishlist} = wishlistSlice.actions;
export default wishlistSlice.reducer;
