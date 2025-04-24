import React, { useState, lazy, Suspense, useEffect } from 'react';
import QRScanner from '../components/QRScanner';
import Header from '../components/Header';
import useStore from '../store';
import { categories } from '../data/categories';
import { CategoryType } from '../types';
import { ArrowUp } from 'lucide-react';

// Lazy load components
const MenuCategory = lazy(() => import('../components/MenuCategory'));
const Cart = lazy(() => import('../components/Cart'));
const OrderStatus = lazy(() => import('../components/OrderStatus'));
const Notifications = lazy(() => import('../components/Notifications'));
const RestaurantDetails = lazy(() => import('../components/RestaurantDetails'));

const CustomerView: React.FC = () => {
  const [showCart, setShowCart] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showOrderStatus, setShowOrderStatus] = useState(false);
  const [showRestaurantDetails, setShowRestaurantDetails] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  const { 
    currentRestaurant, 
    currentTable,
    dietaryFilter
  } = useStore();

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Reset selected tag when dietary filter changes
  useEffect(() => {
    setSelectedTag(null);
  }, [dietaryFilter]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  // Get filtered menu items based on dietary preference
  const dietaryFilteredMenu = currentRestaurant?.menu.filter(item => {
    if (dietaryFilter === 'all') return true;
    if (dietaryFilter === 'veg') return item.category === 'Veg' || item.category === 'Drink';
    return item.category === 'NonVeg';
  }) || [];

  // Get tags only from the currently filtered items
  const filteredTags = dietaryFilteredMenu.reduce((tags: string[], item) => {
    item.tags?.forEach(tag => {
      if (!tags.includes(tag)) {
        tags.push(tag);
      }
    });
    return tags;
  }, []);
  
  // Close other overlays when opening a new one
  const handleCartClick = () => {
    setShowNotifications(false);
    setShowOrderStatus(false);
    setShowRestaurantDetails(false);
    setShowCart(true);
  };
  
  const handleNotificationsClick = () => {
    setShowCart(false);
    setShowOrderStatus(false);
    setShowRestaurantDetails(false);
    setShowNotifications(true);
  };
  
  const handleOrderStatusClick = () => {
    setShowCart(false);
    setShowNotifications(false);
    setShowRestaurantDetails(false);
    setShowOrderStatus(true);
  };

  const handleRestaurantClick = () => {
    setShowCart(false);
    setShowNotifications(false);
    setShowOrderStatus(false);
    setShowRestaurantDetails(true);
  };
  
  // If restaurant is not set, show QR scanner
  if (!currentRestaurant || !currentTable) {
    return <QRScanner />;
  }
  
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
  
  // Filter menu items by search query, dietary preference, and selected tag
  const filteredMenu = dietaryFilteredMenu.filter(item => {
    const matchesSearch = searchQuery 
      ? item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.subCategory.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    
    const matchesTag = selectedTag 
      ? item.tags?.includes(selectedTag)
      : true;
    
    return matchesSearch && matchesTag;
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
        onRestaurantClick={handleRestaurantClick}
      />
      
      <main className="max-w-7xl mx-auto py-6 px-4">
        {/* Search Bar */}
        <div className="mb-4">
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

        {/* Filter Tags - Now filtered based on dietary preference */}
        <div className="mb-6 overflow-x-auto scrollbar-hide">
          <div className="flex space-x-2 pb-2">
            <button
              onClick={() => setSelectedTag(null)}
              className={`flex-shrink-0 px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                selectedTag === null 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-gray-200 text-gray-800'
              }`}
            >
              All
            </button>
            {filteredTags.map(tag => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                className={`flex-shrink-0 px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  tag === selectedTag
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
        
        {/* Menu Categories */}
        <Suspense fallback={<div className="animate-pulse bg-gray-200 h-96 rounded-lg"></div>}>
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
                onClick={() => {
                  setSearchQuery('');
                  setSelectedTag(null);
                }}
                className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg"
              >
                Clear Filters
              </button>
            </div>
          )}
        </Suspense>
      </main>
      
      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 p-3 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 transition-all duration-300 transform hover:scale-110 z-50"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-6 h-6" />
        </button>
      )}
      
      {/* Overlays */}
      <Suspense fallback={null}>
        {showCart && <Cart isVisible={showCart} onClose={() => setShowCart(false)} />}
        {showNotifications && <Notifications isVisible={showNotifications} onClose={() => setShowNotifications(false)} />}
        {showOrderStatus && <OrderStatus isVisible={showOrderStatus} onClose={() => setShowOrderStatus(false)} />}
        {showRestaurantDetails && <RestaurantDetails isVisible={showRestaurantDetails} onClose={() => setShowRestaurantDetails(false)} />}
      </Suspense>
    </div>
  );
};

export default CustomerView;