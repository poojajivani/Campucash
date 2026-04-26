import React from "react";

function FinanceDashboard() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Finance Officer Dashboard 📊</h1>

      <div className="grid grid-cols-3 gap-4">
        <div className="card p-4 bg-blue-100">Total Budget</div>
        <div className="card p-4 bg-green-100">Approved Budgets</div>
        <div className="card p-4 bg-red-100">Pending Requests</div>
      </div>

      <div className="flex gap-4">
        <button className="bg-green-600 text-white px-4 py-2 rounded">Approve Budget</button>
        <button className="bg-red-500 text-white px-4 py-2 rounded">Reject Budget</button>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded">View Reports</button>
      </div>
    </div>
  );
}

export default FinanceDashboard;