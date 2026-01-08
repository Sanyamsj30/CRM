📇 ContactFlow – Personal CRM Web App

ContactFlow is a full-stack CRM (Customer Relationship Management) web application built with the MERN stack.
It helps users manage customers, track interactions (calls, emails, meetings, notes), and get automatic email reminders for upcoming meetings.

This project was built to validate real-world web development skills, not just CRUD-for-the-sake-of-CRUD.

🚀 Features

🔐 Authentication

Email & password login

Google OAuth login

JWT-based authentication

Protected routes

👥 Customer Management

Create, edit, delete customers

Search customers by name, email, or phone

Filter by status (Lead, Active, Inactive)

Filter by relationship (Client, Prospect, Vendor, etc.)

Customer-specific detail page

🧾 Interaction Tracking

Add interactions:

Notes

Calls

Emails

Meetings

View recent interactions per customer

Reschedule meetings

Mark interactions as completed

Delete interactions

Timeline-style interaction view

⏰ Meeting Reminders (Backend Automation)

Daily cron job runs at 12:00 AM

Automatically emails users if they have meetings scheduled the next day

One consolidated email per user (no spam storms)

📊 Dashboard

Total customers

Active customers

Upcoming meetings count

Recent interactions list

🎨 UI / UX

Responsive UI built with React + Tailwind CSS

Modal-based forms

Clean tables and timelines

Toast notifications for feedback

🛠 Tech Stack
Frontend

React

React Router

Axios

Tailwind CSS

React Hot Toast

Backend

Node.js

Express.js

MongoDB + Mongoose

JWT Authentication

Node-Cron (scheduled jobs)

Nodemailer (email reminders)

📂 Project Structure (High Level)
CRM/

├─ .gitignore

├─ README.md

├─ package.json


├─ package-lock.json

├─ backend/

│  ├─ package.json

│  ├─ package-lock.json

│  └─ src/

│     ├─ app.js

│     ├─ index.js

│     ├─ package-lock.json

│     ├─ config/

│     │  └─ db.js


│     ├─ controllers/

│     │  ├─ auth.controller.js

│     │  ├─ customer.controller.js

│     │  ├─ dashboard.controller.js

│     │  └─ interaction.controller.js

│     ├─ cron/

│     │  └─ meetingReminder.js

│     ├─ middlewares/

│     │  ├─ auth.middleware.js

│     │  └─ error.middleware.js

│     ├─ models/

│     │  ├─ customer.model.js


│     │  ├─ interaction.model.js

│     │  └─ user.model.js

│     ├─ routes/

│     │  ├─ auth.routes.js

│     │  ├─ customer.routes.js

│     │  ├─ dashboard.routes.js

│     │  └─ interaction.routes.js

│     └─ utils/

│        ├─ ApiError.js

│        ├─ ApiResponse.js

│        ├─ asynchandler.js

│        ├─ googleClient.js

│        └─ sendEmail.js

└─ frontend/

   ├─ .gitignore
   
   ├─ README.md
   
   ├─ package.json
   
   
   ├─ package-lock.json
   
   ├─ index.html
   
   ├─ eslint.config.js
   
   ├─ postcss.config.js
   
   ├─ tailwind.config.js
   
   ├─ vite.config.js
   
   ├─ public/
   
   └─ src/
   
      ├─ App.jsx
      
      ├─ index.css
      
      ├─ main.jsx
      
      ├─ api/                    (contents not expanded)
      
      ├─ components/
      
      │  ├─ common/             (contents not expanded)
      
      │  ├─ customers/          (contents not expanded)
      
      │  ├─ dashboard/          (contents not expanded)
      
      │  ├─ interactions/       (contents not expanded)
      
      │  └─ protectRoute.jsx

      
      ├─ pages/
      
      
      │  ├─ ChangePassword.jsx
      
      │  ├─ ForgotPassword.jsx
      
      │  ├─ Home.jsx
      
      │  ├─ Register.jsx
      
      │  ├─ ResetPassword.jsx
      
      │  ├─ VerifyEmail.jsx
      
      │  ├─ customerdetails.jsx
      
      │  ├─ customers.jsx
      
      │  ├─ dashboard.jsx
      
      │  └─ login.jsx
      
      └─ utils/                  (contents not expanded)

⚙️ Environment Variables

Backend (.env)

PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret



EMAIL_USER=your_gmail@gmail.com

EMAIL_PASS=your_gmail_app_password


GOOGLE_CLIENT_ID=your_google_client_id

⚠️ Important:

Use a Gmail App Password, not your actual Gmail password.


🧪 Running the Project Locally

1️⃣ Backend

cd backend

npm install

npm run dev

2️⃣ Frontend

cd frontend

npm install

npm run dev

Frontend runs on http://localhost:5173

Backend runs on http://localhost:5000

🧠 Key Learnings from This Project

End-to-end authentication (JWT + OAuth)

Real-world backend data modeling

Protected API design

Background jobs with cron

Email automation

Handling timezones & scheduling

Frontend–backend integration

Error handling that doesn’t lie to users

🔮 Future Improvements (Optional)

Calendar view for meetings

Timezone-aware reminders

Email templates with buttons

Pagination & infinite scroll

Role-based access control

Analytics charts

📌 Why This Project Matters

This is not a tutorial clone.

It demonstrates:

backend ownership

async workflows

real product thinking

system behavior without user interaction

Which, frankly, is where most “portfolio projects” give up.

🧑‍💻 Author

Sanyam Jain

Built to prove actual web development competence before moving into AI.


