import React, { useState, useEffect } from 'react';
import { Plus, Minus, Clock, Star, Heart, Percent } from 'lucide-react';
import { MenuItem } from '../types';
import useStore from '../store';
import MenuItemFullView from './MenuItemFullView';

interface MenuItemCardProps {
  item: MenuItem;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({ item }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [showFullView, setShowFullView] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  
  const { addToCart, cart } = useStore();
  
  const itemInCart = cart.find(cartItem => cartItem.id === item.id);
  const isInCart = !!itemInCart;

  useEffect(() => {
    if (itemInCart) {
      setQuantity(itemInCart.quantity);
      setSpecialInstructions(itemInCart.specialInstructions || '');
    } else {
      setQuantity(1);
      setSpecialInstructions('');
    }
  }, [itemInCart]);
  
  const handleAddToCart = () => {
    addToCart(item, quantity, specialInstructions);
    setIsExpanded(false);
  };
  
  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  const categoryColors: Record<string, string> = {
    Veg: 'bg-green-100 text-green-800 border-green-200',
    NonVeg: 'bg-red-100 text-red-800 border-red-200',
    Drink: 'bg-blue-100 text-blue-800 border-blue-200'
  };

  const renderStars = (rating: number = 0) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={14}
            className={`${
              star <= rating
                ? 'text-yellow-400 fill-yellow-400'
                : 'text-gray-300 fill-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <>
      <div 
        className={`bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 ${
          isExpanded ? 'scale-[1.02] shadow-lg' : ''
        }`}
        onClick={() => !isExpanded && setShowFullView(true)}
      >
        <div className="relative">
          <img 
            src={item.image} 
            alt={item.name}
            className="w-full h-48 object-cover"
          />
          
          {/* Category Badge */}
          <div className="absolute top-3 left-3">
            <span className={`px-3 py-1.5 rounded-full text-xs font-medium border ${categoryColors[item.category]}`}>
              {item.category}
            </span>
          </div>

          {/* Featured & Discount Badges */}
          <div className="absolute top-3 right-3 flex flex-col gap-2">
            {item.featured && (
              <span className="px-3 py-1.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 border border-yellow-200 backdrop-blur-sm">
                Featured
              </span>
            )}
            {Math.random() > 0.5 && ( // Simulated discount for demo
              <span className="px-3 py-1.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 border border-purple-200 backdrop-blur-sm flex items-center">
                <Percent className="w-3 h-3 mr-1" />
                20% Off
              </span>
            )}
          </div>

          {/* Like Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsLiked(!isLiked);
            }}
            className={`absolute bottom-3 right-3 p-2 rounded-full transition-all duration-300 ${
              isLiked 
                ? 'bg-red-500 text-white' 
                : 'bg-white/80 text-gray-600 hover:bg-white'
            }`}
          >
            <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
          </button>
        </div>
        
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="text-lg font-semibold mb-1">{item.name}</h3>
              {item.rating !== undefined && (
                <div className="flex items-center gap-2">
                  {renderStars(item.rating)}
                  <span className="text-sm text-gray-500">
                    ({item.ratingCount})
                  </span>
                </div>
              )}
            </div>
            <div className="text-right">
              <div className="text-xl font-bold text-indigo-600">${item.price.toFixed(2)}</div>
              {Math.random() > 0.5 && ( // Simulated original price for demo
                <div className="text-sm text-gray-400 line-through">
                  ${(item.price * 1.2).toFixed(2)}
                </div>
              )}
            </div>
          </div>
          
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.description}</p>
          
          <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
            <div className="flex items-center">
              <Clock size={16} className="mr-1" />
              <span>{item.preparationTime} mins</span>
            </div>
            
            {!item.available && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
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
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(true);
              }}
              disabled={!item.available}
              className={`mt-2 w-full px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 transform hover:scale-105 ${
                item.available 
                  ? 'bg-indigo-600 text-white hover:bg-indigo-700' 
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
              }`}
            >
              {isInCart ? 'Update Order' : 'Add to Cart'}
            </button>
          ) : (
            <div className="mt-3 space-y-3" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Quantity</span>
                <div className="flex items-center">
                  <button
                    onClick={decrementQuantity}
                    className="p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="px-4 font-medium">{quantity}</span>
                  <button
                    onClick={incrementQuantity}
                    className="p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                  >
                    <Plus size={14} />
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                />
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={() => setIsExpanded(false)}
                  className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-800 rounded-xl text-sm font-medium hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddToCart}
                  className="flex-1 px-4 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors"
                >
                  {isInCart ? 'Update Cart' : 'Add to Cart'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {showFullView && (
        <MenuItemFullView
          item={item}
          onClose={() => setShowFullView(false)}
        />
      )}
    </>
  );
};

export default MenuItemCard;