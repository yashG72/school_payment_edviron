import React, { useEffect, useState } from 'react';
import { fetchTransactions } from '../services/api';

function DashboardPage() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Filtering and Sorting State
  const [statusFilter, setStatusFilter] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'payment_time', direction: 'desc' });

  useEffect(() => {
    const loadTransactions = async () => {
      setLoading(true);
      setError('');
      try {
        const params = {
          page: currentPage,
          limit: 10,
          status: statusFilter,
          sortBy: sortConfig.key,
          order: sortConfig.direction
        };
        const data = await fetchTransactions(params);
        setTransactions(data.transactions);
        setTotalPages(data.totalPages);
      } catch (err) {
        setError('Failed to fetch transactions. You may need to log in again.');
      } finally {
        setLoading(false);
      }
    };

    loadTransactions();
  }, [currentPage, statusFilter, sortConfig]);

  const handleFilterChange = (e) => {
    setStatusFilter(e.target.value);
    setCurrentPage(1); // Reset to first page on filter change
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };
  
  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const SortableHeader = ({ label, sortKey }) => (
    <th className="px-5 py-3 border-b-2 border-gray-200 text-left cursor-pointer" onClick={() => handleSort(sortKey)}>
      {label}
      {sortConfig.key === sortKey && (
        <span>{sortConfig.direction === 'asc' ? ' ▲' : ' ▼'}</span>
      )}
    </th>
  );
  
  if (loading) return <div className="text-center mt-8">Loading transactions...</div>;
  if (error) return <div className="text-center mt-8 text-red-500">{error}</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">All Transactions</h1>
      
      {/* Filter Controls */}
      <div className="mb-4">
        <label htmlFor="status" className="mr-2">Filter by Status:</label>
        <select
          id="status"
          value={statusFilter}
          onChange={handleFilterChange}
          className="p-2 border rounded"
        >
          <option value="">All</option>
          <option value="success">Success</option>
          <option value="pending">Pending</option>
          <option value="failed">Failed</option>
        </select>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full leading-normal">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm">
              <SortableHeader label="Order ID" sortKey="custom_order_id" />
              <SortableHeader label="School ID" sortKey="school_id" />
              <SortableHeader label="Gateway" sortKey="gateway" />
              <SortableHeader label="Amount" sortKey="transaction_amount" />
              <SortableHeader label="Status" sortKey="status" />
              <SortableHeader label="Date" sortKey="payment_time" />
            </tr>
          </thead>
          <tbody>
            {transactions.length > 0 ? (
              transactions.map((tx) => (
                <tr key={tx.custom_order_id} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="px-5 py-4 text-sm">{tx.custom_order_id}</td>
                  <td className="px-5 py-4 text-sm">{tx.school_id}</td>
                  <td className="px-5 py-4 text-sm capitalize">{tx.gateway}</td>
                  <td className="px-5 py-4 text-sm">₹{tx.transaction_amount}</td>
                  <td className="px-5 py-4 text-sm">
                    <span className={`px-2 py-1 font-semibold leading-tight rounded-full ${
                      tx.status === 'success' ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'
                    }`}>
                      {tx.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-sm">{new Date(tx.payment_time).toLocaleDateString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-10">No transactions found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default DashboardPage;