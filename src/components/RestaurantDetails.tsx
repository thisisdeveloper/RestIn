import React, { useState } from 'react';
import { Star, Clock, MapPin, X, ExternalLink, Menu } from 'lucide-react';
import useStore from '../store';
import MenuItemFullView from './MenuItemFullView';

interface RestaurantDetailsProps {
  isVisible: boolean;
  onClose: () => void;
}

const RestaurantDetails: React.FC<RestaurantDetailsProps> = ({ isVisible, onClose }) => {
  const { currentRestaurant } = useStore();
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  if (!isVisible || !currentRestaurant) return null;

  const getCurrentStall = () => {
    if (!currentRestaurant?.stalls || !currentRestaurant.currentStallId) return null;
    return currentRestaurant.stalls.find(s => s.id === currentRestaurant.currentStallId);
  };

  const currentStall = getCurrentStall();
  const displayMenu = currentRestaurant.venueType === 'foodCourt' ? currentStall?.menu : currentRestaurant.menu;

  // Calculate average rating from menu items
  const ratedItems = displayMenu?.filter(item => item.rating !== undefined) || [];
  const averageRating = ratedItems.length
    ? ratedItems.reduce((sum, item) => sum + (item.rating || 0), 0) / ratedItems.length
    : 0;
  const totalReviews = ratedItems.reduce((sum, item) => sum + (item.ratingCount || 0), 0);

  // Get featured items
  const featuredItems = displayMenu?.filter(item => item.featured) || [];

  // Check if restaurant is currently open
  const isOpen = () => {
    if (!currentRestaurant.hours) return true;
    const now = new Date();
    const currentTime = now.getHours() * 100 + now.getMinutes();
    const [openHours, openMinutes] = currentRestaurant.hours.open.split(':').map(Number);
    const [closeHours, closeMinutes] = currentRestaurant.hours.close.split(':').map(Number);
    const openTime = openHours * 100 + openMinutes;
    const closeTime = closeHours * 100 + closeMinutes;
    return currentTime >= openTime && currentTime <= closeTime;
  };

  const handleItemClick = (itemId: string) => {
    setSelectedItem(itemId);
  };

  const getGoogleMapsUrl = () => {
    if (!currentRestaurant.location?.coordinates) return '';
    const { lat, lng } = currentRestaurant.location.coordinates;
    return `https://www.google.com/maps?q=${lat},${lng}`;
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 overflow-y-auto">
        <div className="min-h-screen flex items-start justify-center py-4">
          <div className="bg-white w-full max-w-2xl rounded-none sm:rounded-lg shadow-xl overflow-hidden animate-fade-in mx-4 sm:mx-0">
            {/* Header Image */}
            <div className="relative h-48 sm:h-64">
              <img
                src={currentStall?.logo || currentRestaurant.logo}
                alt={currentStall?.name || currentRestaurant.name}
                className="w-full h-full object-cover"
              />
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
                <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                  {currentStall?.name || currentRestaurant.name}
                </h1>
                {currentStall && (
                  <p className="text-white text-opacity-90">
                    {currentStall.cuisine} • {currentRestaurant.name}
                  </p>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="p-4 sm:p-6">
              {/* Description */}
              {(currentStall?.description || currentRestaurant.description) && (
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {currentStall?.description || currentRestaurant.description}
                </p>
              )}

              {/* Stats and Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center mb-3">
                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400 mr-2" />
                    <span className="font-semibold text-lg">{averageRating.toFixed(1)}</span>
                    <span className="text-gray-600 ml-1">({totalReviews} reviews)</span>
                  </div>
                  <div className="flex items-center">
                    <Menu className="w-5 h-5 text-gray-600 mr-2" />
                    <span className="text-gray-600">
                      {displayMenu?.length || 0} Items Available
                    </span>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center mb-3">
                    <Clock className="w-5 h-5 text-gray-600 mr-2" />
                    <div>
                      <span className={`font-medium ${isOpen() ? 'text-green-600' : 'text-red-600'}`}>
                        {isOpen() ? 'Open Now' : 'Closed'}
                      </span>
                      {currentRestaurant.hours && (
                        <span className="text-gray-600 ml-2">
                          ({currentRestaurant.hours.open} - {currentRestaurant.hours.close})
                        </span>
                      )}
                    </div>
                  </div>
                  {currentRestaurant.location && (
                    <a
                      href={getGoogleMapsUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-indigo-600 hover:text-indigo-700 transition-colors"
                    >
                      <MapPin className="w-5 h-5 mr-2" />
                      <span className="flex-1">{currentRestaurant.location.address}</span>
                      <ExternalLink className="w-4 h-4 ml-1" />
                    </a>
                  )}
                </div>
              </div>

              {/* Featured Items */}
              {featuredItems.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-xl font-bold mb-4 flex items-center">
                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400 mr-2" />
                    Featured Items
                  </h2>
                  <div className="grid grid-cols-1 gap-4">
                    {featuredItems.map(item => (
                      <div 
                        key={item.id} 
                        className="bg-gray-50 rounded-lg overflow-hidden flex flex-col sm:flex-row cursor-pointer hover:shadow-md transition-shadow"
                        onClick={() => handleItemClick(item.id)}
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full sm:w-48 h-48 sm:h-32 object-cover"
                        />
                        <div className="p-4 flex-1">
                          <h3 className="font-bold text-lg mb-1">{item.name}</h3>
                          <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                            {item.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                              <span className="ml-1 font-medium">{item.rating}</span>
                              {item.ratingCount && (
                                <span className="text-sm text-gray-500 ml-1">
                                  ({item.ratingCount})
                                </span>
                              )}
                            </div>
                            <span className="text-lg font-bold text-indigo-600">
                              ${item.price.toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Recent Reviews */}
              <div>
                <h2 className="text-xl font-bold mb-4 flex items-center">
                  <Star className="w-5 h-5 text-yellow-400 fill-yellow-400 mr-2" />
                  Recent Reviews
                </h2>
                <div className="space-y-4">
                  {ratedItems.slice(0, 3).map(item => (
                    item.reviews?.[0] && (
                      <div key={item.reviews[0].id} className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-medium text-lg">
                              {item.reviews[0].userName[0]}
                            </div>
                            <div className="ml-3">
                              <span className="font-medium block">
                                {item.reviews[0].userName}
                              </span>
                              <span className="text-sm text-gray-500">
                                {new Date(item.reviews[0].createdAt).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center bg-white px-2 py-1 rounded-full">
                            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                            <span className="ml-1 font-medium">{item.reviews[0].rating}</span>
                          </div>
                        </div>
                        <p className="text-gray-600 mb-2">{item.reviews[0].comment}</p>
                        <div className="flex items-center text-sm text-gray-500">
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="w-8 h-8 rounded object-cover mr-2"
                          />
                          Review for {item.name}
                        </div>
                      </div>
                    )
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Item Detail Modal */}
      {selectedItem && displayMenu && (
        <MenuItemFullView
          item={displayMenu.find(item => item.id === selectedItem)!}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </>
  );
};

export default RestaurantDetails;