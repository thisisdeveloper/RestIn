# API Documentation for Smart Restaurant Menu

## Base URL
```
https://api.smartmenu.com/v1
```

## Authentication
All API endpoints require authentication using Bearer token in the Authorization header:

```
Authorization: Bearer <token>
```

## Endpoints

### Authentication

#### POST /auth/login
Login with email and password.

Request:
```json
{
  "email": "string",
  "password": "string"
}
```

Response:
```json
{
  "token": "string",
  "user": {
    "id": "string",
    "email": "string",
    "name": "string",
    "role": "customer | staff | admin"
  }
}
```

#### POST /auth/register
Register a new user.

Request:
```json
{
  "email": "string",
  "password": "string",
  "name": "string"
}
```

Response:
```json
{
  "token": "string",
  "user": {
    "id": "string",
    "email": "string",
    "name": "string",
    "role": "customer"
  }
}
```

### Restaurants

#### GET /restaurants
Get list of restaurants.

Query Parameters:
- `search`: string (optional)
- `country`: string (optional)
- `state`: string (optional)
- `city`: string (optional)
- `page`: number (optional)
- `limit`: number (optional)

Response:
```json
{
  "data": [
    {
      "id": "string",
      "name": "string",
      "description": "string",
      "logo": "string",
      "venueType": "restaurant | foodCourt",
      "location": {
        "country": "string",
        "state": "string",
        "city": "string",
        "address": "string",
        "coordinates": {
          "lat": number,
          "lng": number
        }
      },
      "hours": {
        "open": "string",
        "close": "string"
      }
    }
  ],
  "meta": {
    "total": number,
    "page": number,
    "limit": number
  }
}
```

#### GET /restaurants/:id
Get restaurant details.

Response:
```json
{
  "id": "string",
  "name": "string",
  "description": "string",
  "logo": "string",
  "venueType": "restaurant | foodCourt",
  "tables": [
    {
      "id": "string",
      "number": number,
      "seats": number,
      "qrCode": "string",
      "type": "private | shared",
      "isAvailable": boolean,
      "isLocked": boolean
    }
  ],
  "menu": [
    {
      "id": "string",
      "name": "string",
      "description": "string",
      "price": number,
      "category": "Veg | NonVeg | Drink",
      "subCategory": "string",
      "image": "string",
      "available": boolean,
      "preparationTime": number,
      "featured": boolean,
      "tags": ["string"],
      "rating": number,
      "ratingCount": number,
      "ingredients": ["string"],
      "nutritionInfo": {
        "calories": number,
        "protein": number,
        "carbs": number,
        "fat": number
      }
    }
  ],
  "stalls": [
    {
      "id": "string",
      "name": "string",
      "description": "string",
      "logo": "string",
      "cuisine": "string",
      "menu": [MenuItemObject]
    }
  ],
  "location": LocationObject,
  "hours": {
    "open": "string",
    "close": "string"
  }
}
```

### Orders

#### POST /orders
Place a new order.

Request:
```json
{
  "restaurantId": "string",
  "tableId": "string",
  "items": [
    {
      "id": "string",
      "quantity": number,
      "specialInstructions": "string",
      "stallId": "string"
    }
  ]
}
```

Response:
```json
{
  "id": "string",
  "status": "pending",
  "items": [OrderItemObject],
  "totalAmount": number,
  "createdAt": "string",
  "updatedAt": "string",
  "estimatedDeliveryTime": "string"
}
```

#### GET /orders
Get user's orders.

Query Parameters:
- `status`: string (optional)
- `page`: number (optional)
- `limit`: number (optional)

Response:
```json
{
  "data": [OrderObject],
  "meta": {
    "total": number,
    "page": number,
    "limit": number
  }
}
```

#### PUT /orders/:id/cancel
Cancel an order.

Response:
```json
{
  "success": boolean,
  "message": "string"
}
```

### Wallet

#### GET /wallet/balance
Get wallet balance.

Response:
```json
{
  "balance": number,
  "currency": "string"
}
```

#### POST /wallet/add
Add money to wallet.

Request:
```json
{
  "amount": number,
  "paymentMethodId": "string"
}
```

Response:
```json
{
  "success": boolean,
  "balance": number,
  "transaction": {
    "id": "string",
    "type": "credit",
    "amount": number,
    "description": "string",
    "createdAt": "string"
  }
}
```

#### GET /wallet/transactions
Get wallet transactions.

Query Parameters:
- `type`: string (optional)
- `page`: number (optional)
- `limit`: number (optional)

Response:
```json
{
  "data": [
    {
      "id": "string",
      "type": "credit | debit",
      "amount": number,
      "description": "string",
      "createdAt": "string"
    }
  ],
  "meta": {
    "total": number,
    "page": number,
    "limit": number
  }
}
```

### Rewards

#### GET /rewards
Get available rewards.

Response:
```json
{
  "points": number,
  "membershipLevel": "string",
  "rewards": [
    {
      "id": "string",
      "title": "string",
      "description": "string",
      "points": number,
      "image": "string",
      "expiryDate": "string",
      "claimed": boolean
    }
  ]
}
```

#### POST /rewards/:id/redeem
Redeem a reward.

Response:
```json
{
  "success": boolean,
  "message": "string",
  "remainingPoints": number
}
```

## WebSocket Events

### Connection
Connect to WebSocket server:
```
wss://api.smartmenu.com/ws?token=<auth_token>
```

### Events

#### order_status_updated
```json
{
  "type": "order_status_updated",
  "data": {
    "orderId": "string",
    "status": "pending | confirmed | preparing | ready | delivered | cancelled",
    "updatedAt": "string"
  }
}
```

#### notification_received
```json
{
  "type": "notification_received",
  "data": {
    "id": "string",
    "message": "string",
    "type": "info | success | warning | error",
    "createdAt": "string"
  }
}
```

## Error Responses

All endpoints return error responses in the following format:

```json
{
  "error": {
    "code": "string",
    "message": "string",
    "details": {} // optional
  }
}
```

Common error codes:
- `unauthorized`: Authentication required or token invalid
- `forbidden`: Permission denied
- `not_found`: Resource not found
- `validation_error`: Invalid request data
- `insufficient_funds`: Wallet balance too low
- `insufficient_points`: Not enough reward points