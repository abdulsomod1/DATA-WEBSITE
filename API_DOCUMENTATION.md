# API Documentation - DEV-VAULT DATA

## Overview

This document outlines the API endpoints and database schema for DEV-VAULT DATA backend.

## Base URL

```
Local Development: http://localhost:3000/api
Production: https://your-domain.com/api
```

## Authentication

All requests require valid Supabase JWT token in Authorization header:

```
Authorization: Bearer {supabase_jwt_token}
```

## Database Schema

### Users Table
```sql
- id (UUID, Primary Key)
- email (Text, Unique)
- username (Text, Unique)
- phone (Text, Optional)
- wallet_balance (Decimal)
- is_admin (Boolean)
- avatar_url (Text, Optional)
- created_at (Timestamp)
- updated_at (Timestamp)
```

### Orders Table
```sql
- id (UUID, Primary Key)
- user_id (UUID, Foreign Key)
- network (Text: MTN, AIRTEL, GLO)
- plan_id (Text)
- phone_number (Text)
- price (Decimal)
- status (Text: pending, completed, cancelled)
- created_at (Timestamp)
- updated_at (Timestamp)
```

### Transactions Table
```sql
- id (UUID, Primary Key)
- order_id (UUID, Foreign Key)
- user_id (UUID, Foreign Key)
- amount (Decimal)
- payment_method (Text)
- whatsapp_number (Text, Optional)
- status (Text: pending, completed, failed)
- created_at (Timestamp)
- updated_at (Timestamp)
```

### Data Plans Table
```sql
- id (UUID, Primary Key)
- name (Text)
- duration (Text)
- price (Decimal)
- data_size (Integer)
- network (Text)
- is_active (Boolean)
- created_at (Timestamp)
- updated_at (Timestamp)
```

### Admin Logs Table
```sql
- id (UUID, Primary Key)
- admin_id (UUID, Foreign Key)
- action (Text)
- details (JSONB)
- created_at (Timestamp)
```

## API Endpoints

### Authentication

#### Sign Up
```
POST /auth/signup
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePass@123",
  "username": "username"
}

Response:
{
  "success": true,
  "user": {
    "id": "uuid",
    "email": "user@example.com"
  }
}
```

#### Login
```
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePass@123"
}

Response:
{
  "success": true,
  "session": {
    "access_token": "jwt_token",
    "refresh_token": "refresh_token"
  }
}
```

#### Login with Username
```
POST /auth/login-username
Content-Type: application/json

{
  "username": "username",
  "password": "SecurePass@123"
}

Response:
{
  "success": true,
  "session": {
    "access_token": "jwt_token"
  }
}
```

#### Logout
```
POST /auth/logout
Authorization: Bearer {token}

Response:
{
  "success": true
}
```

### Users

#### Get Current User
```
GET /users/me
Authorization: Bearer {token}

Response:
{
  "id": "uuid",
  "email": "user@example.com",
  "username": "username",
  "wallet_balance": 5000,
  "is_admin": false,
  "created_at": "2024-01-01T00:00:00Z"
}
```

#### Get User Profile
```
GET /users/{userId}
Authorization: Bearer {token}

Response:
{
  "id": "uuid",
  "email": "user@example.com",
  "username": "username",
  "wallet_balance": 5000,
  "is_admin": false
}
```

#### Update User Profile
```
PUT /users/{userId}
Authorization: Bearer {token}
Content-Type: application/json

{
  "username": "newusername",
  "phone": "08012345678",
  "avatar_url": "https://..."
}

Response:
{
  "success": true,
  "user": { /* ... */ }
}
```

### Data Plans

#### Get All Data Plans
```
GET /data-plans
Authorization: Bearer {token}

Response:
[
  {
    "id": "uuid",
    "name": "1GB",
    "duration": "30 Days",
    "price": 600,
    "data_size": 1,
    "network": "MTN",
    "is_active": true
  },
  // ... more plans
]
```

#### Get Plans by Network
```
GET /data-plans?network=MTN
Authorization: Bearer {token}

Response:
[
  { /* MTN plans only */ }
]
```

### Orders

#### Create Order
```
POST /orders
Authorization: Bearer {token}
Content-Type: application/json

{
  "network": "MTN",
  "plan_id": "mtn-1gb-30d",
  "phone_number": "08012345678",
  "price": 600
}

Response:
{
  "success": true,
  "order": {
    "id": "uuid",
    "user_id": "uuid",
    "network": "MTN",
    "plan_id": "mtn-1gb-30d",
    "phone_number": "08012345678",
    "price": 600,
    "status": "pending",
    "created_at": "2024-01-01T00:00:00Z"
  }
}
```

#### Get User Orders
```
GET /orders
Authorization: Bearer {token}

Response:
[
  {
    "id": "uuid",
    "network": "MTN",
    "price": 600,
    "status": "pending",
    "created_at": "2024-01-01T00:00:00Z"
  },
  // ... more orders
]
```

#### Get Order Details
```
GET /orders/{orderId}
Authorization: Bearer {token}

Response:
{
  "id": "uuid",
  "user_id": "uuid",
  "network": "MTN",
  "plan_id": "mtn-1gb-30d",
  "phone_number": "08012345678",
  "price": 600,
  "status": "pending"
}
```

#### Update Order Status (Admin Only)
```
PUT /orders/{orderId}
Authorization: Bearer {admin_token}
Content-Type: application/json

{
  "status": "completed"
}

Response:
{
  "success": true,
  "order": { /* ... */ }
}
```

#### Delete Order (Admin Only)
```
DELETE /orders/{orderId}
Authorization: Bearer {admin_token}

Response:
{
  "success": true,
  "message": "Order deleted"
}
```

### Transactions

#### Create Transaction
```
POST /transactions
Authorization: Bearer {token}
Content-Type: application/json

{
  "order_id": "uuid",
  "amount": 600,
  "payment_method": "bank_transfer",
  "whatsapp_number": "08012345678"
}

Response:
{
  "success": true,
  "transaction": {
    "id": "uuid",
    "order_id": "uuid",
    "amount": 600,
    "status": "pending"
  }
}
```

#### Get User Transactions
```
GET /transactions
Authorization: Bearer {token}

Response:
[
  {
    "id": "uuid",
    "order_id": "uuid",
    "amount": 600,
    "status": "pending",
    "created_at": "2024-01-01T00:00:00Z"
  },
  // ... more transactions
]
```

#### Get Admin Transactions Report
```
GET /transactions/admin/report
Authorization: Bearer {admin_token}

Query Parameters:
- status: pending, completed, failed
- network: MTN, AIRTEL, GLO
- startDate: 2024-01-01
- endDate: 2024-01-31
- limit: 100
- offset: 0

Response:
{
  "total": 150,
  "transactions": [ /* ... */ ]
}
```

### Admin Operations

#### Get Admin Dashboard Stats
```
GET /admin/stats
Authorization: Bearer {admin_token}

Response:
{
  "total_users": 1000,
  "total_orders": 5000,
  "pending_payments": 45,
  "completed_orders": 4900,
  "total_revenue": 2500000,
  "last_7_days": [
    { "date": "2024-01-01", "orders": 50, "revenue": 30000 }
  ]
}
```

#### Get All Users (Admin Only)
```
GET /admin/users
Authorization: Bearer {admin_token}

Query Parameters:
- search: search term
- limit: 50
- offset: 0

Response:
[
  {
    "id": "uuid",
    "email": "user@example.com",
    "username": "username",
    "created_at": "2024-01-01T00:00:00Z"
  }
]
```

#### Get All Orders (Admin Only)
```
GET /admin/orders
Authorization: Bearer {admin_token}

Query Parameters:
- status: pending, completed, cancelled
- network: MTN, AIRTEL, GLO
- limit: 100
- offset: 0

Response:
[
  {
    "id": "uuid",
    "user_id": "uuid",
    "network": "MTN",
    "phone_number": "08012345678",
    "price": 600,
    "status": "pending"
  }
]
```

#### Export Transactions (Admin Only)
```
GET /admin/transactions/export
Authorization: Bearer {admin_token}

Query Parameters:
- format: csv, json, excel
- startDate: 2024-01-01
- endDate: 2024-01-31

Response:
CSV/JSON/Excel file
```

## Error Responses

### 400 Bad Request
```json
{
  "error": "Invalid input",
  "message": "Phone number format is invalid"
}
```

### 401 Unauthorized
```json
{
  "error": "Unauthorized",
  "message": "Invalid or expired token"
}
```

### 403 Forbidden
```json
{
  "error": "Forbidden",
  "message": "Admin access required"
}
```

### 404 Not Found
```json
{
  "error": "Not found",
  "message": "Order not found"
}
```

### 500 Server Error
```json
{
  "error": "Server error",
  "message": "An unexpected error occurred"
}
```

## Rate Limiting

- 100 requests per minute per user
- 1000 requests per minute per IP (public endpoints)

## Webhooks (Future)

### Payment Webhook
```
POST /webhooks/payment
Content-Type: application/json

{
  "event": "payment.confirmed",
  "order_id": "uuid",
  "transaction_id": "uuid",
  "amount": 600,
  "timestamp": "2024-01-01T00:00:00Z"
}
```

## Code Examples

### JavaScript/TypeScript
```typescript
// Create Order
const createOrder = async (networkData) => {
  const response = await fetch('/api/orders', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(networkData)
  })
  return response.json()
}
```

### Python
```python
import requests

headers = {
    'Authorization': f'Bearer {token}',
    'Content-Type': 'application/json'
}

response = requests.post(
    'https://api.devvault.com/orders',
    headers=headers,
    json=order_data
)
```

### cURL
```bash
curl -X POST https://api.devvault.com/orders \
  -H "Authorization: Bearer {token}" \
  -H "Content-Type: application/json" \
  -d '{"network":"MTN","plan_id":"mtn-1gb-30d"}'
```

## Versioning

API Version: v1.0.0

Future versions will be available at `/api/v2/`, `/api/v3/`, etc.

## Support

For API support:
- Email: api-support@devvault.com
- Documentation: https://docs.devvault.com
- Status: https://status.devvault.com

---

**Last Updated**: May 2024
**Version**: 1.0.0
