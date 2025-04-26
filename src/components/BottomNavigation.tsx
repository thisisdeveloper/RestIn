import React from 'react';
import { Home, ClipboardList, User, ShoppingCart, UtensilsCrossed, Salad, Drumstick } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useStore from '../store';
import { DietaryFilter } from '../types';

interface BottomNavigationProps {
  onOrderHistoryClick: () => void;
  onCartClick?: () => void;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({
  onOrderHistoryClick
}) => {
  const navigate = useNavigate();
  const { cart, dietaryFilter, setDietaryFilter } = useStore();
  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  const DietaryIcon = {
    all: UtensilsCrossed,
    veg: Salad,
    nonveg: Drumstick
  }[dietaryFilter];

  const dietaryFilterStyles: Record<DietaryFilter, string> = {
    all: 'text-gray-600',
    veg: 'text-green-600',
    nonveg: 'text-red-600'
  };

  const cycleFilter = () => {
    const filters: DietaryFilter[] = ['all', 'veg', 'nonveg'];
    const currentIndex = filters.indexOf(dietaryFilter);
    const nextIndex = (currentIndex + 1) % filters.length;
    setDietaryFilter(filters[nextIndex]);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg safe-area-bottom z-50">
      <div className="max-w-lg mx-auto">
        <nav className="grid grid-cols-5 gap-1">
          <button className="flex flex-col items-center justify-center py-3 text-indigo-600">
            <Home className="w-6 h-6" />
            <span className="text-xs mt-1">Home</span>
          </button>
          
          <button 
            onClick={() => navigate('/cart')}
            className="flex flex-col items-center justify-center py-3 text-gray-600 relative"
          >
            <ShoppingCart className="w-6 h-6" />
            <span className="text-xs mt-1">Cart</span>
            {cartItemsCount > 0 && (
              <span className="absolute top-2 right-1/4 bg-indigo-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {cartItemsCount}
              </span>
            )}
          </button>
          
          <button
            onClick={cycleFilter}
            className={`flex flex-col items-center justify-center py-3 ${dietaryFilterStyles[dietaryFilter]}`}
          >
            <DietaryIcon className="w-6 h-6" />
            <span className="text-xs mt-1 capitalize">{dietaryFilter === 'all' ? 'All' : dietaryFilter}</span>
          </button>
          
          <button 
            className="flex flex-col items-center justify-center py-3 text-gray-600"
            onClick={onOrderHistoryClick}
          >
            <ClipboardList className="w-6 h-6" />
            <span className="text-xs mt-1">Orders</span>
          </button>
          
          <button 
            className="flex flex-col items-center justify-center py-3 text-gray-600"
            onClick={() => navigate('/account')}
          >
            <User className="w-6 h-6" />
            <span className="text-xs mt-1">Account</span>
          </button>
        </nav>
      </div>
      
      {/* Safe area padding for notched devices */}
      <div className="h-[env(safe-area-inset-bottom)]" />
    </div>
  );
};

export default BottomNavigation;