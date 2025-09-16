// In src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';

import Layout from './components/Layout';
import DashboardPage from './pages/DashboardPage';
import SchoolTransactionsPage from './pages/SchoolTransactionsPage';
import StatusCheckPage from './pages/StatusCheckPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <SignUpPage />, // Sign Up is now the root page
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/dashboard', // All dashboard pages are now here
    element: <Layout />,
    children: [
      {
        index: true, // The default dashboard page
        element: <DashboardPage />,
      },
      {
        path: 'school',
        element: <SchoolTransactionsPage />,
      },
      {
        path: 'status',
        element: <StatusCheckPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);