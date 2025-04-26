import { Restaurant } from '../types';
import { generateMockMenuItems } from './menu';
import { generateMockTables } from './mockTables';
import { generateMockStalls } from './mockStalls';

// Generate mock restaurant
export const generateMockRestaurant = (): Restaurant => {
  return {
    id: 'rest-1',
    name: 'Gourmet Delight',
    description: 'Experience culinary excellence at Gourmet Delight, where traditional flavors meet modern innovation. Our passionate chefs craft each dish with the finest ingredients, creating memorable dining experiences in an elegant atmosphere.',
    logo: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=800',
    venueType: 'restaurant',
    location: {
      country: 'US',
      state: 'California',
      city: 'San Francisco',
      address: '123 Culinary Street, San Francisco, CA 94101',
      coordinates: {
        lat: 37.7749,
        lng: -122.4194
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
    description: 'A vibrant culinary destination featuring diverse cuisines from around the world. Experience the best of international flavors under one roof in our modern, welcoming atmosphere.',
    logo: 'https://images.pexels.com/photos/1579739/pexels-photo-1579739.jpeg?auto=compress&cs=tinysrgb&w=800',
    venueType: 'foodCourt',
    location: {
      country: 'US',
      state: 'New York',
      city: 'New York City',
      address: '456 Food Street, Manhattan, NY 10001',
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
    menu: []
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