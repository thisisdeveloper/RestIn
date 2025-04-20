import React from 'react';
import { CategoryType, MenuItem } from '../types';
import MenuItemCard from './MenuItemCard';

interface MenuCategoryProps {
  category: CategoryType;
  items: MenuItem[];
  subCategories: string[];
}

const categoryIcons: Record<CategoryType, string> = {
  Veg: '🥗',
  NonVeg: '🍗',
  Drink: '🍹'
};

const categoryColors: Record<CategoryType, string> = {
  Veg: 'bg-green-100 text-green-800',
  NonVeg: 'bg-red-100 text-red-800',
  Drink: 'bg-blue-100 text-blue-800'
};

const MenuCategory: React.FC<MenuCategoryProps> = ({ category, items, subCategories }) => {
  const [activeSubCategory, setActiveSubCategory] = React.useState<string>('All');
  
  const filteredItems = activeSubCategory === 'All' 
    ? items 
    : items.filter(item => item.subCategory === activeSubCategory);

  return (
    <div className="mb-8">
      <div className="flex items-center mb-4">
        <span className="text-2xl mr-2">{categoryIcons[category]}</span>
        <h2 className="text-xl font-bold">{category}</h2>
        <span className={`ml-auto px-3 py-1 rounded-full text-sm ${categoryColors[category]}`}>
          {items.length} items
        </span>
      </div>
      
      <div className="flex overflow-x-auto pb-2 mb-4 scrollbar-hide">
        <button
          className={`px-4 py-2 rounded-full text-sm mr-2 whitespace-nowrap ${
            activeSubCategory === 'All' 
              ? 'bg-indigo-600 text-white' 
              : 'bg-gray-200 text-gray-800'
          }`}
          onClick={() => setActiveSubCategory('All')}
        >
          All
        </button>
        
        {subCategories.map(subCategory => (
          <button
            key={subCategory}
            className={`px-4 py-2 rounded-full text-sm mr-2 whitespace-nowrap ${
              activeSubCategory === subCategory 
                ? 'bg-indigo-600 text-white' 
                : 'bg-gray-200 text-gray-800'
            }`}
            onClick={() => setActiveSubCategory(subCategory)}
          >
            {subCategory}
          </button>
        ))}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredItems.map(item => (
          <MenuItemCard key={item.id} item={item} />
        ))}
      </div>
      
      {filteredItems.length === 0 && (
        <div className="py-8 text-center text-gray-500">
          No items found in this category.
        </div>
      )}
    </div>
  );
};

export default MenuCategory;