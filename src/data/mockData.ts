import { Restaurant, MenuItem, Table, Review } from '../types';

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
      rating: 4.7,
      ratingCount: 256,
      reviews: generateMockReviews('v2'),
      ingredients: [
        'Pizza Dough',
        'Fresh Tomatoes',
        'Mozzarella Cheese',
        'Fresh Basil',
        'Olive Oil'
      ],
      nutritionInfo: {
        calories: 266,
        protein: 11,
        carbs: 33,
        fat: 10
      }
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
      rating: 4.6,
      ratingCount: 189,
      reviews: generateMockReviews('v3'),
      ingredients: [
        'Basmati Rice',
        'Mixed Vegetables',
        'Indian Spices',
        'Ghee',
        'Saffron'
      ],
      nutritionInfo: {
        calories: 310,
        protein: 7,
        carbs: 52,
        fat: 9
      }
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
      rating: 4.4,
      ratingCount: 167,
      reviews: generateMockReviews('v4'),
      ingredients: [
        'Penne Pasta',
        'Seasonal Vegetables',
        'Light Cream',
        'Parmesan Cheese',
        'Italian Herbs'
      ],
      nutritionInfo: {
        calories: 380,
        protein: 12,
        carbs: 58,
        fat: 12
      }
    },
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
      rating: 4.8,
      ratingCount: 234,
      reviews: generateMockReviews('nv1'),
      ingredients: [
        'Chicken Breast',
        'Herbs',
        'Olive Oil',
        'Garlic',
        'Lemon'
      ],
      nutritionInfo: {
        calories: 165,
        protein: 31,
        carbs: 0,
        fat: 3.6
      }
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
      ratingCount: 312,
      reviews: generateMockReviews('nv2'),
      ingredients: [
        'Beef Patty',
        'Cheddar Cheese',
        'Lettuce',
        'Tomato',
        'Burger Bun'
      ],
      nutritionInfo: {
        calories: 550,
        protein: 25,
        carbs: 39,
        fat: 29
      }
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
      rating: 4.7,
      ratingCount: 278,
      reviews: generateMockReviews('nv3'),
      ingredients: [
        'Chicken',
        'Tomato Sauce',
        'Cream',
        'Butter',
        'Indian Spices'
      ],
      nutritionInfo: {
        calories: 490,
        protein: 28,
        carbs: 12,
        fat: 35
      }
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
      rating: 4.8,
      ratingCount: 198,
      reviews: generateMockReviews('nv4'),
      ingredients: [
        'Salmon Fillet',
        'Lemon',
        'Fresh Herbs',
        'Olive Oil',
        'Garlic'
      ],
      nutritionInfo: {
        calories: 412,
        protein: 46,
        carbs: 0,
        fat: 23
      }
    },
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
      rating: 4.6,
      ratingCount: 345,
      reviews: generateMockReviews('d1'),
      ingredients: [
        'Espresso',
        'Steamed Milk',
        'Milk Foam'
      ],
      nutritionInfo: {
        calories: 120,
        protein: 8,
        carbs: 12,
        fat: 4
      }
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
      rating: 4.5,
      ratingCount: 167,
      reviews: generateMockReviews('d2'),
      ingredients: [
        'Green Tea Leaves',
        'Hot Water'
      ],
      nutritionInfo: {
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0
      }
    },
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
      rating: 4.7,
      ratingCount: 223,
      reviews: generateMockReviews('d3'),
      ingredients: [
        'Fresh Lemons',
        'Honey',
        'Mint Leaves',
        'Cold Water'
      ],
      nutritionInfo: {
        calories: 90,
        protein: 0,
        carbs: 24,
        fat: 0
      }
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
      ratingCount: 189,
      reviews: generateMockReviews('d4'),
      ingredients: [
        'Fresh Mangoes',
        'Yogurt',
        'Honey',
        'Ice'
      ],
      nutritionInfo: {
        calories: 180,
        protein: 5,
        carbs: 36,
        fat: 2
      }
    },
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
      rating: 4.6,
      ratingCount: 156,
      reviews: generateMockReviews('d5'),
      ingredients: [
        'Mint Leaves',
        'Lime Juice',
        'Sugar Syrup',
        'Soda Water'
      ],
      nutritionInfo: {
        calories: 80,
        protein: 0,
        carbs: 20,
        fat: 0
      }
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
      rating: 4.7,
      ratingCount: 178,
      reviews: generateMockReviews('d6'),
      ingredients: [
        'Pineapple Juice',
        'Orange Juice',
        'Passion Fruit Juice',
        'Grenadine'
      ],
      nutritionInfo: {
        calories: 160,
        protein: 1,
        carbs: 40,
        fat: 0
      }
    }
  ];
};

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