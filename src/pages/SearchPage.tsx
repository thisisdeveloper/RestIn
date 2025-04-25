import React, { useState } from 'react';
import { ArrowLeft, Search, MapPin, Navigation } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Restaurant } from '../types';

// Mock data for demonstration
const mockRestaurants: Restaurant[] = [
  {
    id: 'rest-1',
    name: 'Gourmet Delight',
    description: 'Fine dining restaurant with a modern twist',
    logo: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=800',
    location: {
      address: '123 Main St, New York, NY 10001',
      coordinates: { lat: 40.7128, lng: -74.0060 }
    },
    tables: [],
    menu: []
  },
  {
    id: 'rest-2',
    name: 'Spice Garden',
    description: 'Authentic Indian cuisine in a cozy setting',
    logo: 'https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&w=800',
    location: {
      address: '456 Oak St, New York, NY 10002',
      coordinates: { lat: 40.7282, lng: -73.9942 }
    },
    tables: [],
    menu: []
  },
  {
    id: 'rest-3',
    name: 'Sushi Master',
    description: 'Premium Japanese dining experience',
    logo: 'https://images.pexels.com/photos/2098085/pexels-photo-2098085.jpeg?auto=compress&cs=tinysrgb&w=800',
    location: {
      address: '789 Pine St, New York, NY 10003',
      coordinates: { lat: 40.7549, lng: -73.9840 }
    },
    tables: [],
    menu: []
  }
];

interface Location {
  state: string;
  city: string;
  pincode?: string;
}

const SearchPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState<Location>({
    state: '',
    city: '',
    pincode: ''
  });
  const [showLocationFilter, setShowLocationFilter] = useState(false);

  const filteredRestaurants = mockRestaurants.filter(restaurant => {
    const matchesSearch = restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      restaurant.description?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesLocation = !location.state || !location.city ||
      restaurant.location?.address.toLowerCase().includes(location.state.toLowerCase()) &&
      restaurant.location?.address.toLowerCase().includes(location.city.toLowerCase());

    const matchesPincode = !location.pincode ||
      restaurant.location?.address.includes(location.pincode);

    return matchesSearch && matchesLocation && matchesPincode;
  });

  const handleRestaurantSelect = (restaurant: Restaurant) => {
    // In a real app, you would fetch the full restaurant data here
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-md sticky top-0 z-10">
        <div className="max-w-lg mx-auto px-4 py-4">
          <div className="flex items-center">
            <button 
              onClick={() => navigate('/scan')}
              className="p-2 -ml-2 rounded-full hover:bg-gray-100"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-bold ml-2">Find Restaurants</h1>
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-6">
        {/* Search Bar */}
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search restaurants..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Location Filter */}
        <div className="mb-6">
          <button
            onClick={() => setShowLocationFilter(!showLocationFilter)}
            className="flex items-center text-indigo-600 font-medium"
          >
            <MapPin className="w-5 h-5 mr-1" />
            {showLocationFilter ? 'Hide Filters' : 'Filter by Location'}
          </button>

          {showLocationFilter && (
            <div className="mt-4 space-y-4 bg-white p-4 rounded-xl shadow-sm">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  State
                </label>
                <input
                  type="text"
                  value={location.state}
                  onChange={(e) => setLocation({ ...location, state: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter state"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  City
                </label>
                <input
                  type="text"
                  value={location.city}
                  onChange={(e) => setLocation({ ...location, city: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter city"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Pincode (Optional)
                </label>
                <input
                  type="text"
                  value={location.pincode}
                  onChange={(e) => setLocation({ ...location, pincode: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter pincode"
                />
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        <div className="space-y-4">
          {filteredRestaurants.map(restaurant => (
            <div
              key={restaurant.id}
              onClick={() => handleRestaurantSelect(restaurant)}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
            >
              <div className="flex">
                <img
                  src={restaurant.logo}
                  alt={restaurant.name}
                  className="w-24 h-24 object-cover"
                />
                <div className="p-4 flex-1">
                  <h3 className="font-semibold text-lg mb-1">{restaurant.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{restaurant.description}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <Navigation className="w-4 h-4 mr-1" />
                    {restaurant.location?.address}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {filteredRestaurants.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No restaurants found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;