const {configureStore} = require('@reduxjs/toolkit');

import productReducer from './slices/productSlice';
import wishlistReucer from './slices/wishlistSlice';
import cartReducer from './slices/cartSlice';
export const store = configureStore({
  reducer: {
    product: productReducer,
    wishlist: wishlistReucer,
    cart: cartReducer,
  },
});
