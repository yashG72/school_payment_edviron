# Full-Stack School Payment Dashboard

This is a complete full-stack application built for a software developer assessment. It features a real-time dashboard built with React and a robust REST API powered by Node.js and Express.

---

## 🚀 Live Demos

* **Frontend Application (Vercel)**: (https://school-payment-edviron.vercel.app/)
* **Backend API (Render)**: (https://school-payment-edviron.onrender.com/)

---

## ✨ Core Features

* **Full-Stack Architecture**: Decoupled frontend and backend services.
* **Secure Authentication**: JWT-based sign-up and login flow.
* **Real-time Visualization**: A live bar chart that updates instantly via WebSockets when new data arrives.
* **Interactive Dashboard**: A dynamic data table with pagination, column sorting, and status filtering.
* **Toggleable Dark Mode**: A sleek, user-toggleable dark theme that persists across sessions using `localStorage`.
* **Comprehensive API**: Endpoints for managing transactions, checking status, and handling third-party webhooks.
* **Cloud Deployment**: Backend and frontend are independently deployed on Render and Vercel.

---

## 📸 Screenshots

**Dashboard (Light Mode)**
<img width="1919" height="939" alt="Image" src="https://github.com/user-attachments/assets/b2427874-d7f2-425e-9d15-e520c16b46d3" />

**Dashboard (Dark Mode)**
<img width="1913" height="943" alt="Image" src="https://github.com/user-attachments/assets/57ad8366-9519-4dfa-b327-d12cc788cbe5" />

---

## 🛠️ Tech Stack

| Category      | Technology                                    |
|---------------|-----------------------------------------------|
| **Frontend** | React, Vite, Tailwind CSS, Axios, Recharts    |
| **Backend** | Node.js, Express.js, Socket.IO, JWT, Mongoose |
| **Database** | MongoDB Atlas                                 |
| **Deployment**| Vercel (Frontend), Render (Backend)           |

---

## 📂 Project Structure

This project is organized into two main directories:

```
/
├── backend/      # Contains the Node.js & Express REST API
└── frontend/     # Contains the React & Vite dashboard application
```
Each directory contains its own detailed `README.md` file with specific setup and deployment instructions.

---

## 🚀 Quick Start

To run the entire project locally, you'll need to run both the backend and frontend servers simultaneously.

### 1. Backend Setup

```bash
# Navigate to the backend directory
cd backend

# Install dependencies
npm install

# Create a .env file (see backend/README.md for details)

# Run the server
npm run dev
```
The backend API will be running on `http://localhost:8000`.

### 2. Frontend Setup

```bash
# In a new terminal, navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Create a .env file (see frontend/README.md for details)

# Run the server
npm run dev
```
The frontend application will be running on `http://localhost:5173`.