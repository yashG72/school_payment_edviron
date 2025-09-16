
import React, { useEffect, useState } from 'react';
import { fetchTransactions } from '../services/api';

function DashboardPage() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const loadTransactions = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await fetchTransactions({ page: currentPage, limit: 10 });
        setTransactions(data.transactions);
        setTotalPages(data.totalPages);
      } catch (err) {
        setError('Failed to fetch transactions. You may need to log in again.');
      } finally {
        setLoading(false);
      }
    };

    loadTransactions();
  }, [currentPage]);

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  if (loading) {
    return <div className="text-center mt-8">Loading transactions...</div>;
  }

  if (error) {
    return <div className="text-center mt-8 text-red-500">{error}</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">All Transactions</h1>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full leading-normal">
          {/* thead remains the same */}
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm">
              <th className="px-5 py-3 border-b-2 border-gray-200 text-left">Order ID</th>
              <th className="px-5 py-3 border-b-2 border-gray-200 text-left">School ID</th>
              <th className="px-5 py-3 border-b-2 border-gray-200 text-left">Gateway</th>
              <th className="px-5 py-3 border-b-2 border-gray-200 text-left">Amount</th>
              <th className="px-5 py-3 border-b-2 border-gray-200 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
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
              </tr>
            ))}
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