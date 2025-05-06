import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../../types/product';
import { v4 as uuidv4 } from 'uuid';
import data from '../../../mock/data.json';

interface ProductState {
  products: Product[];
  currentPage: number;
  itemsPerPage: number;
  totalPage: number;
}

const initialState: ProductState = {
  products: [...data],
  currentPage: 1,
  itemsPerPage: 5,
  totalPage: Math.ceil(data.length / 5),
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Omit<Product, 'id'>>) => {
      const newProduct = { ...action.payload, id: uuidv4() };
      state.products.push(newProduct);
    },
    updateProduct: (state, action: PayloadAction<Product>) => {
      const index = state.products.findIndex(
        (product) => product.id === action.payload.id,
      );
      if (index !== -1) {
        state.products[index] = action.payload;
      }
    },
    deleteProducts: (state, action: PayloadAction<string[]>) => {
      state.products = state.products.filter(
        (product) => !action.payload.includes(product.id),
      );
    },
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
});

export const {
  addProduct,
  updateProduct,
  deleteProducts,
  setProducts,
  setCurrentPage,
} = productSlice.actions;

export default productSlice.reducer;
