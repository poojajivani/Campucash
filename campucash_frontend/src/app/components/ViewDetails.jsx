import React from "react";
import {
  AlertTriangle,
  TrendingUp,
  DollarSign,
  Building2
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

function ViewDetails() {
  const navigate = useNavigate();

  // ✅ SAFE STATE HANDLING
  const location = useLocation();
  const state = location.state || {};

  const department = state?.department ?? "Computer Dept";
  const allocatedBudget = state?.allocatedBudget ?? 100000;
  const spent = state?.spent ?? 0;

  const remaining = allocatedBudget - spent;

  // ✅ FIXED ORDER (usage first)
  const usage = allocatedBudget
    ? Math.round((spent / allocatedBudget) * 100)
    : 0;

  const isCritical = usage > 90;

  const [transactions, setTransactions] = React.useState([]);

  const token = localStorage.getItem("token");

  // ================= FETCH HIGH SPENDING TX =================
  React.useEffect(() => {
    fetch("http://localhost:8000/api/transactions", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        // filter high spending transactions (safe + department check)
        const highTx = data.filter(
          tx =>
            Number(tx.amount) > 20000 &&
            (!state?.department || tx.department === state?.department)
        );

        setTransactions(highTx);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="min-h-screen p-6 space-y-8 bg-gray-50 dark:bg-slate-950 text-gray-900 dark:text-gray-100">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <AlertTriangle className="text-amber-500" />
          High Spending Alert Details
        </h1>

        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Detailed report of departments exceeding budget limits.
        </p>

        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 mt-4 px-4 py-2 bg-gray-200 dark:bg-slate-800 rounded-lg font-bold hover:bg-gray-300 dark:hover:bg-slate-700 transition-all"
        >
          <ArrowLeft size={18} />
          Back
        </button>
      </div>

      {/* ALERT CARD */}
      <div
        className={`p-6 rounded-2xl border transition-all ${
          isCritical
            ? "bg-red-100 dark:bg-red-900 border-red-300 dark:border-red-700"
            : "bg-amber-50 dark:bg-amber-950 border-amber-200 dark:border-amber-800"
        }`}
      >
        <div className="flex items-center gap-3">
          <AlertTriangle className="text-amber-500" />

          <div>
            <p className="font-bold text-lg text-amber-800 dark:text-amber-400">
              {department} spending alert
            </p>

            <p className="text-sm text-amber-700 dark:text-amber-300">
              Budget usage is {usage}%
            </p>
          </div>
        </div>
      </div>

      {/* BUDGET STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border">
          <DollarSign className="text-blue-500 mb-2" />
          <p className="text-gray-500">Allocated Budget</p>
          <h2 className="text-2xl font-bold">₹{allocatedBudget}</h2>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border">
          <TrendingUp className="text-red-500 mb-2" />
          <p className="text-gray-500">Amount Spent</p>
          <h2 className="text-2xl font-bold">₹{spent}</h2>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border">
          <Building2 className="text-green-500 mb-2" />
          <p className="text-gray-500">Remaining Budget</p>
          <h2 className="text-2xl font-bold">₹{remaining}</h2>
        </div>
      </div>

      {/* USAGE BAR */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border">
        <h3 className="text-lg font-bold mb-4">Budget Utilization</h3>

        <div className="w-full bg-gray-200 dark:bg-slate-800 rounded-full h-4">
          <div
            className={`h-4 rounded-full transition-all ${
              isCritical ? "bg-red-500" : "bg-green-500"
            }`}
            style={{ width: `${usage}%` }}
          />
        </div>

        <p className="text-sm mt-2 text-gray-500">{usage}% used</p>
      </div>

      {/* TRANSACTIONS */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border">

        <h3 className="text-xl font-bold mb-4">
          High Spending Transactions
        </h3>

        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Description</th>
              <th className="text-left py-2">Amount</th>
              <th className="text-right py-2">Date</th>
            </tr>
          </thead>

          <tbody>
            {transactions.map(tx => (
              <tr
                key={tx._id}
                className="border-b border-gray-100 dark:border-slate-700"
              >
                <td className="py-2">{tx.purpose}</td>

                <td className="py-2 font-bold text-red-500">
                  ₹{tx.amount}
                </td>

                <td className="py-2 text-right text-gray-500">
                  {tx.created_at
                    ? new Date(tx.created_at).toLocaleDateString()
                    : "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* EMPTY STATE */}
        {transactions.length === 0 && (
          <p className="text-center text-gray-500 mt-4">
            No high spending transactions found
          </p>
        )}

      </div>

    </div>
  );
}

export default ViewDetails;