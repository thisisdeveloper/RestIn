import { Restaurant, Table } from '../types';
import { generateMockMenuItems } from './menu';

// Generate mock tables
const generateMockTables = (): Table[] => {
  return Array.from({ length: 10 }, (_, i) => ({
    id: `table-${i + 1}`,
    number: i + 1,
    seats: 4 + (i % 2) * 2, // Tables have either 4 or 6 seats
    qrCode: `table-${i + 1}-qr`
  }));
};

// Generate mock restaurant
export const generateMockRestaurant = (): Restaurant => {
  return {
    id: 'rest-1',
    name: 'Gourmet Delight',
    logo: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=800',
    tables: generateMockTables(),
    menu: generateMockMenuItems()
  };
};

// Mock data for development
export const mockRestaurant = generateMockRestaurant();

// Simulated function to get restaurant data by ID
export const getRestaurantById = (id: string): Promise<Restaurant> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockRestaurant);
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