const {configureStore} = require('@reduxjs/toolkit');

import productReducer from './slices/productSlice';
import wishlistReucer from './slices/wishlistSlice';
import cartReducer from './slices/cartSlice';
import addressReducer from './slices/addressSlice';
export const store = configureStore({
  reducer: {
    product: productReducer,
    wishlist: wishlistReucer,
    cart: cartReducer,
    address: addressReducer,
  },
});
