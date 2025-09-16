
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';

import Layout from './components/Layout';
import DashboardPage from './pages/DashboardPage';
import SchoolTransactionsPage from './pages/SchoolTransactionsPage';
import StatusCheckPage from './pages/StatusCheckPage';
import LoginPage from './pages/LoginPage'; // Import the new page

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'school', element: <SchoolTransactionsPage /> },
      { path: 'status', element: <StatusCheckPage /> },
    ],
  },
  {
    path: '/login', // Add the new route
    element: <LoginPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);