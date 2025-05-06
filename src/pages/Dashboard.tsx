import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Product } from '../types/product';
import {
  addProduct,
  updateProduct,
  deleteProducts,
  setCurrentPage,
} from '../redux/slices/products/productSlice';
import ProductTable from '../components/Table/ProductTable';
import ProductModal from '../components/Modal/ProductModal';
import ProductFilter from '../components/Filters/ProductFilter';
import CategoryChart from '../components/Chart/CategoryChart';
import { RootState } from '../redux/store';

const Dashboard: React.FC = () => {
  const { products, currentPage, itemsPerPage, totalPage } = useSelector(
    (state: RootState) => state.products,
  );
  const dispatch = useDispatch();

  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState<Product | undefined>(undefined);
  const [filter, setFilter] = useState({ category: '', inStock: false });

  const handleAddOrEdit = (product: Product) => {
    if (product.id) {
      dispatch(updateProduct(product));
    } else {
      dispatch(addProduct(product));
    }
  };

  const handleDelete = (ids: string[]) => {
    dispatch(deleteProducts(ids));
  };

  const filteredProducts = products
    .filter((p) => {
      return (
        (!filter.category || p.category === filter.category) &&
        (!filter.inStock || p.stock > 0)
      );
    })
    .slice(
      (currentPage - 1) * itemsPerPage,
      (currentPage - 1) * itemsPerPage + itemsPerPage,
    );

  const handlePrev = () => {
    if (currentPage > 1) {
      dispatch(setCurrentPage(currentPage - 1));
    }
  };

  const handleNext = () => {
    if (currentPage < totalPage) {
      dispatch(setCurrentPage(currentPage + 1));
    }
  };

  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Inventory Dashboard</h1>
        <button
          onClick={() => {
            setEditData(undefined);
            setModalOpen(true);
          }}
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          + Add Product
        </button>
      </div>
      <div className="flex justify-between items-center">
        <ProductFilter
          categories={['Electronics', 'Apparel', 'Food']}
          onFilterChange={setFilter}
        />
        <div className="flex flex-row gap-10">
          <button
            onClick={handlePrev}
            className="text-blue-500 border px-4 py-2 disabled:bg-gray-300 disabled:text-gray-500 disabled:border-gray-300"
            disabled={currentPage === 1}
          >
            Prev
          </button>
          <button
            onClick={handleNext}
            className="text-blue-500 border px-4 py-2 disabled:bg-gray-300 disabled:text-gray-500 disabled:border-gray-300"
            disabled={currentPage === totalPage}
          >
            next
          </button>
        </div>
      </div>
      <ProductTable
        products={filteredProducts}
        onDelete={handleDelete}
        onEdit={(product) => {
          setEditData(product);
          setModalOpen(true);
        }}
      />
      <CategoryChart products={filteredProducts} />
      <ProductModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleAddOrEdit}
        initialData={editData}
      />
    </div>
  );
};

export default Dashboard;
