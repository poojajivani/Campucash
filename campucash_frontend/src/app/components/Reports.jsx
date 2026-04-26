import * as React from "react";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { Eye, Trash2, Plus, Download } from "lucide-react";
import { toast } from "sonner";

// ✅ API
const API = "http://localhost:8000/api/auth/reports";
const DASHBOARD_API = "http://localhost:8000/api/dashboard";

const COLORS = ["#0F2D5E", "#F5A623", "#10b981", "#6366f1"];

// ================= SAFE ERROR =================
const getErrorMessage = (err) => {
  const d = err.response?.data?.detail;

  if (Array.isArray(d)) return d.map(e => e.msg).join(", ");
  if (typeof d === "object" && d) return d.msg || "Validation error";
  return d || "Something went wrong";
};

function Reports() {
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json"
  };

  const canAdd = ["admin", "finance_officer", "accountant"].includes(role);
  const canDelete = ["admin", "finance_officer"].includes(role);

  const [loadingPdf, setLoadingPdf] = React.useState(false);
  const [reports, setReports] = React.useState([]);
  const [chartData, setChartData] = React.useState([]);
  const [selectedType, setSelectedType] = React.useState("Summary");
  const [selectedReport, setSelectedReport] = React.useState(null);
  const [addModal, setAddModal] = React.useState(false);

  const [form, setForm] = React.useState({ title: "" });

  // ================= FETCH REPORTS =================
  const fetchReports = async () => {
    try {
      if (!token) {
        toast.error("Login required");
        return;
      }

      const res = await axios.get(API, { headers });

      console.log("REPORTS:", res.data);

      // ✅ FIX: ensure array
      if (!Array.isArray(res.data)) {
        toast.error(res.data?.detail || "Invalid response from server");
        setReports([]);
        return;
      }

      setReports(res.data);

    } catch (err) {
      console.log("FETCH ERROR:", err);
      console.log("BACKEND:", err.response?.data);

      toast.error(err.response?.data?.detail || "Failed to fetch reports");
      setReports([]);
    }
  };

  // ================= FETCH CHART =================
  const fetchDashboard = async () => {
    try {
      if (!token) return;

      const res = await axios.get(DASHBOARD_API, { headers });

      console.log("DASHBOARD:", res.data);

      // ✅ FIX: safe category
      if (res.data && Array.isArray(res.data.category)) {
        setChartData(res.data.category);
      } else {
        setChartData([]);
      }

    } catch (err) {
      console.log("DASHBOARD ERROR:", err.response?.data);
      toast.error("Failed to load chart");
      setChartData([]);
    }
  };

  React.useEffect(() => {
    if (!token) {
      toast.error("Please login first");
      return;
    }

    fetchReports();
    fetchDashboard();
  }, []);

  // ================= GENERATE REPORT =================
  const handleGenerate = async (type) => {
    try {
      if (!token) {
        toast.error("Login required");
        return;
      }

      const res = await axios.post(
        API,
        {
          title: `${type} Report`,
          type: type
        },
        { headers }
      );

      console.log("SUCCESS:", res.data);

      toast.success(`${type} report generated`);
      fetchReports();

    } catch (err) {
      console.log("ERROR:", err.response?.data);
      toast.error(err.response?.data?.detail || "Failed to generate report");
    }
  };

  // ================= DOWNLOAD PDF =================
  const downloadPDF = async () => {
    try {
      if (!token) {
        toast.error("Login required");
        return;
      }

      setLoadingPdf(true);

      const res = await fetch("http://localhost:8000/api/export-pdf", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!res.ok) {
        toast.error("PDF generation failed");
        return;
      }

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "budget_report.pdf";
      a.click();

      toast.success("PDF downloaded");

    } catch (err) {
      console.log("PDF ERROR:", err);
      toast.error("Failed to download PDF");
    } finally {
      setLoadingPdf(false);
    }
  };

  // ================= ADD REPORT =================
  const handleAddReport = async () => {
    if (!form.title) {
      toast.error("Title required");
      return;
    }

    try {
      if (!token) {
        toast.error("Login required");
        return;
      }

      await axios.post(
        API,
        {
          title: form.title,
          type: selectedType
        },
        { headers }
      );

      toast.success("Report Added");
      setAddModal(false);
      setForm({ title: "" });
      fetchReports();

    } catch (err) {
      console.log("ADD ERROR:", err.response?.data);
      toast.error(getErrorMessage(err));
    }
  };

  // ================= DELETE =================
  const handleDelete = async (id) => {
    try {
      if (!token) {
        toast.error("Login required");
        return;
      }

      // ⚠️ Backend does not support delete
      toast.error("Delete not supported in backend");

    } catch (err) {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="space-y-8 pb-10">

      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Reports</h1>

        {canAdd && (
          <button
            onClick={() => setAddModal(true)}
            className="px-4 py-2 border rounded-xl flex gap-2"
          >
            <Plus size={16} /> Add
          </button>
        )}
      </div>

      <div className="grid grid-cols-4 gap-3">
        {["Summary", "Detailed", "Category", "Audit"].map(type => (
          <button
            key={type}
            onClick={() => setSelectedType(type)}
            className={`p-3 border rounded-xl ${
              selectedType === type ? "bg-blue-600 text-white" : ""
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      <button
        onClick={() => handleGenerate(selectedType)}
        className="px-5 py-2 bg-blue-600 text-white rounded-xl"
      >
        Generate Selected Report
      </button>

      <div className="bg-white dark:bg-gray-900 border rounded-2xl shadow-md p-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Export Reports</h2>
          <p className="text-sm text-gray-500">
            Download department reports in PDF format
          </p>
        </div>

        <button
          disabled={loadingPdf}
          onClick={downloadPDF}
          className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl"
        >
          <Download size={18} />
          {loadingPdf ? "Generating PDF..." : "Download PDF"}
        </button>
      </div>

      <div className="bg-white p-4 rounded-xl">
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie data={chartData} dataKey="value">
              {Array.isArray(chartData) &&
                chartData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="border rounded-xl">
        <div className="p-4 font-bold">Reports</div>

        <table className="w-full text-sm">
          <tbody>
            {Array.isArray(reports) &&
              reports.map((rep) => (
                <tr key={rep._id || rep.id} className="border-t">
                  <td className="p-3">{rep.title}</td>
                  <td className="p-3">{rep.type}</td>

                  <td className="p-3 flex gap-3 justify-end">
                    <button onClick={() => setSelectedReport(rep)}>
                      <Eye size={16} />
                    </button>

                    {canDelete && (
                      <button onClick={() => handleDelete(rep._id || rep.id)}>
                        <Trash2 size={16} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {selectedReport && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-[500px]">

            <h2 className="font-bold text-lg">{selectedReport.title}</h2>

            <pre className="text-xs bg-gray-100 p-3 mt-3 rounded">
              {JSON.stringify(selectedReport, null, 2)}
            </pre>

            <button
              onClick={() => setSelectedReport(null)}
              className="mt-4 w-full bg-black text-white py-2 rounded"
            >
              Close
            </button>

          </div>
        </div>
      )}

      {addModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-[400px]">

            <h2 className="font-bold mb-3">Add Report</h2>

            <input
              placeholder="Title"
              className="border p-2 w-full"
              value={form.title}
              onChange={(e) =>
                setForm({ ...form, title: e.target.value })
              }
            />

            <button
              onClick={handleAddReport}
              className="mt-3 bg-green-600 text-white w-full py-2 rounded"
            >
              Save
            </button>

          </div>
        </div>
      )}

    </div>
  );
}

export default Reports;