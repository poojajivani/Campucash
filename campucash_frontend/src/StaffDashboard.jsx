import React from "react";

function StaffDashboard() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Staff Dashboard 👨‍💻</h1>

      <div className="grid grid-cols-2 gap-4">
        <div className="card p-4 bg-blue-100">My Requests</div>
        <div className="card p-4 bg-green-100">My Expenses</div>
      </div>

      <div className="flex gap-4">
        <button className="bg-indigo-600 text-white px-4 py-2 rounded">View Activity</button>
      </div>
    </div>
  );
}

export default StaffDashboard;