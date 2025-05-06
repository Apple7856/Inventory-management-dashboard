import React, { useState, useEffect } from 'react';
import { Product } from '../../types/product';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: Product) => void;
  initialData?: Product;
}

const ProductModal: React.FC<ProductModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
}) => {
  const [name, setName] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [stock, setStock] = useState<number | null>(null);
  const [price, setPrice] = useState<number | null>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setCategory(initialData.category);
      setStock(initialData.stock);
      setPrice(initialData.price);
    } else {
      setName('');
      setCategory('');
      setStock(null);
      setPrice(null);
    }
  }, [isOpen]);

  const handleSubmit = () => {
    if (!name || !category || stock === null || price === null) {
      setError(
        'All fields are required and stock/price must be greater than 0',
      );
      return;
    }
    const product: Product = {
      name,
      category,
      stock,
      price,
      ...(initialData?.id ? { id: initialData.id } : { id: '' }),
    };
    onSave(product);
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-50">
          <div className="bg-white p-8 rounded-lg w-96">
            <h2 className="text-xl font-semibold mb-4">
              {initialData ? 'Edit Product' : 'Add Product'}
            </h2>

            {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

            <div className="mb-4">
              <label className="block mb-1">Product Name</label>
              <input
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Product Name"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1">Category</label>
              <select
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="">Select Category</option>
                <option value="Electronics">Electronics</option>
                <option value="Apparel">Apparel</option>
                <option value="Food">Food</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block mb-1">Stock Quantity</label>
              <input
                type="number"
                value={stock === null ? '' : stock}
                onChange={(event) =>
                  setStock(
                    event.target.value === ''
                      ? null
                      : Number(event.target.value),
                  )
                }
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Stock Quantity"
                min="1"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1">Price</label>
              <input
                type="number"
                value={price === null ? '' : price}
                onChange={(event) =>
                  setPrice(
                    event.target.value === ''
                      ? null
                      : Number(event.target.value),
                  )
                }
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Price"
                min="1"
              />
            </div>

            <div className="flex justify-end space-x-4">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                {initialData ? 'Update Product' : 'Add Product'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductModal;
