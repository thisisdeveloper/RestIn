import React, { useState } from 'react';
import { X, Star, Clock, ChevronRight, Utensils, Info } from 'lucide-react';
import { MenuItem } from '../types';
import useStore from '../store';

interface MenuItemFullViewProps {
  item: MenuItem;
  onClose: () => void;
}

const MenuItemFullView: React.FC<MenuItemFullViewProps> = ({ item, onClose }) => {
  const { addToCart } = useStore();
  const [quantity, setQuantity] = React.useState(1);
  const [specialInstructions, setSpecialInstructions] = useState('');

  const handleAddToCart = () => {
    addToCart(item, quantity, specialInstructions);
    onClose();
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
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 overflow-y-auto">
      <div className="min-h-screen px-0 sm:px-4 py-4 flex items-start justify-center">
        <div className="bg-white w-full max-w-4xl rounded-none sm:rounded-lg shadow-xl overflow-hidden animate-fade-in">
          {/* Header with image */}
          <div className="relative h-64 sm:h-96">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover"
            />
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            {item.featured && (
              <div className="absolute top-4 left-4">
                <span className="px-2 py-1 bg-yellow-400 text-yellow-900 rounded-full text-xs font-medium">
                  Featured
                </span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-6">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold mb-2">{item.name}</h1>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                  {item.rating && (
                    <div className="flex items-center">
                      {renderStars(item.rating)}
                      <span className="ml-2 text-sm text-gray-600">
                        {item.rating} ({item.ratingCount} reviews)
                      </span>
                    </div>
                  )}
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{item.preparationTime} mins</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2">
                <div className="text-xl sm:text-2xl font-bold text-indigo-600">
                  ${item.price.toFixed(2)}
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center border rounded-lg overflow-hidden">
                    <button
                      onClick={() => setQuantity(q => Math.max(1, q - 1))}
                      className="px-2 sm:px-3 py-1 bg-gray-100 hover:bg-gray-200 transition-colors"
                    >
                      -
                    </button>
                    <span className="px-3 sm:px-4 py-1">{quantity}</span>
                    <button
                      onClick={() => setQuantity(q => q + 1)}
                      className="px-2 sm:px-3 py-1 bg-gray-100 hover:bg-gray-200 transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Description and Tags */}
            <div className="mb-6">
              <p className="text-gray-600 text-sm sm:text-base mb-4">{item.description}</p>
              {item.tags && item.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
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
            </div>

            {/* Grid layout for details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Ingredients */}
              {item.ingredients && (
                <div>
                  <h2 className="text-lg sm:text-xl font-bold mb-3 flex items-center">
                    <Utensils className="w-5 h-5 mr-2" />
                    Ingredients
                  </h2>
                  <ul className="space-y-2">
                    {item.ingredients.map(ingredient => (
                      <li
                        key={ingredient}
                        className="flex items-center text-sm text-gray-600"
                      >
                        <ChevronRight className="w-4 h-4 mr-1 text-indigo-500 flex-shrink-0" />
                        {ingredient}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Nutrition Info */}
              {item.nutritionInfo && (
                <div>
                  <h2 className="text-lg sm:text-xl font-bold mb-3 flex items-center">
                    <Info className="w-5 h-5 mr-2" />
                    Nutrition Information
                  </h2>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-gray-50 p-3 rounded-lg text-center">
                      <div className="text-gray-500 text-xs">Calories</div>
                      <div className="font-bold text-base">
                        {item.nutritionInfo.calories}
                      </div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg text-center">
                      <div className="text-gray-500 text-xs">Protein</div>
                      <div className="font-bold text-base">
                        {item.nutritionInfo.protein}g
                      </div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg text-center">
                      <div className="text-gray-500 text-xs">Carbs</div>
                      <div className="font-bold text-base">
                        {item.nutritionInfo.carbs}g
                      </div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg text-center">
                      <div className="text-gray-500 text-xs">Fat</div>
                      <div className="font-bold text-base">
                        {item.nutritionInfo.fat}g
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Special Instructions */}
            <div className="mb-4">
              <label htmlFor="special-instructions" className="block text-sm font-medium text-gray-700 mb-2">
                Special Instructions
              </label>
              <textarea
                id="special-instructions"
                rows={3}
                placeholder="Any special requests? (e.g., no onions, extra spicy)"
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={!item.available}
              className={`w-full py-3 rounded-lg font-bold text-white ${
                item.available
                  ? 'bg-indigo-600 hover:bg-indigo-700'
                  : 'bg-gray-400 cursor-not-allowed'
              }`}
            >
              Add to Cart
            </button>

            {/* Reviews */}
            {item.reviews && item.reviews.length > 0 && (
              <div className="mt-8">
                <h2 className="text-lg sm:text-xl font-bold mb-4">Customer Reviews</h2>
                <div className="space-y-4">
                  {item.reviews.map(review => (
                    <div
                      key={review.id}
                      className="border-b pb-4 last:border-b-0"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <div className="w-7 h-7 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 text-sm font-medium">
                            {review.userName[0]}
                          </div>
                          <span className="ml-2 text-sm font-medium">
                            {review.userName}
                          </span>
                        </div>
                        <div className="flex items-center">
                          {renderStars(review.rating)}
                          <span className="ml-2 text-gray-500 text-xs">
                            {new Date(review.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuItemFullView;