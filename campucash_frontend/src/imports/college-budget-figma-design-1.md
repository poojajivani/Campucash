Design a College Budget Management System web application UI in Figma.
Brand & Aesthetic: Clean, professional, and trustworthy. Use a deep navy blue (#0F2D5E) as the primary color, with gold/amber (#F5A623) as the accent color, and white/light gray backgrounds. Use a modern sans-serif font like DM Sans or Plus Jakarta Sans. The overall feel should be institutional yet modern — think government efficiency meets fintech clarity. Design all screens in both Dark and Light mode variants. Light mode uses white/#F4F6FA backgrounds with dark text. Dark mode uses #0A1628 / #111D35 backgrounds with white text and the same gold accent.
Pages to design:

Login / Signup Page — A centered card layout with fields for: Full Name, Email, Password, and a dropdown labeled "Your Role in College" with options: Administrator, Department Head, Admin, Accountant, Lab-in-Charge, Class-in-Charge, Finance Officer. Include a university logo placeholder at the top and a college name. Add a "Forgot Password" link and toggle between Login/Signup. Show both dark and light variants.
Dashboard (Role-Based) — Top navigation bar with user avatar, notification bell, role badge, and a Dark/Light mode toggle switch in the top right. Left sidebar with nav links: Dashboard, Departments, Transactions, Budget Requests, Reports, Settings. Main area shows: Total Budget card, Amount Spent card, Remaining Budget card, and a Budget Health Indicator showing current % used. Include:

A bar chart for monthly spending trends
A category-wise pie/donut chart showing spending breakdown by: Equipment, Maintenance, Salaries, Supplies, Utilities, Miscellaneous — each slice with a distinct color and percentage label
A recent transactions table
Auto-alert banner system: Show a yellow warning banner at 50% ("You've used half your budget"), an orange banner at 75% ("Budget usage is high — review spending"), and a red critical banner at 90% ("Critical: Approaching budget limit — immediate review required"). Each banner includes the department name, % used, and a "View Details" CTA button.


Department Budget View — Shows a specific department (e.g., "Computer Science Lab") with:

A circular progress gauge for overall budget utilization with color changes at 50% (yellow), 75% (orange), 90% (red)
A category-wise pie chart (Equipment, Maintenance, Supplies, Salaries, Utilities) with legend and exact amounts
Transaction history list with date/amount/status
An "Add Transaction" button (visible only for permitted roles)
A subtle alert badge on the department card if it has crossed a threshold (50/75/90%)


Transaction Page — A full-width table with filters (date range, department, category, status). Each row has: Date, Description, Department, Amount, Submitted By, Status (Approved/Pending/Rejected), Actions. Add a "+ New Transaction" button that opens a modal/drawer form with fields for category selection, amount, description, and receipt upload.
Budget Request / Approval Flow — A Kanban-style or list view of pending requests. Each card shows: requester name, department, amount requested, reason, and action buttons (Approve / Reject / Request Info).
Reports Page — Include:

Date range selector, department filter, academic year filter
Report type selector: Summary / Detailed / Category-wise / Audit
A live report preview card showing a mini donut chart for category-wise spending, total budget vs spent comparison bar, and key stats
A prominent export toolbar with two buttons: "Export as PDF" (red icon) and "Export as Excel" (green icon)
A report history table showing previously generated reports with download links
Show a sample generated PDF report frame that includes: college header, department name, date range, category-wise pie chart, transaction table, and budget summary


Overbudget Alert Modal — A red-tinted modal that appears when a department exceeds 90% or 100% of budget. Shows the department name, budgeted amount, current spent, overflow amount, a mini spending gauge, and action buttons: "Notify Finance Officer" and "Request Budget Increase." Design a separate version for the 50% and 75% warning states with appropriate yellow/orange tones.
Notifications Panel — A slide-in right drawer showing a chronological list of all auto-alerts: budget threshold warnings (50/75/90%), pending approvals, rejected transactions, and report generation confirmations. Each notification has an icon, timestamp, department tag, and a "Mark as Read" option.

Design Specifications:

All screens delivered in both Light and Dark mode
Card-based layouts with subtle shadows (stronger shadows in dark mode)
Tables with zebra striping
Status badges color-coded: green = approved, yellow = pending, red = rejected/overbudget
Charts use a consistent color palette across pie charts and bar charts
Alert banners are dismissible with a close icon
Responsive design at 1440px desktop with a 375px mobile variant for the dashboard
Include hover states, active states, and focus rings for accessibility
Use auto-layout and component variants in Figma for reusability