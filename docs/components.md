# Components Documentation

## Navigation Components

### BottomNavigation
- Purpose: Main navigation bar at the bottom of the app
- Features:
  - Cart status with item count
  - Dietary filter toggle
  - Order history access
  - Account settings
- Props:
  ```typescript
  interface BottomNavigationProps {
    onOrderHistoryClick: () => void;
    onCartClick?: () => void;
  }
  ```

### Header
- Purpose: Top navigation bar with restaurant info
- Features:
  - Restaurant/stall selection
  - Table selection
  - Notifications
  - Order status
- Props: 
  ```typescript
  interface HeaderProps {
    onNotificationsClick: () => void;
    onOrderStatusClick: () => void;
    onRestaurantClick: () => void;
  }
  ```

## Menu Components

### MenuCategory
- Purpose: Displays menu items by category
- Features:
  - Category filtering
  - Subcategory navigation
  - Item count display
- Props:
  ```typescript
  interface MenuCategoryProps {
    category: CategoryType;
    items: MenuItem[];
    subCategories: string[];
  }
  ```

### MenuItemCard
- Purpose: Individual menu item display
- Features:
  - Item details
  - Price display
  - Add to cart functionality
  - Special instructions
- Props:
  ```typescript
  interface MenuItemCardProps {
    item: MenuItem;
  }
  ```

### MenuItemFullView
- Purpose: Detailed view of menu items
- Features:
  - Full item details
  - Nutritional information
  - Reviews
  - Add to cart
- Props:
  ```typescript
  interface MenuItemFullViewProps {
    item: MenuItem;
    onClose: () => void;
  }
  ```

## Order Management Components

### Cart
- Purpose: Shopping cart management
- Features:
  - Item quantity adjustment
  - Special instructions
  - Total calculation
  - Order placement
- Props:
  ```typescript
  interface CartProps {
    isVisible: boolean;
    onClose: () => void;
  }
  ```

### OrderStatus
- Purpose: Order tracking and status display
- Features:
  - Real-time status updates
  - Order details
  - Cancellation option
- Props:
  ```typescript
  interface OrderStatusProps {
    isVisible: boolean;
    onClose: () => void;
  }
  ```

## Utility Components

### CallWaiter
- Purpose: Request waiter assistance
- Features:
  - Call button
  - Message sending
  - Timer display
- Props:
  ```typescript
  interface CallWaiterProps {
    tableNumber: number;
  }
  ```

### QRScanner
- Purpose: Scan table QR codes
- Features:
  - Camera access
  - QR code detection
  - Table identification
- Props: None

### PromotionalBanner
- Purpose: Display promotional content
- Features:
  - Auto-scrolling carousel
  - Promotion details
  - Discount codes
- Props: None

### Notifications
- Purpose: Display system notifications
- Features:
  - Real-time updates
  - Read/unread status
  - Different notification types
- Props:
  ```typescript
  interface NotificationsProps {
    isVisible: boolean;
    onClose: () => void;
  }
  ```

### RestaurantDetails
- Purpose: Display restaurant information
- Features:
  - Basic info
  - Operating hours
  - Location
  - Reviews
- Props:
  ```typescript
  interface RestaurantDetailsProps {
    isVisible: boolean;
    onClose: () => void;
  }
  ```