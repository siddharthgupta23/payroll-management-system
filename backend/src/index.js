import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./config/database.js"
import authRoutes from "./routes/auth.js"
import adminRoutes from "./routes/admin.js"
import employeeRoutes from "./routes/employee.js"

dotenv.config()
connectDB()

const app = express()



app.use(cors({
 // origin: "https://payroll-management-system-ashen.vercel.app/",
  origin: "https://payroll-management-system-jsgoy7ci8.vercel.app",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
}
));
// app.options("*", cors());

app.use(express.json())

app.use("/api/auth", authRoutes)
app.use("/api/admin", adminRoutes)
app.use("/api/employee", employeeRoutes)

const PORT = process.env.PORT || 5000

app.get("/", (req, res) => {
  res.send("Server running");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})


