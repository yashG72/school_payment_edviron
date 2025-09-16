# School Payment and Dashboard - Backend API

[![Live API](https://img.shields.io/badge/API-Live-brightgreen)](https://school-payment-edviron.onrender.com)

This is the backend microservice for the School Payment and Dashboard Application. It is a RESTful API built with Node.js, Express, and MongoDB, providing endpoints for user authentication, payment processing, and transaction management.

---

## ✨ Features

-   **User Authentication**: Secure user registration and login using JSON Web Tokens (JWT).
-   **Payment Gateway Integration**: Creates payment links by integrating with the Edviron payment API.
-   **Webhook Handling**: Listens for incoming webhooks to update transaction statuses automatically.
-   **Transaction Management**: Provides endpoints to fetch all transactions, transactions by school, and the status of a specific transaction.
-   **Data Validation & Error Handling**: Ensures data integrity and provides clear error responses.
-   **Best Practices**: Implements pagination, sorting, and database indexing for performance.

---

## 🛠️ Tech Stack

-   **Backend**: Node.js, Express.js
-   **Database**: MongoDB (with Mongoose)
-   **Authentication**: JSON Web Tokens (JWT), bcryptjs
-   **API Client**: Axios

---

## 🚀 Setup and Installation

To get the project running locally, follow these steps:

**1. Clone the repository:**
```bash
git clone https://github.com/yashG72/school_payment_edviron-link
cd backend
```

**2. Install dependencies:**
```bash
npm install
```

**3. Create a `.env` file:**
Create a `.env` file in the root of the `backend` directory and add the following environment variables.

```env
PORT=8000
MONGO_URI=YOUR_MONGODB_ATLAS_CONNECTION_STRING_HERE
JWT_SECRET="YOUR_SUPER_SECRET_KEY"

# PAYMENT API CREDENTIALS
PAYMENT_API_URL="[https://dev-vanilla.edviron.com/erp/create-collect-request](https://dev-vanilla.edviron.com/erp/create-collect-request)"
PAYMENT_API_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0cnVzdGVlSWQiOiI2NWIwZTU1MmRkMzE5NTBhOWI0MWM1YmEiLCJJbmRleE9mQXBpS2V5Ijo2fQ.IJWTYCOurGCFdRM2xyKtw6TEcuwXxGnmINrXFfsAdt0"
PG_SECRET_KEY="edvtest01"
SCHOOL_ID="65b0e6293e9f76a9694d84b4"
```

**4. Run the development server:**
```bash
npm run dev
```
The server will start on `http://localhost:8000`.

---

## ⚙️ API Endpoints

### Auth
-   **`POST /api/auth/register`**: Register a new user.
    -   **Body**: `{ "email": "user@example.com", "password": "password123" }`
-   **`POST /api/auth/login`**: Login an existing user and receive a JWT.
    -   **Body**: `{ "email": "user@example.com", "password": "password123" }`

### Payments
-   **`POST /api/payments/create-payment`** `(Protected)`: Create a new payment request.
    -   **Headers**: `Authorization: Bearer <YOUR_JWT>`
    -   **Body**:
        ```json
        {
            "amount": 2500,
            "student_info": {
                "name": "Jane Doe",
                "id": "STU54321",
                "email": "jane.doe@example.com"
            }
        }
        ```

### Webhooks
-   **`POST /api/webhooks`**: Endpoint for receiving payment status updates from the gateway.

### Transactions
-   **`GET /api/transactions`** `(Protected)`: Get all transactions with pagination and sorting.
    -   **Headers**: `Authorization: Bearer <YOUR_JWT>`
    -   **Query Params**: `?page=1&limit=10&sortBy=payment_time&order=desc`
-   **`GET /api/transactions/school/:schoolId`** `(Protected)`: Get all transactions for a specific school.
    -   **Headers**: `Authorization: Bearer <YOUR_JWT>`
-   **`GET /api/transactions/status/:custom_order_id`** `(Protected)`: Get the status of a single transaction.
    -   **Headers**: `Authorization: Bearer <YOUR_JWT>`