# 🎓 Student Scholarship Management System | MERN Stack

A professional Full-Stack application designed to **streamline the scholarship lifecycle** — from multi-step student submissions to a centralized admin dashboard for decision-making, real-time updates, and secure authentication.

---

## 🌟 Key Highlights

- **Role-Based Access Control (RBAC):** Students and Administrators have distinct workflows and permissions, secured with JWT.
- **Intuitive Multi-Step Form:** 5-step student application form to ensure data integrity and improve completion rates.
- **Real-Time Updates:** Application status (Pending / Approved / Rejected) reflected instantly across the platform.
- **Secure File Handling:** Documents uploaded via Multer, validated and stored securely.
- **Advanced Filtering & Sorting:** Admins can filter by city, ID, date ranges, annual income, number of siblings, etc.

---

## 👤 Student Interface (Applicant)

- **Secure Authentication:** Login/Register system with encrypted credentials.
- **Personal Details:** Auto-filled from registration, editable address and city fields.
- **Family Information:** Capture parents and siblings (ID, full name, birthdate).
- **Academic Details:** Institution, field of study, tuition fees.
- **Bank Account Info:** Secure entry for bank name, branch, and account number.
- **Document Upload:** PDFs/Images for tuition receipts, ID copies, and other mandatory documents.
- **Dashboard:** Live tracking of application status.

---

## ⚙️ Admin Interface (Management)

- **Centralized Dashboard:** Overview of all student applications.
- **Detailed Profiles:** Access to full applicant data and uploaded documents.
- **Approve / Reject Workflow:** One-click decision-making with immediate status update.
- **Filtering & Sorting:** Advanced search options by applicant details, financial criteria, and family information.

---

## 🧠 Challenges & Solutions

- **Maintaining Multi-Step Form State:** Preserved user input across navigation steps using React state.
- **Secure File Uploads:** Handled via Multer with server-side validation.
- **Efficient Filtering:** Server-side sorting for large datasets to improve performance.
- **Role-Based Security:** JWT authentication and protected routes for Admin/Student separation.

---

## 📂 Project Architecture

```text
client/src/          # React components, multi-step form logic, and UI
server/models/       # MongoDB schemas for Users and Applications
server/routes/       # REST API endpoints for Auth, Application, and Admin actions
server/controllers/  # Business logic for handling requests
server/uploads/      # Secure storage of uploaded student documents
└── README.md         # Project documentation

## 📸 Screenshots

![Student Form](link-to-image)  
![Admin Dashboard](link-to-image)

## 🌐 Live Demo
🔗 [View Live Project](https://your-live-demo-link.com)

## 👩‍💻 Developer

**Yehudit Arieli** – Full-Stack MERN Developer  
✉ [Email](mailto:your-email@example.com)

## 🎯 Motivation

This project simulates a real-world scholarship system with role-based workflows, multi-step forms, secure authentication, and complex admin management.
