import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddDepartment() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        head: "",
        budget: "",
        category: ""
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("NEW DEPARTMENT:", form);

        // later → send to backend
        navigate("/department");
    };

    return (
        <div className="p-6 max-w-xl mx-auto text-white">
            <h1 className="text-2xl font-bold mb-6">Add Department</h1>

            <form onSubmit={handleSubmit} className="space-y-4">

                <input
                    type="text"
                    placeholder="Department Name"
                    required
                    className="w-full p-3 rounded bg-gray-800"
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                />

                <input
                    type="text"
                    placeholder="Department Head"
                    required
                    className="w-full p-3 rounded bg-gray-800"
                    onChange={(e) => setForm({ ...form, head: e.target.value })}
                />

                <input
                    type="number"
                    placeholder="Total Budget"
                    required
                    className="w-full p-3 rounded bg-gray-800"
                    onChange={(e) => setForm({ ...form, budget: e.target.value })}
                />

                <select
                    required
                    className="w-full p-3 rounded bg-gray-800"
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                >
                    <option value="">Select Department</option>
                    <option value="CSE">Computer Science</option>
                    <option value="ICT">ICT</option>
                    <option value="Civil">Civil</option>
                    <option value="Energy">Energy</option>
                </select>

                <button className="w-full bg-blue-600 py-3 rounded font-bold">
                    Add Department
                </button>

            </form>
        </div>
    );
}

export default AddDepartment;