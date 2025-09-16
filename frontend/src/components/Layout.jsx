import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { FiSun, FiMoon } from 'react-icons/fi'; // Import icons

function Layout() {
  const { theme, toggleTheme } = useTheme();
  const linkClasses = "block px-4 py-2 rounded hover:bg-gray-700 dark:hover:bg-gray-600";
  
  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white flex flex-col">
        <div className="p-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Dashboard</h2>
            {/* Improved Theme Toggle Button */}
            <button 
              onClick={toggleTheme} 
              className="p-2 rounded-full text-gray-300 hover:bg-gray-700 transition-colors duration-200"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <FiMoon size={20} /> : <FiSun size={20} />}
            </button>
          </div>
          <nav>
            <NavLink to="/dashboard" end className={linkClasses}>All Transactions</NavLink>
            <NavLink to="/dashboard/school" className={linkClasses}>By School</NavLink>
            <NavLink to="/dashboard/status" className={linkClasses}>Check Status</NavLink>
          </nav>
        </div>
        
        {/* The Outlet for main content */}
        <div className="mt-auto p-4">
          {/* You can add a logout button or user info here later */}
        </div>
      </div>

      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet /> 
      </main>
    </div>
  );
}

export default Layout;