const {createSlice} = require('@reduxjs/toolkit');

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    data: [],
  },

  reducers: {
    additemtocart(state, action) {
      let tempdata = state.data;
      let isItemExist = false;
      tempdata.map(item => {
        if (item.id == action.payload.id) {
          isItemExist = true;
          item.qty = item.qty + 1;
        }
      });
      if (!isItemExist) {
        tempdata.push(action.payload);
      }
      state.data = tempdata;
    },
    reduceitemfromcart(state, action) {
      let tempdata = state.data;

      tempdata.map(item => {
        if (item.id == action.payload.id) {
          item.qty = item.qty - 1;
        }
      });
      state.data = tempdata;
    },
    removeitemfromcart(state, action) {
      let tempdata = state.data;

      tempdata.splice(action.payload, 1);

      state.data = tempdata;
    },
  },
});

export const {additemtocart,reduceitemfromcart,removeitemfromcart} = cartSlice.actions;
export default cartSlice.reducer;
