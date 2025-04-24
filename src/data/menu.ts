import { MenuItem, CategoryType } from '../types';

export const generateMockMenuItems = (): MenuItem[] => {
  return [
    // Veg Items
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
      ratingCount: 128
    },
    {
      id: 'v2',
      name: 'Margherita Pizza',
      description: 'Fresh tomatoes, mozzarella cheese, and basil on a thin crust',
      price: 12.99,
      category: 'Veg',
      subCategory: 'Mains',
      image: 'https://images.pexels.com/photos/1146760/pexels-photo-1146760.jpeg?auto=compress&cs=tinysrgb&w=800',
      available: true,
      preparationTime: 20,
      featured: true,
      tags: ['Italian', 'Cheesy'],
      rating: 4.8,
      ratingCount: 256
    },
    {
      id: 'v3',
      name: 'Vegetable Biryani',
      description: 'Aromatic basmati rice cooked with mixed vegetables and spices',
      price: 14.99,
      category: 'Veg',
      subCategory: 'Mains',
      image: 'https://images.pexels.com/photos/7437090/pexels-photo-7437090.jpeg?auto=compress&cs=tinysrgb&w=800',
      available: true,
      preparationTime: 25,
      tags: ['Spicy', 'Indian'],
      rating: 4.3,
      ratingCount: 89
    },
    {
      id: 'v4',
      name: 'Pasta Primavera',
      description: 'Penne pasta with seasonal vegetables in a light cream sauce',
      price: 13.99,
      category: 'Veg',
      subCategory: 'Mains',
      image: 'https://images.pexels.com/photos/1487511/pexels-photo-1487511.jpeg?auto=compress&cs=tinysrgb&w=800',
      available: true,
      preparationTime: 18,
      tags: ['Italian', 'Creamy'],
      rating: 4.2,
      ratingCount: 156
    },
    
    // Non-Veg Items
    {
      id: 'nv1',
      name: 'Grilled Chicken Breast',
      description: 'Tender chicken breast seasoned and grilled to perfection',
      price: 16.99,
      category: 'NonVeg',
      subCategory: 'Mains',
      image: 'https://images.pexels.com/photos/2741458/pexels-photo-2741458.jpeg?auto=compress&cs=tinysrgb&w=800',
      available: true,
      preparationTime: 22,
      featured: true,
      tags: ['Protein', 'Healthy'],
      rating: 4.7,
      ratingCount: 203
    },
    {
      id: 'nv2',
      name: 'Classic Cheeseburger',
      description: 'Juicy beef patty with cheddar cheese and fresh vegetables',
      price: 14.99,
      category: 'NonVeg',
      subCategory: 'Mains',
      image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=800',
      available: true,
      preparationTime: 15,
      featured: true,
      tags: ['American', 'Hearty'],
      rating: 4.6,
      ratingCount: 312
    },
    {
      id: 'nv3',
      name: 'Butter Chicken',
      description: 'Tender chicken pieces in a rich and creamy tomato sauce',
      price: 17.99,
      category: 'NonVeg',
      subCategory: 'Mains',
      image: 'https://images.pexels.com/photos/7625056/pexels-photo-7625056.jpeg?auto=compress&cs=tinysrgb&w=800',
      available: true,
      preparationTime: 25,
      tags: ['Indian', 'Spicy', 'Creamy'],
      rating: 4.9,
      ratingCount: 178
    },
    {
      id: 'nv4',
      name: 'Grilled Salmon',
      description: 'Fresh Atlantic salmon fillet with herbs and lemon',
      price: 19.99,
      category: 'NonVeg',
      subCategory: 'Mains',
      image: 'https://images.pexels.com/photos/3763847/pexels-photo-3763847.jpeg?auto=compress&cs=tinysrgb&w=800',
      available: true,
      preparationTime: 20,
      tags: ['Seafood', 'Healthy'],
      rating: 4.4,
      ratingCount: 145
    },
    
    // Drinks - Hot Beverages
    {
      id: 'd1',
      name: 'Cappuccino',
      description: 'Espresso with steamed milk and a layer of foamed milk',
      price: 4.99,
      category: 'Drink',
      subCategory: 'Hot Beverages',
      image: 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=800',
      available: true,
      preparationTime: 5,
      featured: true,
      tags: ['Coffee', 'Hot'],
      rating: 4.7,
      ratingCount: 423
    },
    {
      id: 'd2',
      name: 'Green Tea',
      description: 'Premium Japanese green tea leaves, delicately brewed',
      price: 3.99,
      category: 'Drink',
      subCategory: 'Hot Beverages',
      image: 'https://images.pexels.com/photos/1417945/pexels-photo-1417945.jpeg?auto=compress&cs=tinysrgb&w=800',
      available: true,
      preparationTime: 3,
      tags: ['Tea', 'Hot', 'Healthy'],
      rating: 4.3,
      ratingCount: 167
    },
    
    // Drinks - Cold Beverages
    {
      id: 'd3',
      name: 'Fresh Lemonade',
      description: 'Freshly squeezed lemons with hint of mint and honey',
      price: 4.99,
      category: 'Drink',
      subCategory: 'Cold Beverages',
      image: 'https://images.pexels.com/photos/2109099/pexels-photo-2109099.jpeg?auto=compress&cs=tinysrgb&w=800',
      available: true,
      preparationTime: 5,
      featured: true,
      tags: ['Refreshing', 'Sweet'],
      rating: 4.6,
      ratingCount: 234
    },
    {
      id: 'd4',
      name: 'Mango Smoothie',
      description: 'Ripe mangoes blended with yogurt and a hint of honey',
      price: 6.99,
      category: 'Drink',
      subCategory: 'Cold Beverages',
      image: 'https://images.pexels.com/photos/1028708/pexels-photo-1028708.jpeg?auto=compress&cs=tinysrgb&w=800',
      available: true,
      preparationTime: 7,
      tags: ['Fruity', 'Refreshing'],
      rating: 4.8,
      ratingCount: 189
    },
    
    // Drinks - Mocktails
    {
      id: 'd5',
      name: 'Virgin Mojito',
      description: 'Muddled mint leaves, lime juice, and soda water',
      price: 7.99,
      category: 'Drink',
      subCategory: 'Mocktails',
      image: 'https://images.pexels.com/photos/4021983/pexels-photo-4021983.jpeg?auto=compress&cs=tinysrgb&w=800',
      available: true,
      preparationTime: 8,
      tags: ['Refreshing', 'Minty'],
      rating: 4.5,
      ratingCount: 156
    },
    {
      id: 'd6',
      name: 'Tropical Punch',
      description: 'Blend of pineapple, orange, and passion fruit juices',
      price: 8.99,
      category: 'Drink',
      subCategory: 'Mocktails',
      image: 'https://images.pexels.com/photos/1232152/pexels-photo-1232152.jpeg?auto=compress&cs=tinysrgb&w=800',
      available: true,
      preparationTime: 6,
      featured: true,
      tags: ['Fruity', 'Sweet'],
      rating: 4.4,
      ratingCount: 178
    }
  ];
};