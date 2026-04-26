import React from "react";

function DeptDashboard() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Department Head Dashboard 🏢</h1>

      <div className="grid grid-cols-3 gap-4">
        <div className="card p-4 bg-blue-100">Allocated Budget</div>
        <div className="card p-4 bg-green-100">Used Budget</div>
        <div className="card p-4 bg-yellow-100">Remaining Budget</div>
      </div>

      <div className="flex gap-4">
        <button className="bg-indigo-600 text-white px-4 py-2 rounded">Request Budget</button>
        <button className="bg-green-600 text-white px-4 py-2 rounded">View Expenses</button>
      </div>
    </div>
  );
}

export default DeptDashboard;