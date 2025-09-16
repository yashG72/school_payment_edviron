import React, { useState } from 'react';
import { fetchTransactionStatus } from '../services/api';

function StatusCheckPage() {
  const [orderId, setOrderId] = useState('');
  const [transaction, setTransaction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searched, setSearched] = useState(false);

  const handleSearch = async () => {
    if (!orderId) {
      setError('Please enter an Order ID.');
      return;
    }
    setLoading(true);
    setError('');
    setTransaction(null);
    setSearched(true);
    try {
      const data = await fetchTransactionStatus(orderId);
      setTransaction(data);
    } catch (err) {
      setError('Transaction not found. Please check the Order ID.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">Check Transaction Status</h1>
      <div className="flex items-center gap-4 mb-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <input type="text" value={orderId} onChange={(e) => setOrderId(e.target.value)} placeholder="Enter Custom Order ID" className="flex-grow p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"/>
        <button onClick={handleSearch} disabled={loading} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-300">
          {loading ? 'Checking...' : 'Check Status'}
        </button>
      </div>

      {loading && <p>Loading status...</p>}
      {error && <p className="text-red-500">{error}</p>}
      
      {searched && transaction && (
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Transaction Details</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-bold">Status:</p>
              <span className={`px-2 py-1 text-lg font-semibold leading-tight rounded-full ${transaction.status === 'success' ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'}`}>{transaction.status}</span>
            </div>
            <div><p className="font-bold">Amount:</p><p>₹{transaction.transaction_amount}</p></div>
            <div><p className="font-bold">Payment Mode:</p><p className="capitalize">{transaction.payment_mode}</p></div>
            <div><p className="font-bold">Date:</p><p>{new Date(transaction.payment_time).toLocaleString()}</p></div>
            <div><p className="font-bold">Bank Reference:</p><p>{transaction.bank_reference}</p></div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StatusCheckPage;