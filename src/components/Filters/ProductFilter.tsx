import React from 'react';

interface ProductFilterProps {
  categories: string[];
  onFilterChange: (filters: { category: string; inStock: boolean }) => void;
}

const ProductFilter: React.FC<ProductFilterProps> = ({
  categories,
  onFilterChange,
}) => {
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({ category: e.target.value, inStock: false });
  };

  const handleStockChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ category: '', inStock: e.target.checked });
  };

  return (
    <div className="flex space-x-4 mb-4">
      <select onChange={handleCategoryChange} className="p-2 border rounded">
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
      <label className="flex items-center">
        <input type="checkbox" onChange={handleStockChange} className="mr-2" />
        In Stock Only
      </label>
    </div>
  );
};

export default ProductFilter;
