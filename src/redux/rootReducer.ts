import { combineReducers } from '@reduxjs/toolkit';
import productReducer from './slices/products/productSlice';

const rootReducer = combineReducers({
  products: productReducer,
});

export default rootReducer;
