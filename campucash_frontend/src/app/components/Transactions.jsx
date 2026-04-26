import * as React from "react";
import { cn } from "../../lib/utils";
import { toast } from "sonner";
import {
  Filter,
  Plus,
  CheckCircle,
  XCircle,
  Clock
} from "lucide-react";

const API_URL = "http://127.0.0.1:8000";

function Transactions() {
  const role = localStorage.getItem("role");

  const canAdd = ["admin", "finance_officer", "accountant"].includes(role);
  const canDelete = ["admin", "finance_officer"].includes(role);
  const canApprove = ["admin", "finance_officer"].includes(role);

  const [transactions, setTransactions] = React.useState([]);
  const [filteredData, setFilteredData] = React.useState([]);
  const [searchText, setSearchText] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  // ================= FETCH =================
  const fetchData = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Please login again");
        setTransactions([]);
        setFilteredData([]);
        return;
      }

      const res = await fetch(`${API_URL}/api/transactions`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      console.log("TRANSACTIONS:", data);

      // ✅ IMPORTANT FIX
      if (!Array.isArray(data)) {
        toast.error(data.detail || "Invalid response from server");
        setTransactions([]);
        setFilteredData([]);
        return;
      }

      setTransactions(data);
      setFilteredData(data);

    } catch (err) {
      console.error(err);
      toast.error("Failed to load transactions");
      setTransactions([]);
      setFilteredData([]);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  // ================= STATUS =================
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "approved":
        return "bg-green-100 text-green-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "rejected":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-500";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "approved":
        return <CheckCircle size={14} />;
      case "pending":
        return <Clock size={14} />;
      case "rejected":
        return <XCircle size={14} />;
      default:
        return null;
    }
  };

  // ================= DELETE =================
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${API_URL}/api/transactions/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        toast.error("Delete failed");
        return;
      }

      const updated = transactions.filter((tx) => tx._id !== id);
      setTransactions(updated);
      setFilteredData(updated);

      toast.success("Deleted");

    } catch {
      toast.error("Delete failed");
    }
  };

  // ================= STATUS UPDATE =================
  const handleStatusUpdate = async (id, status) => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${API_URL}/api/transactions/${id}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });

      if (!res.ok) {
        toast.error("Update failed");
        return;
      }

      const updated = transactions.map((tx) =>
        tx._id === id ? { ...tx, status } : tx
      );

      setTransactions(updated);
      setFilteredData(updated);

      toast.success(`Marked as ${status}`);

    } catch {
      toast.error("Update failed");
    }
  };

  // ================= FILTER =================
  const applyFilter = () => {
    if (!Array.isArray(transactions)) return;

    const filtered = transactions.filter((tx) =>
      tx.purpose?.toLowerCase().includes(searchText.toLowerCase())
    );

    setFilteredData(filtered);
  };

  return (
    <div className="p-6 space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Transactions</h1>

        {canAdd && (
          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg">
            <Plus size={16} /> Add
          </button>
        )}
      </div>

      {/* SEARCH */}
      <div className="flex gap-2">
        <input
          className="border px-3 py-2 rounded-lg w-64"
          placeholder="Search..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button
          onClick={applyFilter}
          className="px-3 py-2 bg-gray-200 rounded-lg"
        >
          <Filter size={16} />
        </button>
      </div>

      {/* LOADING */}
      {loading && <p>Loading...</p>}

      {/* LIST */}
      <div className="space-y-4">
        {Array.isArray(filteredData) && filteredData.length > 0 ? (
          filteredData.map((tx) => (
            <div
              key={tx._id}
              className="p-4 border rounded-xl shadow-sm bg-white dark:bg-gray-900 flex justify-between items-center"
            >
              {/* LEFT */}
              <div>
                <h3 className="font-semibold">{tx.purpose}</h3>
                <p className="text-sm text-gray-500">₹{tx.amount}</p>

                <span
                  className={cn(
                    "inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full mt-2",
                    getStatusColor(tx.status)
                  )}
                >
                  {getStatusIcon(tx.status)}
                  {tx.status}
                </span>
              </div>

              {/* RIGHT */}
              <div className="flex gap-2">

                {canDelete && (
                  <button
                    onClick={() => handleDelete(tx._id)}
                    className="px-3 py-1 text-sm bg-red-500 text-white rounded"
                  >
                    Delete
                  </button>
                )}

                {canApprove && (
                  <>
                    <button
                      onClick={() =>
                        handleStatusUpdate(tx._id, "approved")
                      }
                      className="px-3 py-1 text-sm bg-green-600 text-white rounded"
                    >
                      Approve
                    </button>

                    <button
                      onClick={() =>
                        handleStatusUpdate(tx._id, "rejected")
                      }
                      className="px-3 py-1 text-sm bg-gray-500 text-white rounded"
                    >
                      Reject
                    </button>
                  </>
                )}
              </div>
            </div>
          ))
        ) : (
          !loading && <p className="text-gray-500">No transactions found</p>
        )}
      </div>
    </div>
  );
}

export default Transactions;