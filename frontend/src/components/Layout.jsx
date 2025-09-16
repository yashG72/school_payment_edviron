import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

function Layout() {
  const linkClasses = "block px-4 py-2 text-gray-200 rounded hover:bg-gray-700";
  
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
        <nav>
          <NavLink to="/" className={linkClasses}>All Transactions</NavLink>
          <NavLink to="/school" className={linkClasses}>By School</NavLink>
          <NavLink to="/status" className={linkClasses}>Check Status</NavLink>
        </nav>
      </div>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet /> 
      </main>
    </div>
  );
}

export default Layout;