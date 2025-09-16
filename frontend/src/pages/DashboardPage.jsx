import React, { useEffect, useState } from 'react';
import { fetchTransactions } from '../services/api';
import io from 'socket.io-client';
import TransactionChart from '../components/TransactionChart';

// Helper function to process transaction data for the chart
const processDataForChart = (transactions = []) => {
  const summary = transactions.reduce((acc, tx) => {
    const status = tx.status || 'unknown';
    // Ensure transaction_amount is a number
    const amount = Number(tx.transaction_amount) || 0;
    acc[status] = (acc[status] || 0) + amount;
    return acc;
  }, {});

  return Object.keys(summary).map(key => ({
    name: key.charAt(0).toUpperCase() + key.slice(1), // Capitalize status name
    amount: summary[key],
  }));
};

function DashboardPage() {
  const [transactions, setTransactions] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'payment_time', direction: 'desc' });

  // Effect for initial data fetching and updates from controls
  useEffect(() => {
    const loadTransactions = async () => {
      setLoading(true);
      try {
        const params = { page: currentPage, limit: 10, status: statusFilter, sortBy: sortConfig.key, order: sortConfig.direction };
        const data = await fetchTransactions(params);
        setTransactions(data.transactions);
        setChartData(processDataForChart(data.transactions));
        setTotalPages(data.totalPages);
      } catch (err) {
        setError('Failed to fetch transactions. You may need to log in again.');
      } finally {
        setLoading(false);
      }
    };
    loadTransactions();
  }, [currentPage, statusFilter, sortConfig]);

  // Effect for handling real-time WebSocket updates
  useEffect(() => {
    const socket = io(import.meta.env.VITE_API_BASE_URL);

    socket.on('transaction_update', (updatedTx) => {
      // Simple refetch to ensure data consistency across table, chart, and pagination
      const refetchData = async () => {
        try {
          const params = { page: currentPage, limit: 10, status: statusFilter, sortBy: sortConfig.key, order: sortConfig.direction };
          const data = await fetchTransactions(params);
          setTransactions(data.transactions);
          setChartData(processDataForChart(data.transactions));
          setTotalPages(data.totalPages);
        } catch (err) {
          console.error("Failed to refetch data on socket update", err);
        }
      };
      refetchData();
    });

    return () => {
      socket.disconnect();
    };
  }, [currentPage, statusFilter, sortConfig]); // Dependencies ensure refetch has latest params

  const handleFilterChange = (e) => {
    setStatusFilter(e.target.value);
    setCurrentPage(1);
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const handlePreviousPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  const SortableHeader = ({ label, sortKey }) => (
    <th className="px-5 py-3 border-b-2 border-gray-200 dark:border-gray-700 text-left cursor-pointer" onClick={() => handleSort(sortKey)}>
      {label}
      {sortConfig.key === sortKey && <span>{sortConfig.direction === 'asc' ? ' ▲' : ' ▼'}</span>}
    </th>
  );
  
  if (loading) return <div className="text-center mt-8">Loading transactions...</div>;
  if (error) return <div className="text-center mt-8 text-red-500">{error}</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">Dashboard</h1>
      
      <TransactionChart data={chartData} />

      <div className="mb-4">
        <label htmlFor="status" className="mr-2 text-gray-700 dark:text-gray-300">Filter by Status:</label>
        <select id="status" value={statusFilter} onChange={handleFilterChange} className="p-2 border rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200">
          <option value="">All</option>
          <option value="success">Success</option>
          <option value="pending">Pending</option>
          <option value="failed">Failed</option>
        </select>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full leading-normal">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 uppercase text-sm">
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
                <tr key={tx.custom_order_id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700">
                  <td className="px-5 py-4 text-sm">{tx.custom_order_id}</td>
                  <td className="px-5 py-4 text-sm">{tx.school_id}</td>
                  <td className="px-5 py-4 text-sm capitalize">{tx.gateway || 'N/A'}</td>
                  <td className="px-5 py-4 text-sm">₹{tx.transaction_amount}</td>
                  <td className="px-5 py-4 text-sm">
                    <span className={`px-2 py-1 font-semibold leading-tight rounded-full ${tx.status === 'success' ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'}`}>{tx.status}</span>
                  </td>
                  <td className="px-5 py-4 text-sm">{new Date(tx.payment_time).toLocaleDateString()}</td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="6" className="text-center py-10">No transactions found.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4">
        <button onClick={handlePreviousPage} disabled={currentPage === 1} className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded disabled:opacity-50">Previous</button>
        <span className="text-gray-700 dark:text-gray-300">Page {currentPage} of {totalPages}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages} className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded disabled:opacity-50">Next</button>
      </div>
    </div>
  );
}

export default DashboardPage;