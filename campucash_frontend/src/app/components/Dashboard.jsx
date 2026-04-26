import * as React from "react";
import axios from "axios";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from "recharts";
import { useEffect, useState } from "react";

import {
  TrendingDown,
  TrendingUp,
  DollarSign,
  Building2
} from "lucide-react";

import { ThemeToggle } from "./ThemeToggle";
import { useNavigate } from "react-router-dom";

const API = "http://localhost:8000/api/transactions";

function Dashboard() {
  const navigate = useNavigate();

  const [transactions, setTransactions] = React.useState([]);
  const [filteredTx, setFilteredTx] = React.useState([]);
  const [selectedTx, setSelectedTx] = React.useState(null);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [selectedCategory, setSelectedCategory] = React.useState(null);
  const [dashboard, setDashboard] = React.useState({});
  const itemsPerPage = 5;
  const [notifications, setNotifications] = useState([]);

  const token = localStorage.getItem("token");
  
  // 🚨 PROTECT PAGE
  React.useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);

  // ================= FETCH =================
  React.useEffect(() => {
    if (!token) return;

    axios.get(API, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        setTransactions(res.data);
        setFilteredTx(res.data);
      })
      .catch(err => {
        console.log(err);
        if (err.response?.status === 401) {
          alert("Session expired. Please login again.");
          localStorage.clear();
          navigate("/login");
        }
      });
  }, []);
React.useEffect(() => {
  fetch("http://localhost:8000/api/dashboard", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  })
    .then(res => res.json())
    .then(data => {
      console.log("DASHBOARD:", data); // debug
      setDashboard(data);
    })
    .catch(err => console.log(err));
}, []);
useEffect(() => {
   
    fetch("http://localhost:8000/api/auth/notifications", {
  headers: {
    Authorization: `Bearer ${token}`
  }
})
      .then(res => res.json())
      .then(data => setNotifications(data));
  }, []);

  // ================= LOGOUT =================
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };
 // ================= CHART DATA =================

// Monthly spending (dynamic)
const monthlyMap = {};
console.log(filteredTx);
filteredTx.forEach(tx => {
  if (!tx.created_at) return;

  const date = new Date(tx.created_at);

  if (isNaN(date.getTime())) return; // skip invalid dates

  const month = date.toLocaleString("default", { month: "short" });
  
  monthlyMap[month] = (monthlyMap[month] || 0) + Number(tx.amount || 0);
});

const monthlyData = Object.keys(monthlyMap).map(key => ({
  month: key,
  spent: monthlyMap[key]
}));
// Category breakdown (based on purpose)
const categoryMap = {};

filteredTx.forEach(tx => {
  const key = tx.purpose || "Other";

  if (!categoryMap[key]) {
    categoryMap[key] = 0;
  }

  categoryMap[key] += Number(tx.amount || 0);
  
});

const colors = ["#0F2D5E", "#10b981", "#f59e0b", "#6366f1", "#ef4444"];

const categoryData = Object.keys(categoryMap).map((key, i) => ({
  name: key,
  value: categoryMap[key],
  color: colors[i % colors.length]
}));
  // ================= DELETE =================
  const handleDelete = async (id) => {
    await axios.delete(`${API}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const updated = transactions.filter(tx => tx._id !== id);
    setTransactions(updated);
    setFilteredTx(updated);
  };

  // ================= PAGINATION =================
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentTransactions = filteredTx.slice(indexOfFirst, indexOfLast);

  // ================= CALCULATIONS =================
  const totalBudget = 1000000;

  const totalSpent = filteredTx.reduce(
    (sum, tx) => sum + Number(tx.amount || 0),
    0
  );

  const remaining = totalBudget - totalSpent;

  return (
    <div className="min-h-screen p-6 space-y-8 bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard</h1>

        <div className="flex gap-3">
          <ThemeToggle />

          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
      </div>

      {/* STATS */}
<div className="grid grid-cols-1 md:grid-cols-4 gap-4">

  {/* Total Spent */}
  <div className="group bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-4 rounded-2xl shadow-md transition-all duration-300 hover:scale-105 hover:shadow-xl">

    <div className="flex items-center gap-4">

      <div className="p-3 rounded-xl bg-gradient-to-br from-red-100 to-red-200 dark:from-red-900 dark:to-red-800 transition-transform duration-300 group-hover:rotate-6">
        <TrendingDown className="text-red-600 dark:text-red-300" />
      </div>

      <div>
        <p className="text-sm text-gray-500 dark:text-gray-400">Total Spent</p>
       <h2 className="text-xl font-bold">
  ₹{totalSpent}
</h2>
      </div>
        <button
  onClick={() =>
    navigate("/view-details", {
      state: {
        department: "Computer Dept",
        spent: totalSpent,
        allocatedBudget: totalBudget
      }
    })
  }
  className="text-sm text-blue-500 mt-2 hover:underline"
>
  View Details →
</button>
    </div>

  </div>

  {/* Remaining Budget */}
  <div className="group bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-4 rounded-2xl shadow-md transition-all duration-300 hover:scale-105 hover:shadow-xl">

    <div className="flex items-center gap-4">

      <div className="p-3 rounded-xl bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900 dark:to-green-800 transition-transform duration-300 group-hover:rotate-6">
        <TrendingUp className="text-green-600 dark:text-green-300" />
      </div>

      <div>
        <p className="text-sm text-gray-500 dark:text-gray-400">Remaining Budget</p>
        <h2 className="text-xl font-bold">
  ₹{remaining}
</h2>
      </div>

    </div>

  </div>

  {/* Transactions */}
  <div className="group bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-4 rounded-2xl shadow-md transition-all duration-300 hover:scale-105 hover:shadow-xl">

    <div className="flex items-center gap-4">

      <div className="p-3 rounded-xl bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 transition-transform duration-300 group-hover:rotate-6">
        <DollarSign className="text-blue-600 dark:text-blue-300" />
      </div>

      <div>
        <p className="text-sm text-gray-500 dark:text-gray-400">Transactions</p>
<h2 className="text-xl font-bold">
  {transactions.length}
</h2>
      </div>

    </div>

  </div>

  {/* Departments */}
  <div className="group bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-4 rounded-2xl shadow-md transition-all duration-300 hover:scale-105 hover:shadow-xl">

    <div className="flex items-center gap-4">

      <div className="p-3 rounded-xl bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900 dark:to-purple-800 transition-transform duration-300 group-hover:rotate-6">
        <Building2 className="text-purple-600 dark:text-purple-300" />
      </div>

      <div>
        <p className="text-sm text-gray-500 dark:text-gray-400">Departments</p>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">5</h2>
      </div>

    </div>

  </div>

</div>
        {/* CHARTS */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">

  <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md p-6">
    <h3 className="mb-3 font-semibold">Monthly Spending</h3>

    <ResponsiveContainer width="100%" height={250}>
     <BarChart data={monthlyData}>
  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
  <XAxis dataKey="month" stroke="#ccc" />
  <YAxis stroke="#ccc" />
  <Tooltip />
  <Bar dataKey="spent" radius={[8, 8, 0, 0]} fill="#3b82f6" />
</BarChart>
    </ResponsiveContainer>
  </div>

  <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md p-6">
    <h3 className="mb-3 font-semibold">Category Breakdown</h3>

    <ResponsiveContainer width="100%" height={250}>
     <PieChart width={300} height={300}>
  <Pie
    data={dashboard.category || []}
    dataKey="value"
    nameKey="name"
    cx="50%"
    cy="50%"
    outerRadius={100}
    label
  >
    {(dashboard.category || []).map((entry, index) => (
      <Cell
        key={`cell-${index}`}
        fill={colors[index % colors.length]}   // ✅ COLORS APPLIED
      />
    ))}
  </Pie>

  <Tooltip />
</PieChart>
    </ResponsiveContainer>
  </div>

</div>
      {/* TABLE */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded shadow">
        <h3 className="mb-4 font-bold">Transactions</h3>

        <table className="w-full">
          <thead>
            <tr className="bg-gray-100 dark:bg-slate-700 text-left">
              <th className="p-3">Date</th>
              <th className="p-3">ID</th>
              <th className="p-3">Purpose</th>
              <th className="p-3">Department</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {currentTransactions.map(tx => (
              <tr key={tx._id} className="border-t">
               <td
  className="p-3 cursor-pointer text-blue-500 hover:underline"
  onClick={() => navigate(`/transactions/${tx._id}`)}
>
  {new Date(tx.created_at).toLocaleDateString()}
</td>

                <td className="p-3">{tx._id}</td>
                <td className="p-3">{tx.purpose}</td>
                <td className="p-3">{tx.department}</td>
                <td className="p-3">₹ {tx.amount}</td>

                <td className="p-3">
                  <button
                    onClick={() => handleDelete(tx._id)}
                    className="text-red-500"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>

    </div>
  );
}

export default Dashboard;