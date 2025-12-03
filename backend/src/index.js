// import express from "express"
// import cors from "cors"
// import dotenv from "dotenv"
// import connectDB from "./config/database.js"
// import authRoutes from "./routes/auth.js"
// import adminRoutes from "./routes/admin.js"
// import employeeRoutes from "./routes/employee.js"

// dotenv.config()
// connectDB()

// const app = express()



// app.use(cors({
//  // origin: "https://payroll-management-system-ashen.vercel.app/",
//   origin: "https://payroll-management-system-jsgoy7ci8.vercel.app",
//     methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//     credentials: true,
// }
// ));
// // app.options("*", cors());

// app.use(express.json())

// app.use("/api/auth", authRoutes)
// app.use("/api/admin", adminRoutes)
// app.use("/api/employee", employeeRoutes)

// const PORT = process.env.PORT || 5000

// app.get("/", (req, res) => {
//   res.send("Server running");
// });

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`)
// })

import cors from "cors";
import express from "express";

import dotenv from "dotenv";
import connectDB from "./config/database.js";


import authRoutes from "./routes/auth.js";
import adminRoutes from "./routes/admin.js";
import employeeRoutes from "./routes/employee.js";





dotenv.config();
connectDB();

const app = express();

app.use(cors({
  origin: ["https://payroll-management-system-kyh4gm6dq.vercel.app"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));
app.options("*", cors());

/*const allowedOrigins = [
  // Your Production Vercel domain (replace this with your actual custom domain if you have one)
 //  'https://payroll-management-system-1tbn6gxua.vercel.app', 
  // Add other necessary origins, like your final custom domain or other testing environments.
  // 'https://payroll-management-system-hyln.onrender.com/', // Example: The final Vercel URL
  'http://localhost:3000', // For local Next.js development
  //  // If you use Vite/other local dev
];*/

// CORS Configuration Object
/*const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      // Log or handle the rejection
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Allow cookies/authorization headers to be passed
};*/

// Apply the CORS middleware
//app.use(cors(corsOptions));

// 🔥 FIX: Enable full CORS including OPTIONS
//app.use(
 //  cors(
  //   {
  //  origin: [
  //    "https://payroll-management-system-omega.vercel.app",
  //   "https://payroll-management-system-pwk7-aup28jx6s.vercel.app"

  //  ],
  //  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  // allowedHeaders: ["Content-Type", "Authorization"],
  //  credentials: true,
  //  }
  //)
//);

// Allow preflight
// app.options("*", cors());

app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/employee", employeeRoutes);

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Server running");
});


 app.listen(PORT, () => {
   console.log(`Server running on port ${PORT}`);
});

// export default app;
