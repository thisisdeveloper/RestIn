import React, { useState, useEffect } from 'react';
import QRScanner from '../components/QRScanner';
import MenuCategory from '../components/MenuCategory';
import Header from '../components/Header';
import Cart from '../components/Cart';
import OrderStatus from '../components/OrderStatus';
import Notifications from '../components/Notifications';
import useStore from '../store';
import { CategoryType } from '../types';

const CustomerView: React.FC = () => {
  const [showCart, setShowCart] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showOrderStatus, setShowOrderStatus] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const { 
    currentRestaurant, 
    currentTable,
    isScanning,
    showVegOnly
  } = useStore();
  
  // Close other overlays when opening a new one
  const handleCartClick = () => {
    setShowNotifications(false);
    setShowOrderStatus(false);
    setShowCart(true);
  };
  
  const handleNotificationsClick = () => {
    setShowCart(false);
    setShowOrderStatus(false);
    setShowNotifications(true);
  };
  
  const handleOrderStatusClick = () => {
    setShowCart(false);
    setShowNotifications(false);
    setShowOrderStatus(true);
  };
  
  // If restaurant is not set, show QR scanner
  if (!currentRestaurant || !currentTable) {
    return <QRScanner />;
  }
  
  // Group menu items by category
  const categories: CategoryType[] = showVegOnly ? ['Veg', 'Drink'] : ['Veg', 'NonVeg', 'Drink'];
  
  // Get all subcategories for each category
  const subCategoriesByCategory: Record<CategoryType, string[]> = {
    'Veg': [],
    'NonVeg': [],
    'Drink': []
  };
  
  // Populate subcategories
  currentRestaurant.menu.forEach((item) => {
    if (!subCategoriesByCategory[item.category].includes(item.subCategory)) {
      subCategoriesByCategory[item.category].push(item.subCategory);
    }
  });
  
  // Filter menu items by search query and veg preference
  const filteredMenu = currentRestaurant.menu.filter(item => {
    const matchesSearch = searchQuery 
      ? item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.subCategory.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    
    const matchesVegPref = showVegOnly ? item.category === 'Veg' || item.category === 'Drink' : true;
    
    return matchesSearch && matchesVegPref;
  });
  
  // Group filtered items by category
  const menuByCategory: Record<CategoryType, typeof filteredMenu> = {
    'Veg': filteredMenu.filter(item => item.category === 'Veg'),
    'NonVeg': filteredMenu.filter(item => item.category === 'NonVeg'),
    'Drink': filteredMenu.filter(item => item.category === 'Drink')
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        onCartClick={handleCartClick} 
        onNotificationsClick={handleNotificationsClick}
        onOrderStatusClick={handleOrderStatusClick}
      />
      
      <main className="max-w-7xl mx-auto py-6 px-4">
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search menu..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <span className="absolute right-3 top-3 text-gray-400">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
          </div>
        </div>
        
        {/* Menu Categories */}
        {categories.map((category) => (
          menuByCategory[category].length > 0 && (
            <MenuCategory
              key={category}
              category={category}
              items={menuByCategory[category]}
              subCategories={subCategoriesByCategory[category]}
            />
          )
        ))}
        
        {/* No Results */}
        {filteredMenu.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-gray-500">No items found matching "{searchQuery}"</p>
            <button
              onClick={() => setSearchQuery('')}
              className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg"
            >
              Clear Search
            </button>
          </div>
        )}
      </main>
      
      {/* Overlays */}
      <Cart isVisible={showCart} onClose={() => setShowCart(false)} />
      <Notifications isVisible={showNotifications} onClose={() => setShowNotifications(false)} />
      <OrderStatus isVisible={showOrderStatus} onClose={() => setShowOrderStatus(false)} />
    </div>
  );
};

export default CustomerView;