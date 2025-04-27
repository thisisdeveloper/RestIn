# Backend Requirements

## Technology Stack

### Core
- Node.js (v18+)
- PostgreSQL (v15+)
- Redis (v7+)
- TypeScript
- Express.js

### Infrastructure
- Docker & Docker Compose
- Kubernetes (for production)
- Nginx (reverse proxy)
- Let's Encrypt (SSL)

### Services
- AWS S3 (file storage)
- AWS CloudFront (CDN)
- Stripe (payments)
- SendGrid (email)
- Firebase Cloud Messaging (push notifications)

## Database Schema

### Tables

#### users
- id: uuid PRIMARY KEY
- email: varchar(255) UNIQUE NOT NULL
- password_hash: varchar(255) NOT NULL
- name: varchar(255) NOT NULL
- role: enum('customer', 'staff', 'admin') DEFAULT 'customer'
- phone: varchar(20)
- created_at: timestamp DEFAULT now()
- updated_at: timestamp DEFAULT now()

#### restaurants
- id: uuid PRIMARY KEY
- name: varchar(255) NOT NULL
- description: text
- logo_url: varchar(255)
- venue_type: enum('restaurant', 'foodCourt') NOT NULL
- status: enum('active', 'inactive') DEFAULT 'active'
- created_at: timestamp DEFAULT now()
- updated_at: timestamp DEFAULT now()

#### restaurant_locations
- id: uuid PRIMARY KEY
- restaurant_id: uuid REFERENCES restaurants(id)
- country: varchar(100)
- state: varchar(100)
- city: varchar(100)
- address: text NOT NULL
- latitude: decimal(10,8)
- longitude: decimal(11,8)
- created_at: timestamp DEFAULT now()
- updated_at: timestamp DEFAULT now()

#### restaurant_hours
- id: uuid PRIMARY KEY
- restaurant_id: uuid REFERENCES restaurants(id)
- day: integer NOT NULL
- open_time: time NOT NULL
- close_time: time NOT NULL
- created_at: timestamp DEFAULT now()
- updated_at: timestamp DEFAULT now()

#### tables
- id: uuid PRIMARY KEY
- restaurant_id: uuid REFERENCES restaurants(id)
- number: integer NOT NULL
- seats: integer NOT NULL
- qr_code: varchar(255) UNIQUE NOT NULL
- type: enum('private', 'shared') DEFAULT 'private'
- is_available: boolean DEFAULT true
- is_locked: boolean DEFAULT false
- created_at: timestamp DEFAULT now()
- updated_at: timestamp DEFAULT now()

#### menu_items
- id: uuid PRIMARY KEY
- restaurant_id: uuid REFERENCES restaurants(id)
- stall_id: uuid REFERENCES stalls(id) NULL
- name: varchar(255) NOT NULL
- description: text
- price: decimal(10,2) NOT NULL
- category: enum('Veg', 'NonVeg', 'Drink') NOT NULL
- sub_category: varchar(100) NOT NULL
- image_url: varchar(255)
- available: boolean DEFAULT true
- preparation_time: integer NOT NULL
- featured: boolean DEFAULT false
- created_at: timestamp DEFAULT now()
- updated_at: timestamp DEFAULT now()

#### menu_item_details
- id: uuid PRIMARY KEY
- menu_item_id: uuid REFERENCES menu_items(id)
- ingredients: text[] NULL
- calories: integer NULL
- protein: decimal(5,2) NULL
- carbs: decimal(5,2) NULL
- fat: decimal(5,2) NULL
- created_at: timestamp DEFAULT now()
- updated_at: timestamp DEFAULT now()

#### menu_item_tags
- id: uuid PRIMARY KEY
- menu_item_id: uuid REFERENCES menu_items(id)
- tag: varchar(100) NOT NULL
- created_at: timestamp DEFAULT now()

#### stalls
- id: uuid PRIMARY KEY
- restaurant_id: uuid REFERENCES restaurants(id)
- name: varchar(255) NOT NULL
- description: text
- logo_url: varchar(255)
- cuisine: varchar(100) NOT NULL
- status: enum('active', 'inactive') DEFAULT 'active'
- created_at: timestamp DEFAULT now()
- updated_at: timestamp DEFAULT now()

#### orders
- id: uuid PRIMARY KEY
- user_id: uuid REFERENCES users(id)
- restaurant_id: uuid REFERENCES restaurants(id)
- table_id: uuid REFERENCES tables(id)
- status: enum('pending', 'confirmed', 'preparing', 'ready', 'delivered', 'cancelled')
- total_amount: decimal(10,2) NOT NULL
- estimated_delivery_time: timestamp NULL
- created_at: timestamp DEFAULT now()
- updated_at: timestamp DEFAULT now()

#### order_items
- id: uuid PRIMARY KEY
- order_id: uuid REFERENCES orders(id)
- menu_item_id: uuid REFERENCES menu_items(id)
- stall_id: uuid REFERENCES stalls(id) NULL
- quantity: integer NOT NULL
- price: decimal(10,2) NOT NULL
- special_instructions: text NULL
- created_at: timestamp DEFAULT now()

#### reviews
- id: uuid PRIMARY KEY
- user_id: uuid REFERENCES users(id)
- menu_item_id: uuid REFERENCES menu_items(id)
- rating: integer NOT NULL CHECK (rating >= 1 AND rating <= 5)
- comment: text NULL
- created_at: timestamp DEFAULT now()
- updated_at: timestamp DEFAULT now()

#### wallets
- id: uuid PRIMARY KEY
- user_id: uuid REFERENCES users(id) UNIQUE
- balance: decimal(10,2) DEFAULT 0
- currency: varchar(3) DEFAULT 'USD'
- created_at: timestamp DEFAULT now()
- updated_at: timestamp DEFAULT now()

#### wallet_transactions
- id: uuid PRIMARY KEY
- wallet_id: uuid REFERENCES wallets(id)
- type: enum('credit', 'debit') NOT NULL
- amount: decimal(10,2) NOT NULL
- description: text NOT NULL
- reference_id: uuid NULL
- created_at: timestamp DEFAULT now()

#### payment_methods
- id: uuid PRIMARY KEY
- user_id: uuid REFERENCES users(id)
- type: enum('card') NOT NULL
- provider: varchar(50) NOT NULL
- token: varchar(255) NOT NULL
- last4: varchar(4) NOT NULL
- expiry_month: varchar(2) NOT NULL
- expiry_year: varchar(2) NOT NULL
- is_default: boolean DEFAULT false
- created_at: timestamp DEFAULT now()
- updated_at: timestamp DEFAULT now()

#### rewards
- id: uuid PRIMARY KEY
- title: varchar(255) NOT NULL
- description: text NOT NULL
- points_required: integer NOT NULL
- image_url: varchar(255)
- expiry_date: timestamp NULL
- created_at: timestamp DEFAULT now()
- updated_at: timestamp DEFAULT now()

#### user_rewards
- id: uuid PRIMARY KEY
- user_id: uuid REFERENCES users(id)
- reward_id: uuid REFERENCES rewards(id)
- claimed_at: timestamp DEFAULT now()
- expired_at: timestamp NULL
- status: enum('active', 'used', 'expired') DEFAULT 'active'

#### notifications
- id: uuid PRIMARY KEY
- user_id: uuid REFERENCES users(id)
- type: enum('info', 'success', 'warning', 'error') NOT NULL
- message: text NOT NULL
- read: boolean DEFAULT false
- created_at: timestamp DEFAULT now()

## Security Requirements

1. Authentication
   - JWT-based authentication
   - Token refresh mechanism
   - Password hashing using bcrypt
   - Rate limiting for login attempts

2. Authorization
   - Role-based access control (RBAC)
   - Row-level security in PostgreSQL
   - API endpoint permission checks

3. Data Protection
   - Input validation and sanitization
   - SQL injection prevention
   - XSS protection
   - CSRF protection
   - Data encryption at rest
   - Secure session handling

4. API Security
   - HTTPS only
   - API key authentication for external services
   - Request rate limiting
   - Request size limiting
   - CORS configuration

## Caching Strategy

1. Redis Caching
   - Menu items
   - Restaurant details
   - User profiles
   - Order status
   - Session data

2. Cache Invalidation
   - Time-based expiration
   - Event-based invalidation
   - Cache versioning

## Background Jobs

1. Order Processing
   - Order status updates
   - Delivery time calculations
   - Order cancellation handling

2. Notifications
   - Push notifications
   - Email notifications
   - SMS notifications

3. Maintenance
   - Data cleanup
   - Analytics aggregation
   - Backup management

## Monitoring Requirements

1. Application Monitoring
   - Error tracking
   - Performance metrics
   - API endpoint metrics
   - Database query performance

2. Infrastructure Monitoring
   - Server health
   - Database health
   - Cache performance
   - Network metrics

3. Business Metrics
   - Order statistics
   - User engagement
   - Revenue tracking
   - Restaurant performance

## Deployment Requirements

1. Environments
   - Development
   - Staging
   - Production

2. CI/CD Pipeline
   - Automated testing
   - Code quality checks
   - Security scanning
   - Automated deployment

3. Backup Strategy
   - Database backups
   - File storage backups
   - Configuration backups

4. Scaling Strategy
   - Horizontal scaling
   - Load balancing
   - Database replication
   - CDN integration