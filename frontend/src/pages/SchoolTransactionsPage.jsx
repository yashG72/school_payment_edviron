import React, { useState } from 'react';
import { fetchTransactionsBySchool } from '../services/api';

function SchoolTransactionsPage() {
  const defaultSchoolId = import.meta.env.VITE_SCHOOL_ID || '65b0e6293e9f76a9694d84b4';
  const [schoolId, setSchoolId] = useState(defaultSchoolId);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searched, setSearched] = useState(false);

  const handleSearch = async () => {
    if (!schoolId) {
      setError('Please enter a School ID.');
      return;
    }
    setLoading(true);
    setError('');
    setSearched(true);
    try {
      const data = await fetchTransactionsBySchool(schoolId);
      setTransactions(data);
    } catch (err) {
      setError('Failed to fetch transactions for this school.');
      setTransactions([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">Transactions by School</h1>
      <div className="flex items-center gap-4 mb-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <input type="text" value={schoolId} onChange={(e) => setSchoolId(e.target.value)} placeholder="Enter School ID" className="flex-grow p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"/>
        <button onClick={handleSearch} disabled={loading} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-300">
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      {searched && !loading && (
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full leading-normal">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 uppercase text-sm">
                <th className="px-5 py-3 border-b-2 border-gray-200 dark:border-gray-700 text-left">Order ID</th>
                <th className="px-5 py-3 border-b-2 border-gray-200 dark:border-gray-700 text-left">Amount</th>
                <th className="px-5 py-3 border-b-2 border-gray-200 dark:border-gray-700 text-left">Status</th>
                <th className="px-5 py-3 border-b-2 border-gray-200 dark:border-gray-700 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.length > 0 ? (
                transactions.map((tx) => (
                  <tr key={tx._id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <td className="px-5 py-4 text-sm">{tx.collect_id?.collect_request_id || 'N/A'}</td>
                    <td className="px-5 py-4 text-sm">₹{tx.transaction_amount}</td>
                    <td className="px-5 py-4 text-sm">
                      <span className={`px-2 py-1 font-semibold leading-tight rounded-full ${tx.status === 'success' ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'}`}>{tx.status}</span>
                    </td>
                    <td className="px-5 py-4 text-sm">{new Date(tx.payment_time).toLocaleDateString()}</td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="4" className="text-center py-10">No transactions found for this school.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default SchoolTransactionsPage;