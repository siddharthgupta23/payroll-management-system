# Payroll Management System - MERN Stack

A full-stack payroll management system built with MongoDB, Express, React, and Node.js.

## Features

### Must-Have
- ✅ **Authentication**: Login/Signup with Admin & Employee roles
- ✅ **Admin Dashboard**: Create & update salary slips
- ✅ **Employee Dashboard**: Submit monthly expenses & view salary slips
- ✅ **Salary Slips**: View detailed salary information in a table
- ✅ **Expense History**: Track all submitted expenses

### Optional Features
- 📊 Charts for salary & expense history (Ready for implementation)
- ✅ Expense status workflow (Pending/Approved/Rejected)
- 📧 Notification system (Ready for implementation)
- 📄 Export salary slips as PDF (Ready for implementation)

## Tech Stack

### Frontend
- **React 19** - UI library
- **Next.js 16** - Full-stack React framework
- **TailwindCSS** - Utility-first CSS framework
- **SWR** - Data fetching & caching

### Backend
- **Express.js** - REST API framework
- **Node.js** - JavaScript runtime
- **MongoDB** - NoSQL database
- **JWT** - Authentication
- **bcryptjs** - Password hashing

## Project Structure

\`\`\`
/frontend
  ├── app/
  │   ├── page.tsx
  │   ├── login/page.tsx
  │   ├── signup/page.tsx
  │   └── layout.tsx
  ├── components/
  │   ├── admin-dashboard.tsx
  │   ├── employee-dashboard.tsx
  │   ├── salary-slip-form.tsx
  │   ├── salary-slip-list.tsx
  │   ├── expense-form.tsx
  │   ├── expense-list.tsx
  │   └── employee-list.tsx
  ├── hooks/
  │   └── useAuth.ts
  ├── lib/
  │   └── config.ts
  └── .env.local

/backend
  ├── src/
  │   ├── index.js
  │   ├── config/
  │   │   └── database.js
  │   ├── models/
  │   │   ├── User.js
  │   │   ├── SalarySlip.js
  │   │   └── Expense.js
  │   ├── middleware/
  │   │   └── auth.js
  │   └── routes/
  │       ├── auth.js
  │       ├── admin.js
  │       └── employee.js
  ├── package.json
  └── .env
\`\`\`

## Setup Instructions

### Backend Setup

1. Navigate to backend directory:
\`\`\`bash
cd backend
npm install
\`\`\`

2. Create `.env` file:
\`\`\`env
MONGO_URI=mongodb://localhost:27017/payroll
JWT_SECRET=your_jwt_secret_key_here
PORT=5000
\`\`\`

3. Start MongoDB (make sure it's running)

4. Start the backend server:
\`\`\`bash
npm run dev
\`\`\`

### Frontend Setup

1. Navigate to frontend directory:
\`\`\`bash
cd frontend
npm install
\`\`\`

2. Create `.env.local` file:
\`\`\`env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
\`\`\`

3. Start the development server:
\`\`\`bash
npm run dev
\`\`\`

4. Open http://localhost:3000 in your browser

## Demo Credentials

### Admin Account
- **Email**: admin@example.com
- **Password**: password123

### Employee Account
- **Email**: emp1@example.com
- **Password**: password123

## API Endpoints

### Authentication
- `POST /auth/signup` - Register new user
- `POST /auth/login` - Login user
- `GET /auth/me` - Get current user

### Admin Endpoints
- `POST /admin/salary-slip` - Create salary slip
- `PUT /admin/salary-slip/:id` - Update salary slip
- `GET /admin/employees` - Get all employees
- `GET /admin/expenses` - Get all expenses

### Employee Endpoints
- `GET /employee/salary-slip` - View own salary slips
- `POST /employee/expense` - Submit expense
- `GET /employee/expense` - View own expenses

## Database Models

### User
\`\`\`javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: 'admin' | 'employee',
  department: String,
  position: String,
  salary: Number,
  createdAt: Date,
  updatedAt: Date
}
\`\`\`

### SalarySlip
\`\`\`javascript
{
  employeeId: ObjectId,
  month: String,
  year: Number,
  basicSalary: Number,
  allowances: Number,
  deductions: Number,
  netSalary: Number,
  status: 'draft' | 'approved' | 'paid',
  createdAt: Date,
  updatedAt: Date
}
\`\`\`

### Expense
\`\`\`javascript
{
  employeeId: ObjectId,
  category: String,
  amount: Number,
  description: String,
  date: Date,
  status: 'pending' | 'approved' | 'rejected',
  month: String,
  year: Number,
  createdAt: Date,
  updatedAt: Date
}
\`\`\`

## Seeding Demo Data

To populate demo users, run this in your MongoDB:

\`\`\`javascript
db.users.insertMany([
  {
    name: "Admin User",
    email: "admin@example.com",
    password: "$2a$10$...", // hashed password
    role: "admin"
  },
  {
    name: "John Doe",
    email: "emp1@example.com",
    password: "$2a$10$...", // hashed password
    role: "employee",
    department: "Engineering",
    position: "Developer"
  }
])
\`\`\`

## Code Quality & Structure

- ✅ Clean separation of concerns (Frontend/Backend)
- ✅ Role-based access control (RBAC)
- ✅ JWT authentication with secure password hashing
- ✅ RESTful API design
- ✅ Responsive UI with TailwindCSS
- ✅ Error handling & validation
- ✅ Modular component structure

## Future Enhancements

1. **Charts & Analytics**
   - Salary trend charts
   - Expense breakdown visualization
   
2. **PDF Export**
   - Generate salary slips as PDF
   
3. **Notifications**
   - Email notifications for salary disbursement
   - In-app notifications for expense approvals
   
4. **Advanced Features**
   - Attendance tracking
   - Leave management
   - Performance reviews
   - Payroll analytics

## Deployment

### Deploy Backend to Vercel/Heroku
- Update MongoDB URI to cloud database (MongoDB Atlas)
- Set environment variables in deployment platform
- Deploy Express app

### Deploy Frontend to Vercel
- Connect GitHub repository to Vercel
- Set `NEXT_PUBLIC_API_URL` to your backend URL
- Deploy

## Support

For issues or questions, please open an issue in the repository.

---

**Developed as part of Full Stack Developer Internship Assignment**
