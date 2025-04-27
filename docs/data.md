# Data Documentation

## Core Data Types

### Restaurant Data
```typescript
interface Restaurant {
  id: string;
  name: string;
  logo: string;
  venueType: 'restaurant' | 'foodCourt';
  tables: Table[];
  menu: MenuItem[];
  stalls?: Stall[];
  currentStallId?: string;
  description?: string;
  location?: Location;
  hours?: Hours;
}
```

### Menu Data
```typescript
interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: CategoryType;
  subCategory: string;
  image: string;
  available: boolean;
  preparationTime: number;
  featured?: boolean;
  tags?: string[];
  rating?: number;
  ratingCount?: number;
  reviews?: Review[];
  ingredients?: string[];
  nutritionInfo?: NutritionInfo;
}
```

### Order Data
```typescript
interface Order {
  id: string;
  tableId: string;
  items: CartItem[];
  status: OrderStatus;
  totalAmount: number;
  createdAt: Date;
  updatedAt: Date;
  estimatedDeliveryTime?: Date;
}
```

## Mock Data Sets

### Categories
- Predefined menu categories:
  - Veg
  - NonVeg
  - Drink
- Category-specific styling and icons

### Mock Restaurant Data
- Sample restaurant information
- Menu items
- Tables
- Operating hours
- Location details

### Mock Reviews
- Sample user reviews
- Ratings
- Review dates
- User information

### Mock Stalls (Food Court)
- Stall information
- Cuisine types
- Individual menus
- Stall-specific details

## State Management

### Global Store (Zustand)
```typescript
interface AppState {
  currentRestaurant: Restaurant | null;
  currentTable: Table | null;
  cart: CartItem[];
  orders: Order[];
  currentOrder: Order | null;
  notifications: Notification[];
  isScanning: boolean;
  dietaryFilter: DietaryFilter;
  selectedMenuItem: MenuItem | null;
  isLoggedIn: boolean;
}
```

### Actions
- Restaurant management
- Cart operations
- Order management
- Notification handling
- Table management
- Authentication state

## Data Flow

### User Interactions
1. QR Code Scanning
2. Restaurant Selection
3. Menu Browsing
4. Cart Management
5. Order Placement
6. Payment Processing

### State Updates
1. Restaurant/Table Selection
2. Cart Modifications
3. Order Status Changes
4. Notification Handling
5. User Preferences

### Data Persistence
- Local Storage
- Session Management
- Cart State
- User Preferences