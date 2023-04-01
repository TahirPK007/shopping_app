const {configureStore} = require('@reduxjs/toolkit');

import productReducer from './slices/productSlice';
import wishlistReucer from './slices/wishlistSlice';
export const store = configureStore({
  reducer: {
    product: productReducer,
    wishlist: wishlistReucer,
  },
});
