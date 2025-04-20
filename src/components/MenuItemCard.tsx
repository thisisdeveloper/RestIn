import React, { useState } from 'react';
import { Plus, Minus, Clock } from 'lucide-react';
import { MenuItem } from '../types';
import useStore from '../store';

interface MenuItemCardProps {
  item: MenuItem;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({ item }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [specialInstructions, setSpecialInstructions] = useState('');
  
  const { addToCart, cart } = useStore();
  
  // Check if item is already in cart
  const itemInCart = cart.find(cartItem => cartItem.id === item.id);
  const isInCart = !!itemInCart;
  
  const handleAddToCart = () => {
    addToCart(item, quantity, specialInstructions);
    setQuantity(1);
    setSpecialInstructions('');
    setIsExpanded(false);
  };
  
  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  const categoryColors: Record<string, string> = {
    Veg: 'bg-green-100 text-green-800',
    NonVeg: 'bg-red-100 text-red-800',
    Drink: 'bg-blue-100 text-blue-800'
  };

  return (
    <div 
      className={`bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 ${
        isExpanded ? 'scale-[1.02]' : ''
      }`}
    >
      <div className="relative">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 left-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${categoryColors[item.category]}`}>
            {item.category}
          </span>
        </div>
        {item.featured && (
          <div className="absolute top-2 right-2">
            <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
              Featured
            </span>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold">{item.name}</h3>
          <span className="font-bold text-indigo-700">${item.price.toFixed(2)}</span>
        </div>
        
        <p className="text-gray-600 text-sm mb-3">{item.description}</p>
        
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <Clock size={16} className="mr-1" />
          <span>{item.preparationTime} mins</span>
          
          {!item.available && (
            <span className="ml-2 px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
              Unavailable
            </span>
          )}
        </div>
        
        {item.tags && item.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {item.tags.map(tag => (
              <span 
                key={tag} 
                className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        
        {!isExpanded ? (
          <button
            onClick={() => setIsExpanded(true)}
            disabled={!item.available}
            className={`mt-2 w-full px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
              item.available 
                ? 'bg-indigo-600 text-white hover:bg-indigo-700' 
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
          >
            {isInCart ? 'Update Order' : 'Add to Cart'}
          </button>
        ) : (
          <div className="mt-3 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Quantity</span>
              <div className="flex items-center">
                <button
                  onClick={decrementQuantity}
                  className="p-1 rounded-full bg-gray-200 hover:bg-gray-300"
                >
                  <Minus size={16} />
                </button>
                <span className="px-3">{quantity}</span>
                <button
                  onClick={incrementQuantity}
                  className="p-1 rounded-full bg-gray-200 hover:bg-gray-300"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
            
            <div>
              <label htmlFor={`instructions-${item.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                Special Instructions
              </label>
              <textarea
                id={`instructions-${item.id}`}
                rows={2}
                placeholder="Any special requests?"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
              />
            </div>
            
            <div className="flex space-x-2">
              <button
                onClick={() => setIsExpanded(false)}
                className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg text-sm font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleAddToCart}
                className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700"
              >
                {isInCart ? 'Update Cart' : 'Add to Cart'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuItemCard;