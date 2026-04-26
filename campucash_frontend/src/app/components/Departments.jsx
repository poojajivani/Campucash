import * as React from "react";
import axios from "axios";
import { toast } from "sonner";

const API = "http://localhost:8000/api/auth/departments";

function Department() {

  // ================= ROLE =================
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  const isAdmin = role === "admin";

  // ================= STATE =================
  const [departments, setDepartments] = React.useState([]);
  const [form, setForm] = React.useState({
    name: "",
    budget: "",
    labs: ""
  });

  // ================= FETCH =================
  React.useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const res = await axios.get(API, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setDepartments(res.data);

    } catch {
      toast.error("Failed to load departments");
    }
  };

  // ================= ADD / UPDATE =================
  const handleSave = async () => {

    if (!form.name || !form.budget) {
      toast.error("Fill all fields");
      return;
    }

    try {
      const payload = {
        name: form.name,
        budget: Number(form.budget),
        labs: form.labs.split(",").map(l => l.trim())
      };

      await axios.post(API, payload, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      toast.success("Department Saved");
      setForm({ name: "", budget: "", labs: "" });
      fetchDepartments();

    } catch {
      toast.error("Failed to save department");
    }
  };

  // ================= DELETE =================
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      toast.success("Deleted");
      fetchDepartments();

    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="p-8 space-y-6">

      <h1 className="text-2xl font-bold">Department Management</h1>

      {/* ONLY ADMIN CAN EDIT */}
      {isAdmin && (
        <div className="space-y-3 border p-4 rounded-xl">

          <input
            className="border p-3 rounded-xl w-full"
            placeholder="Department Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            className="border p-3 rounded-xl w-full"
            placeholder="Budget Limit"
            type="number"
            value={form.budget}
            onChange={(e) => setForm({ ...form, budget: e.target.value })}
          />

          <input
            className="border p-3 rounded-xl w-full"
            placeholder="Labs (comma separated)"
            value={form.labs}
            onChange={(e) => setForm({ ...form, labs: e.target.value })}
          />

          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl"
          >
            Save Department
          </button>

        </div>
      )}

      {/* LIST */}
      <div className="space-y-3">

        {departments.map(dep => (
          <div
            key={dep._id || dep.id}
            className="border p-4 rounded-xl flex justify-between items-center"
          >

            <div>
              <h2 className="font-bold">{dep.name}</h2>
              <p className="text-sm text-gray-500">
                Budget: ₹{dep.budget}
              </p>

              <p className="text-sm">
                Labs: {dep.labs?.join(", ")}
              </p>
            </div>

            {isAdmin && (
              <button
                onClick={() => handleDelete(dep._id || dep.id)}
                className="text-red-500"
              >
                Delete
              </button>
            )}

          </div>
        ))}

      </div>

    </div>
  );
}

export default Department;