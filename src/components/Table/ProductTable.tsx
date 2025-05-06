import React from 'react';
import { Product } from '../../types/product';
import { formatCurrency, isLowStock } from '../../utils/formatters';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

interface ProductTableProps {
  products: Product[];
  onDelete: (ids: string[]) => void;
  onEdit: (product: Product) => void;
}

const ProductTable: React.FC<ProductTableProps> = ({
  products,
  onDelete,
  onEdit,
}) => {
  const [selectedIds, setSelectedIds] = React.useState<string[]>([]);
  const { currentPage, itemsPerPage } = useSelector(
    (state: RootState) => state.products,
  );

  const handleSelectRow = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((selectedId) => selectedId !== id)
        : [...prev, id],
    );
  };

  return (
    <div className="space-y-4">
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b">
              <input
                type="checkbox"
                onChange={() => {
                  if (selectedIds.length === products.length) {
                    setSelectedIds([]);
                  } else {
                    setSelectedIds(products.map((p) => p.id));
                  }
                }}
                checked={selectedIds.length === products.length}
              />
            </th>
            <th className="px-4 py-2 border-b">Sr. No.</th>
            <th className="px-4 py-2 border-b">Product Name</th>
            <th className="px-4 py-2 border-b">Category</th>
            <th className="px-4 py-2 border-b">Stock</th>
            <th className="px-4 py-2 border-b">Price</th>
            <th className="px-4 py-2 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr
              key={product.id}
              className={`hover:bg-gray-100 ${isLowStock(product.stock) ? 'bg-yellow-200' : ''}`}
            >
              <td className="px-4 py-2 border-b">
                <input
                  type="checkbox"
                  checked={selectedIds.includes(product.id)}
                  onChange={() => handleSelectRow(product.id)}
                />
              </td>
              <td className="px-4 py-2 border-b">
                {(currentPage - 1) * itemsPerPage + index + 1}
              </td>
              <td className="px-4 py-2 border-b">{product.name}</td>
              <td className="px-4 py-2 border-b">{product.category}</td>
              <td className="px-4 py-2 border-b">{product.stock}</td>
              <td className="px-4 py-2 border-b">
                {formatCurrency(product.price)}
              </td>
              <td className="px-4 py-2 border-b">
                <button
                  onClick={() => onEdit(product)}
                  className="text-blue-500 hover:underline mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete([product.id])}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        onClick={() => onDelete(selectedIds)}
        className="bg-white text-red-600 border border-red-600 px-4 py-2 rounded disabled:bg-gray-300 disabled:text-gray-500 disabled:border-gray-300"
        disabled={!selectedIds.length}
      >
        Delete Selected
      </button>
    </div>
  );
};

export default ProductTable;
