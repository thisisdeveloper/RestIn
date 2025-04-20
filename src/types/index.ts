export type CategoryType = 'Veg' | 'NonVeg' | 'Drink';
export type DietaryFilter = 'all' | 'veg' | 'nonveg';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: CategoryType;
  subCategory: string;
  image: string;
  available: boolean;
  preparationTime: number; // in minutes
  featured?: boolean;
  tags?: string[];
}

export interface Restaurant {
  id: string;
  name: string;
  logo: string;
  tables: Table[];
  menu: MenuItem[];
}

export interface Table {
  id: string;
  number: number;
  seats: number;
  qrCode: string;
}

export interface CartItem extends MenuItem {
  quantity: number;
  specialInstructions?: string;
}

export type OrderStatus = 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered' | 'cancelled';

export interface Order {
  id: string;
  tableId: string;
  items: CartItem[];
  status: OrderStatus;
  totalAmount: number;
  createdAt: Date;
  updatedAt: Date;
  estimatedDeliveryTime?: Date;
}

export interface Notification {
  id: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  createdAt: Date;
}

export interface AppState {
  // Restaurant and table information
  currentRestaurant: Restaurant | null;
  currentTable: Table | null;
  
  // Cart state
  cart: CartItem[];
  
  // Order state
  orders: Order[];
  currentOrder: Order | null;
  
  // Notifications
  notifications: Notification[];
  
  // QR scanning state
  isScanning: boolean;
  
  // Dietary filter
  dietaryFilter: DietaryFilter;
  
  // Actions
  setCurrentRestaurant: (restaurant: Restaurant) => void;
  setCurrentTable: (table: Table) => void;
  setDietaryFilter: (filter: DietaryFilter) => void;
  addToCart: (item: MenuItem, quantity: number, specialInstructions?: string) => void;
  removeFromCart: (itemId: string) => void;
  updateCartItem: (itemId: string, quantity: number, specialInstructions?: string) => void;
  clearCart: () => void;
  placeOrder: () => void;
  updateOrder: (orderId: string, items: CartItem[]) => void;
  cancelOrder: (orderId: string) => void;
  markNotificationAsRead: (notificationId: string) => void;
  setScanning: (isScanning: boolean) => void;
}