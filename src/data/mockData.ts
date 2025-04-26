import { Restaurant, MenuItem, Table, Review, Stall } from '../types';

// Generate mock reviews
const generateMockReviews = (itemId: string): Review[] => {
  const reviews: Review[] = [
    {
      id: `${itemId}-rev1`,
      userId: 'user1',
      userName: 'John D.',
      rating: 5,
      comment: 'Absolutely delicious! The flavors were perfectly balanced.',
      createdAt: new Date('2024-02-15')
    },
    {
      id: `${itemId}-rev2`,
      userId: 'user2',
      userName: 'Sarah M.',
      rating: 4,
      comment: 'Really enjoyed this dish. Would definitely order again!',
      createdAt: new Date('2024-02-10')
    },
    {
      id: `${itemId}-rev3`,
      userId: 'user3',
      userName: 'Mike R.',
      rating: 5,
      comment: 'One of the best dishes I\'ve had here. Highly recommended!',
      createdAt: new Date('2024-02-05')
    }
  ];
  return reviews;
};

// Generate mock menu items
const generateMockMenuItems = (): MenuItem[] => {
  return [
    {
      id: 'v1',
      name: 'Garden Fresh Salad',
      description: 'Mixed greens, cherry tomatoes, cucumber, and house dressing',
      price: 8.99,
      category: 'Veg',
      subCategory: 'Starters',
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800',
      available: true,
      preparationTime: 10,
      featured: true,
      tags: ['Healthy', 'Fresh', 'Gluten-Free'],
      rating: 4.5,
      ratingCount: 128,
      reviews: generateMockReviews('v1'),
      ingredients: [
        'Mixed Greens',
        'Cherry Tomatoes',
        'Cucumber',
        'Red Onions',
        'House Dressing'
      ],
      nutritionInfo: {
        calories: 120,
        protein: 3,
        carbs: 12,
        fat: 7
      }
    },
    // ... other menu items
  ];
};

// Generate mock tables
const generateMockTables = (): Table[] => {
  return Array.from({ length: 10 }, (_, i) => ({
    id: `table-${i + 1}`,
    number: i + 1,
    seats: 4 + (i % 2) * 2,
    qrCode: `table-${i + 1}-qr`
  }));
};

// Generate mock stalls for food court
const generateMockStalls = (): Stall[] => {
  return [
    {
      id: 'stall-1',
      name: 'Asian Delights',
      description: 'Authentic Asian cuisine featuring dishes from various regions',
      logo: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800',
      cuisine: 'Asian',
      menu: generateMockMenuItems()
    },
    {
      id: 'stall-2',
      name: 'Mediterranean Corner',
      description: 'Fresh Mediterranean dishes with a modern twist',
      logo: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=800',
      cuisine: 'Mediterranean',
      menu: generateMockMenuItems()
    },
    {
      id: 'stall-3',
      name: 'Burger Joint',
      description: 'Gourmet burgers and sides',
      logo: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=800',
      cuisine: 'American',
      menu: generateMockMenuItems()
    }
  ];
};

// Generate mock restaurant
export const generateMockRestaurant = (): Restaurant => {
  return {
    id: 'rest-1',
    name: 'Gourmet Delight',
    description: 'Experience culinary excellence at Gourmet Delight, where traditional flavors meet modern innovation. Our passionate chefs craft each dish with the finest ingredients, creating memorable dining experiences in an elegant atmosphere.',
    logo: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=800',
    venueType: 'restaurant',
    location: {
      address: '123 Culinary Street, Foodie District, FC 12345',
      coordinates: {
        lat: 40.7128,
        lng: -74.0060
      }
    },
    hours: {
      open: '11:00',
      close: '23:00'
    },
    tables: generateMockTables(),
    menu: generateMockMenuItems()
  };
};

// Generate mock food court
export const generateMockFoodCourt = (): Restaurant => {
  return {
    id: 'fc-1',
    name: 'Global Food Court',
    description: 'A diverse collection of cuisines from around the world',
    logo: 'https://images.pexels.com/photos/1579739/pexels-photo-1579739.jpeg?auto=compress&cs=tinysrgb&w=800',
    venueType: 'foodCourt',
    location: {
      address: '456 Food Street, Culinary District, FC 54321',
      coordinates: {
        lat: 40.7128,
        lng: -74.0060
      }
    },
    hours: {
      open: '10:00',
      close: '22:00'
    },
    tables: generateMockTables(),
    stalls: generateMockStalls(),
    currentStallId: 'stall-1',
    menu: [] // Food courts don't have their own menu, only stalls do
  };
};

// Mock data for development
export const mockRestaurant = generateMockRestaurant();
export const mockFoodCourt = generateMockFoodCourt();

// Simulated function to get restaurant data by ID
export const getRestaurantById = (id: string): Promise<Restaurant> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (id === 'fc-1') {
        resolve(mockFoodCourt);
      } else {
        resolve(mockRestaurant);
      }
    }, 500);
  });
};

// Simulated function to get table by QR code
export const getTableByQRCode = (qrCode: string): Promise<Table | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const table = mockRestaurant.tables.find(table => table.qrCode === qrCode);
      resolve(table || null);
    }, 300);
  });
};