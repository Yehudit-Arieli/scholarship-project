# 🎓 Scholarship Management System | Full-Stack MERN

A professional, end-to-end scholarship application platform designed to streamline the entire lifecycle—from intuitive student submissions to centralized admin decision-making.

---

## 🚀 Overview
This project solves the complexity of scholarship management by providing a dual-role interface. It features a secure, multi-step application process for students and a robust dashboard for administrators to review, approve, or reject applications in real-time.

---

## ✨ Key Highlights & Technical Achievements

* **Role-Based Access Control (RBAC):** Distinct workflows and permissions for Students and Administrators, secured via JWT.
* **Optimized UX/UI:** A seamless multi-step form architecture that improves completion rates for complex data entry.
* **Real-Time Data Management:** Instant status updates (Pending/Approved/Rejected) reflected across the platform.
* **Secure Backend:** Built with a scalable Node.js/Express architecture and a flexible MongoDB schema.

---

## 🛠 Features

### 👤 For Students (The Applicants)
* **Secure Authentication:** Login/Register system with encrypted passwords.
* **Intuitive Multi-Step Form:** Logical breakdown of personal info, financial status, and document uploads.
* **Live Status Tracking:** A personal dashboard to monitor application progress.

### ⚙️ For Administrators (The Decision Makers)
* **Centralized Management Console:** View all incoming applications in one organized table.
* **One-Click Decision Workflow:** Fast "Approve/Reject" system to handle large volumes of data efficiently.
* **Dynamic Filtering:** Easily sort applications by status or applicant details.

---

## 📸 Screenshots
*(Recommended: Add 2-3 screenshots of your app here to catch the recruiter's eye)*
> **Tip:** You can use a tool like "Lightshot" or "Snipping Tool" and host images on GitHub or Imgur.

---

## 💻 Tech Stack
* **Frontend:** React.js (Hooks, Context API/State Management), Axios.
* **Backend:** Node.js, Express.js.
* **Database:** MongoDB (Local/Compass for development).
* **Security:** JSON Web Tokens (JWT), Bcrypt for password hashing.

---

## 📂 Architecture
```text
├── client/          # React Frontend (UI/UX)
├── server/          # Node.js Backend (API & Logic)
│   ├── models/      # MongoDB Schemas (User, ScholarshipApplication)
│   ├── routes/      # Secure API Endpoints
│   └── controllers/ # Business Logic (Auth, Admin Actions)
└── README.md

---

## ⚙️ Setup & Installation

1. **Clone & Install:**
   ```bash
   git clone https://github.com/Yehudit-Arieli/scholarship-project.git
   cd scholarship-project
