import React from 'react';
import { ShoppingCart, Bell, List, Map, Salad, Drumstick, UtensilsCrossed } from 'lucide-react';
import useStore from '../store';
import { DietaryFilter } from '../types';

interface HeaderProps {
  onCartClick: () => void;
  onNotificationsClick: () => void;
  onOrderStatusClick: () => void;
  onRestaurantClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  onCartClick, 
  onNotificationsClick,
  onOrderStatusClick,
  onRestaurantClick
}) => {
  const { 
    cart, 
    currentRestaurant, 
    currentTable,
    notifications,
    currentOrder,
    dietaryFilter,
    setDietaryFilter
  } = useStore();
  
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  const unreadNotifications = notifications.filter(n => !n.read).length;

  const dietaryFilterStyles: Record<DietaryFilter, string> = {
    all: 'bg-gray-100 text-gray-600 hover:bg-gray-200',
    veg: 'bg-green-100 text-green-700 hover:bg-green-200',
    nonveg: 'bg-red-100 text-red-700 hover:bg-red-200'
  };

  const DietaryIcon = {
    all: UtensilsCrossed,
    veg: Salad,
    nonveg: Drumstick
  }[dietaryFilter];

  const cycleFilter = () => {
    const filters: DietaryFilter[] = ['all', 'veg', 'nonveg'];
    const currentIndex = filters.indexOf(dietaryFilter);
    const nextIndex = (currentIndex + 1) % filters.length;
    setDietaryFilter(filters[nextIndex]);
  };
  
  return (
    <header className="bg-white shadow-md sticky top-0 z-10">
      <div className="px-4 py-3 max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {currentRestaurant ? (
              <div 
                className="flex items-center cursor-pointer hover:opacity-80 transition-opacity"
                onClick={onRestaurantClick}
              >
                <img 
                  src={currentRestaurant.logo} 
                  alt={currentRestaurant.name}
                  className="w-10 h-10 rounded-full object-cover mr-2" 
                />
                <div>
                  <h1 className="font-bold text-lg leading-tight">{currentRestaurant.name}</h1>
                  {currentTable && (
                    <div className="flex items-center">
                      <Map size={14} className="text-gray-500 mr-1" />
                      <span className="text-sm text-gray-500">Table #{currentTable.number}</span>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center">
                <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white">
                  <List />
                </div>
                <h1 className="ml-2 font-bold text-lg">
                  QR Menu
                </h1>
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            {/* Dietary Filter */}
            <button
              onClick={cycleFilter}
              className={`relative p-2 rounded-full transition-colors ${dietaryFilterStyles[dietaryFilter]}`}
              aria-label="Toggle dietary filter"
            >
              <DietaryIcon className="h-5 w-5" />
            </button>

            {/* Order Status Button */}
            {currentOrder && (
              <button
                onClick={onOrderStatusClick}
                className="relative p-2 rounded-full hover:bg-gray-100"
                aria-label="View order status"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-6 w-6 text-gray-600" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <span className="absolute top-0 right-0 bg-purple-600 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                  1
                </span>
              </button>
            )}
            
            {/* Notifications Button */}
            <button
              onClick={onNotificationsClick}
              className="relative p-2 rounded-full hover:bg-gray-100"
              aria-label="Notifications"
            >
              <Bell className="h-6 w-6 text-gray-600" />
              {unreadNotifications > 0 && (
                <span className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                  {unreadNotifications > 9 ? '9+' : unreadNotifications}
                </span>
              )}
            </button>
            
            {/* Cart Button */}
            <button
              onClick={onCartClick}
              className="relative p-2 rounded-full hover:bg-gray-100"
              aria-label="Cart"
            >
              <ShoppingCart className="h-6 w-6 text-gray-600" />
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 bg-indigo-600 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                  {totalItems > 9 ? '9+' : totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;