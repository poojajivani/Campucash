import React from "react";

function AdminDashboard() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Admin Dashboard 👑</h1>

      <div className="grid grid-cols-3 gap-4">
        <div className="card p-4 bg-blue-100">Total Users</div>
        <div className="card p-4 bg-green-100">Total Budget</div>
        <div className="card p-4 bg-yellow-100">Reports Generated</div>
      </div>

      <div className="flex gap-4">
        <button className="bg-black text-white px-4 py-2 rounded">Manage Users</button>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded">View Reports</button>
        <button className="bg-red-500 text-white px-4 py-2 rounded">Approve Budgets</button>
      </div>
    </div>
  );
}

export default AdminDashboard;