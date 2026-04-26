# 💰 Budget Vision - College Budget Management System

## 📌 Project Overview
Budget Vision is a College Budget Management System designed to manage financial reports, analyze budget distribution, and provide real-time insights using charts and dashboards.

The system includes a React-based frontend and a Spring Boot + MongoDB backend (to be connected).

---

## 🖥️ Frontend (React)
Features implemented:
- 📊 Financial Reports Dashboard
- ➕ Add Report (Manual Entry)
- ⚙️ Generate Report (Auto Creation)
- 🔍 Search Reports
- 👁️ View Report Details (Modal)
- 🗑️ Delete Reports
- 📈 Pie Chart Analytics (Recharts)
- 📄 Export options (PDF / Excel UI buttons)

---

## 📂 Report Module Structure
Each report contains:
- id (e.g., REP-1234)
- name (String)
- type (Summary / Detailed / Category / Audit)
- date (YYYY-MM-DD)
- size (String)

---

## 🔗 Backend (To be connected)
Backend will be built using:
- Spring Boot
- Spring Web (REST APIs)
- Spring Data MongoDB
- MongoDB Database
- Maven

---

## 📡 Required API Endpoints

- GET /api/reports → Fetch all reports  
- POST /api/reports → Create new report  
- GET /api/reports/{id} → Get report by ID  
- DELETE /api/reports/{id} → Delete report  
- GET /api/reports/search?name= → Search reports  
- GET /api/reports/analytics → Category-wise data for charts  

---

## 📊 Analytics Data Used in UI
- Equipment
- Maintenance
- Salaries
- Supplies
- Utilities
- Misc

Used in PieChart visualization.

---

## ⚙️ How to Run Frontend

```bash
npm install
npm start