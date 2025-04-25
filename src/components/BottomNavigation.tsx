import React from 'react';
import { Home, ClipboardList, User, ShoppingCart } from 'lucide-react';
import useStore from '../store';

interface BottomNavigationProps {
  onOrderHistoryClick: () => void;
  onCartClick: () => void;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({
  onOrderHistoryClick,
  onCartClick
}) => {
  const { cart } = useStore();
  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg safe-area-bottom z-50">
      <div className="max-w-lg mx-auto px-4">
        <nav className="flex justify-around py-3">
          <button className="flex flex-col items-center text-indigo-600">
            <Home className="w-6 h-6" />
            <span className="text-xs mt-1">Home</span>
          </button>
          
          <button 
            className="flex flex-col items-center text-gray-600 relative"
            onClick={onCartClick}
          >
            <ShoppingCart className="w-6 h-6" />
            <span className="text-xs mt-1">Cart</span>
            {cartItemsCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-indigo-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {cartItemsCount}
              </span>
            )}
          </button>
          
          <button 
            className="flex flex-col items-center text-gray-600"
            onClick={onOrderHistoryClick}
          >
            <ClipboardList className="w-6 h-6" />
            <span className="text-xs mt-1">Orders</span>
          </button>
          
          <button className="flex flex-col items-center text-gray-600">
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