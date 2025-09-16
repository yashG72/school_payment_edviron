// In src/components/TransactionChart.jsx
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function TransactionChart({ data }) {
  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">Transaction Summary</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="amount" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default TransactionChart;