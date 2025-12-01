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


import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import authRoutes from "./routes/auth.js";
import adminRoutes from "./routes/admin.js";
import employeeRoutes from "./routes/employee.js";

dotenv.config();
connectDB();

const app = express();

// 🔥 FIX: Enable full CORS including OPTIONS
app.use(
  cors({
    origin: [
      "https://payroll-management-system-omega.vercel.app",
      "http://localhost:3000"
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Allow preflight
app.options("*", cors());

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
