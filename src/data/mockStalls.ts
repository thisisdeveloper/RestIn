import { Stall } from '../types';
import { generateMockMenuItems } from './menu';

export const generateMockStalls = (): Stall[] => {
  return [
    {
      id: 'stall-1',
      name: 'Asian Delights',
      description: 'Authentic Asian cuisine featuring dishes from various regions',
      logo: 'https://images.pexels.com/photos/2098085/pexels-photo-2098085.jpeg?auto=compress&cs=tinysrgb&w=800',
      cuisine: 'Asian',
      menu: generateMockMenuItems()
    },
    {
      id: 'stall-2',
      name: 'Mediterranean Corner',
      description: 'Fresh Mediterranean dishes with a modern twist',
      logo: 'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=800',
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