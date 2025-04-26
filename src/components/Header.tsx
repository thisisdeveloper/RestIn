import React, { useState } from 'react';
import { Bell, List, Map, Salad, Drumstick, UtensilsCrossed, ClipboardCheck, ChevronDown } from 'lucide-react';
import useStore from '../store';
import { DietaryFilter, Stall } from '../types';

interface HeaderProps {
  onNotificationsClick: () => void;
  onOrderStatusClick: () => void;
  onRestaurantClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  onNotificationsClick,
  onOrderStatusClick,
  onRestaurantClick
}) => {
  const { 
    currentRestaurant, 
    currentTable,
    notifications,
    orders,
    dietaryFilter,
    setDietaryFilter,
    setCurrentStall
  } = useStore();
  
  const [showStallDropdown, setShowStallDropdown] = useState(false);
  
  const unreadNotifications = notifications.filter(n => !n.read).length;
  const activeOrders = orders.filter(order => 
    order.status !== 'cancelled' && 
    order.status !== 'delivered' && 
    order.status !== 'ready'
  ).length;

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

  const handleStallChange = (stallId: string) => {
    setCurrentStall(stallId);
    setShowStallDropdown(false);
  };

  const getCurrentStallName = () => {
    if (!currentRestaurant?.stalls || !currentRestaurant.currentStallId) return null;
    const currentStall = currentRestaurant.stalls.find(s => s.id === currentRestaurant.currentStallId);
    return currentStall?.name;
  };

  const handleRestaurantClick = (e: React.MouseEvent) => {
    if (currentRestaurant?.venueType === 'foodCourt') {
      e.stopPropagation();
      setShowStallDropdown(!showStallDropdown);
    } else {
      onRestaurantClick();
    }
  };
  
  return (
    <header className="bg-white shadow-md sticky top-0 z-10">
      <div className="px-4 py-3 max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {currentRestaurant ? (
              <div 
                className="flex items-center cursor-pointer hover:opacity-80 transition-opacity"
                onClick={handleRestaurantClick}
              >
                <img 
                  src={currentRestaurant.logo} 
                  alt={currentRestaurant.name}
                  className="w-10 h-10 rounded-full object-cover mr-2" 
                />
                <div>
                  <div className="flex items-center">
                    <h1 className="font-bold text-lg leading-tight">
                      {currentRestaurant.venueType === 'foodCourt' ? getCurrentStallName() : currentRestaurant.name}
                    </h1>
                    {currentRestaurant.venueType === 'foodCourt' && (
                      <button 
                        className="ml-2 text-gray-600 hover:text-gray-800"
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowStallDropdown(!showStallDropdown);
                        }}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  <div className="flex items-center">
                    <Map size={14} className="text-gray-500 mr-1" />
                    {currentTable && (
                      <span className="text-sm text-gray-500">
                        {currentRestaurant.venueType === 'foodCourt' ? (
                          <>
                            {currentRestaurant.name} • Table #{currentTable.number}
                          </>
                        ) : (
                          `Table #${currentTable.number}`
                        )}
                      </span>
                    )}
                  </div>
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

            {/* Active Orders Status */}
            {activeOrders > 0 && (
              <button
                onClick={onOrderStatusClick}
                className="relative p-2 rounded-full hover:bg-gray-100"
                aria-label="View active orders"
              >
                <ClipboardCheck className="h-6 w-6 text-gray-600" />
                <span className="absolute top-0 right-0 bg-purple-600 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                  {activeOrders}
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
          </div>
        </div>

        {/* Stall Dropdown */}
        {currentRestaurant?.venueType === 'foodCourt' && currentRestaurant.stalls && showStallDropdown && (
          <div 
            className="absolute mt-2 w-64 bg-white rounded-lg shadow-lg border z-20"
          >
            {currentRestaurant.stalls.map((stall: Stall) => (
              <button
                key={stall.id}
                className="w-full px-4 py-2 text-left hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg flex items-center"
                onClick={() => handleStallChange(stall.id)}
              >
                <img 
                  src={stall.logo} 
                  alt={stall.name}
                  className="w-8 h-8 rounded-full object-cover mr-2" 
                />
                <div>
                  <div className="font-medium">{stall.name}</div>
                  <div className="text-sm text-gray-500">{stall.cuisine}</div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;