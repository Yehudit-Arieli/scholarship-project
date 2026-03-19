🎓 Student Scholarship Management System (MERN Stack)

A professional Full-Stack system designed to automate and streamline the scholarship application process. This platform manages everything from multi-step student submissions to a centralized administration dashboard for processing applications.

✨ Key Features

👤 Student Interface (Applicant)

Authentication: Secure Login and Registration based on ID Number and Password.

Smart Multi-Step Application: A structured 5-step form to ensure data accuracy:

Step 1: Personal Details – Auto-filled data from registration (Read-only) + Address and City.

Step 2: Family Status – Detailed entry for parents and siblings (ID, Full Name, Birth Date).

Step 3: Academic Information – Selection of institution, field of study, and tuition fees.

Step 4: Bank Account – Secure entry of bank details (Bank name, Branch, Account number).

Step 5: Document Upload – Integration for uploading mandatory PDF/Image files (e.g., Tuition receipts, ID copies).

Live Status Tracking: Real-time dashboard to view the status of the latest application (Pending / Approved / Rejected).

⚙️ Admin Interface (Management)

Applications Management Table: A centralized view of all applications that require review.

Detailed Applicant View: Access to full student profiles and all submitted form data.

Document Verification: Direct links to view and verify the documents uploaded by students.

Server-Side Filtering & Sorting: Advanced capabilities to filter applicants by:

ID Number, City, or Specific Date Ranges.

Financial criteria (Annual income).

Number of siblings (e.g., filter students with 3+ siblings under 18).

Decision Workflow: Instant "Approve" or "Reject" buttons that update the database and student's status immediately.

💻 Tech Stack

Frontend: React.js (Hooks, Multi-step logic, Client-side validation).

Backend: Node.js + Express.js (RESTful API).

Database: MongoDB + Mongoose (Structured schemas for Users and Applications).

File Handling: Multer (Middleware for secure file uploads to the server).

📂 Architecture

client/src: React components, state management for forms, and UI layouts.

server/models: MongoDB schemas for Users and Scholarship data.

server/routes: API endpoints for Auth, Application Submission, and Admin actions.

server/uploads: Dedicated directory for stored student documents.

⚙️ Setup & Installation

Clone the repository:

git clone https://github.com/Yehudit-Arieli/scholarship-project.git
cd scholarship-project


Server Configuration:

Navigate to the server folder:

cd server


Install dependencies:

npm install


Create a .env file and add your MONGO_URI:

MONGO_URI=mongodb://localhost:27017/scholarship_db


Start the server:

npm start


Client Configuration:

Navigate to the client folder:

cd ../client


Install dependencies:

npm install


Start the React development server:

npm start


👤 Contact

Yehudit Arieli - [Your Email Address]

Developed as a Capstone Project focusing on MERN Stack development and complex form logic.
